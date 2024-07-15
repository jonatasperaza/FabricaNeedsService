import { getPayment } from '../services/mercadoPagoService.js';
import { updateTotal, subtractTotal } from '../services/totalService.js';
import sql from '../config/database.js';

export const webhookHandler = async (req, res) => {
  console.log(req.body);
  try {
    const dados = req.body;
    console.log(dados);
    
    if (dados.action === "payment.updated" || dados.action === "payment.refunded") {
      const pagamento = await getPayment(dados.data.id);
      console.log(pagamento);
      
      const result = await sql`UPDATE "fabricaNeeds_pagamentos" SET status = ${pagamento.status} where payment_id = ${pagamento.id}`;
      await sql`UPDATE "fabricaNeeds_pagamentos" SET data_aprovacao = ${new Date()} where payment_id = ${pagamento.id}`;

      if (pagamento.status === "approved") {
        console.log("Pagamento aprovado");
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
