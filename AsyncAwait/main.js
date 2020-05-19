const getUser = () => {
  return new Promise((resolve, reject) => resolve({nome: 'Aladin', telefone: '13996818505', endereco: 'Alameda das Américas, 34'}));
};

// ao adicionar a palavra 'async' a uma função, ele automaticamente retornará uma promise 
main()
async function main() {
  try {
    console.time('promise-time');
    const {nome, telefone, endereco} = await getUser();
    console.log(`
      Nome: ${nome},
      Telefone: ${telefone},
      Endereço: ${endereco}
    `);
    console.timeEnd('promise-time');
  } catch(err) {
    console.error('DEU RUIM', err);
  }
}