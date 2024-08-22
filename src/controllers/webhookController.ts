import { Request, Response } from "express";
import { getPayment } from "../services/mercadoPagoService";
import { updateTotal, subtractTotal } from "../services/totalService";
import sql from "../config/database";

export const webhookHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const dados = req.body;
    console.log(`Novo webhook recebido: ${JSON.stringify(dados, null, 2)}`);

    if (
      dados.action === "payment.updated" ||
      dados.action === "payment.refunded"
    ) {
      const pagamento = await getPayment(dados.data.id);

      const updateResult = await sql`
        UPDATE "fabricaNeeds_pagamentos" 
        SET status = ${pagamento.status} 
        WHERE payment_id = ${pagamento.id}
        RETURNING *;
      `;

      const updatedPayment = updateResult[0];

      if (
        updatedPayment.status === "approved" &&
        pagamento.status === "approved"
      ) {
        console.log("Pagamento aprovado anteriormente");
        return res.status(304).json({
          message: "Pagamento aprovado anteriormente",
          confirm: updatedPayment,
        });
      }

      if (pagamento.status === "approved") {
        console.log("Pagamento aprovado");
        await sql`
          UPDATE "fabricaNeeds_pagamentos" 
          SET data_aprovacao = ${new Date()} 
          WHERE payment_id = ${pagamento.id};
        `;
        const total = await updateTotal(pagamento.transaction_amount);
        return res.status(200).json({
          message: "Dados inseridos com sucesso",
          result: updateResult,
          total,
        });
      }

      if (pagamento.status === "refunded") {
        console.log("Pagamento reembolsado");
        const total = await subtractTotal(pagamento.transaction_amount);
        return res.status(200).json({
          message: "Reembolso processado com sucesso",
          result: updateResult,
          total,
        });
      }

      return res.status(201).json({ message: "Dados recebidos com sucesso" });
    } else {
      return res.status(201).json({ message: "Dados recebidos com sucesso" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Erro ao inserir dados", error: error.message });
  }
};
