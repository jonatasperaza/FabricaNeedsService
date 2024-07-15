import sql from '../config/database.js';

export const updateTotal = async (valor) => {
  try {
    const total = await sql`SELECT * FROM "fabricaNeeds_total"`;
    console.log(`Mudaram total de ${total[0].total} para ${valor}`);
    const atualizar = total[0].total + valor;
    const result = await sql`UPDATE "fabricaNeeds_total" SET total = ${atualizar} where id = 1`;
    return result;
  } catch (error) {
    console.error("Erro ao atualizar o total no PostgreSQL:", error);
    return error;
  }
};

export const subtractTotal = async (valor) => {
  try {
    const total = await sql`SELECT * FROM "fabricaNeeds_total"`;
    console.log(`Mudaram total de ${total[0].total} para ${-valor}`);
    const atualizar = total[0].total - valor;
    const result = await sql`UPDATE "fabricaNeeds_total" SET total = ${atualizar} where id = 1`;
    return result;
  } catch (error) {
    console.error("Erro ao atualizar o total no PostgreSQL:", error);
    return error;
  }
};
