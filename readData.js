const fs = require('fs');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
var inputData = [];

// Função para processar cada objeto JSON lido do arquivo, colocando-o em um vetor
async function processJsonObject(jsonObj) {
//   console.log(jsonObj);
  inputData.push(jsonObj);

}

// Caminho do arquivo JSON de origem
const filePath = './data.json';

// Cria um fluxo de leitura para o arquivo
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

// Cria um pipeline de fluxo com StreamArray
const jsonStream = readStream.pipe(parser()).pipe(streamArray());

// Lê e processa cada objeto JSON do array
jsonStream.on('data', ({ key, value }) => {
  processJsonObject(value);
});

// Captura erros no fluxo de leitura
readStream.on('error', (error) => {
  console.error(`Erro ao ler o arquivo: ${error.message}`);
});

// Captura erros no fluxo JSON
jsonStream.on('error', (error) => {
  console.error(`Erro ao analisar o JSON: ${error.message}`);
});

function mostraVetor(){
  inputData.forEach(e => {
        console.log(e);
        console.log('*********');
  });
}

function orderData(json) {
    const newJson = json.sort((a, b) => a.log - b.log);
    return console.log(newJson[0]);
}

// Finaliza o processo ao terminar a leitura
jsonStream.on('end', () => {
  console.log('Leitura do arquivo concluída.');
  //daqui deve partir o desenvolvimento, pois antes não garante que o arquivo está lido
  console.log(inputData[0]);
  orderData(inputData);
});
