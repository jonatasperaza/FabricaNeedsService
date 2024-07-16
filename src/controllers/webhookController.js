import { getPayment } from '../services/mercadoPagoService.js';
import { updateTotal, subtractTotal } from '../services/totalService.js';
import sql from '../config/database.js';

export const webhookHandler = async (req, res) => {
  try {
    const dados = req.body;
    console.log(
      `Novo webhook recebido: ${JSON.stringify(dados, null, 2)}`
    );
    
    if (dados.action === "payment.updated" || dados.action === "payment.refunded") {
      const pagamento = await getPayment(dados.data.id);
      const result = await sql`UPDATE "fabricaNeeds_pagamentos" SET status = ${pagamento.status} where payment_id = ${pagamento.id}`;
      if (pagamento.status === "approved") {
        console.log("Pagamento aprovado");
        await sql`UPDATE "fabricaNeeds_pagamentos" SET data_aprovacao = ${new Date()} where payment_id = ${pagamento.id}`;
        const total = await updateTotal(pagamento.transaction_amount);
        res.status(200).json({
          message: "Dados inseridos com sucesso",
          result: result,
          total: total,
        });
      } else if (pagamento.status === "refunded") {
        console.log("Pagamento reembolsado");
        const total = await subtractTotal(pagamento.transaction_amount);
        res.status(200).json({
          message: "Reembolso processado com sucesso",
          result: result,
          total: total,
        });
      } else {
        res.status(201).json({ message: "Dados recebidos com sucesso" });
      }
    } else {
      res.status(201).json({ message: "Dados recebidos com sucesso" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erro ao inserir dados", error: error.message });
  }
};
