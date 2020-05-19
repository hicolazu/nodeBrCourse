const Commander = require('commander');
const database = require('./database');
const Heroi = require('./heroi');

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Herói")
    .option('-p, --poder [value]', "Poder do Herói")
    .option('-i, --id [value]', "Id do Herói")
    .option('-c, --cadastrar', "Cadastrar um Herói")
    .option('-l, --listar', "Lista um/todos os Herói")
    .option('-r, --remover', "Remove um Herói pelo Id")
    .option('-a, --atualizar [value]', "Atualiza um Herói pelo Id")
    .parse(process.argv);
  const heroi = new Heroi(Commander);
  try {
    if (Commander.cadastrar) {
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);
      if (!resultado){
        console.error('Herói não foi cadastrado!');
        return;
      }
      console.log('Herói cadastrado com sucesso!');
    }
    if (Commander.listar) {
      const resultado = await database.listar();
      console.log(resultado);
      return;
    }
    if (Commander.remover) {
      const resultado = await database.remover(heroi.id);
      if (!resultado){
        console.error('Nao foi possivel remover o Herói');
        return;
      }
      console.log('Herói removido com sucesso!');
      return;
    }
    if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await database.atualizar(idParaAtualizar, heroiAtualizar);
      if (!resultado) {
        console.error('Não foi possível atualizar este Herói.');
        return;
      }
      console.log('Herói atualizado com sucesso!');
      return;
    }
  } catch (err) {
    console.error('Deu ruim', err);
  }
}

main();