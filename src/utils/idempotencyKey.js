export const gerarIdempotencyKey = (tamanho) => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-$#_@&";
    let resultado = "";
    for (let i = 0; i < tamanho; i++) {
      resultado += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    console.log('IdempotencyKey Generated');
    return resultado;
  };
  