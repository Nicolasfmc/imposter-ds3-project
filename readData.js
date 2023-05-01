const fs = require('fs');
const { performance } = require('perf_hooks');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
//const { stdin, stdout } = require('node:process');
const readline = require('readline');
var inputData = [];
var indexImposter = 0;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

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

function getImpostorIndex(){
  return new Promise((resolve) => {
    rl.question('Index do impostor: ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
// desenvolvimento de ordernação
// perguntar ao usuario o mes e o index do impostor

function radixSort(arr) {
  // Define uma função para encontrar o maior número do array.
  const getMax = () => {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };
  
  // Inicializa a variável exp com 1.
  let exp = 1;
  // Enquanto a divisão de max por exp for maior que 0, executa o algoritmo de classificação radix.
  while (Math.floor(getMax() / exp) > 0) {
    // Cria 10 baldes para armazenar os elementos do array de acordo com o dígito correspondente.
    let buckets = Array.from({ length: 10 }, () => []);
    
    // Separa cada elemento do array em dígitos e armazena-os em seus baldes correspondentes.
    for (let i = 0; i < arr.length; i++) {
      let digit = Math.floor(arr[i] / exp) % 10;
      buckets[digit].push(arr[i]);
    }
    
    // Reconstrói o array a partir dos baldes.
    arr = [].concat(...buckets);
    // Multiplica exp por 10 para classificar os elementos de acordo com o próximo dígito.
    exp *= 10;
  }
  
  // Retorna o array ordenado.
  return console.log(arr[indexImposter]);
}


// Finaliza o processo ao terminar a leitura
jsonStream.on('end', async () => {
  console.log('Leitura do arquivo concluída.');
  indexImposter = await getImpostorIndex();
  const start = performance.now();
  
  //daqui deve partir o desenvolvimento, pois antes não garante que o arquivo está lido
  radixSort(inputData);
  
  const end = performance.now()
  
  console.log('tempo de execucao:', ((end - start).toFixed(0)) + 'ms');

  return;
});