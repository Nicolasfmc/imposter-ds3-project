const fs = require('fs');
const { performance } = require('perf_hooks');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { stdin, stdout } = require('node:process');
const readline = require('readline');
var inputData = [];

const rl = readline.createInterface({ input: stdin, output: stdout });

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

// desenvolvimento de ordernação

// perguntar ao usuario o mes e o index do impostor
// order p/mes dps order p/log e mostrar o index que foi enviado pelo usuario
async function orderData(json) {
  // for i = 1 to k do
  // C[i] = C[i]+C[i−1]; {C[i] é número de j’s tais que A[j] ≤ i}
  // end for
  // for i = n decrescendo até 1 do
  // B[C[A[j]]] = A[j];
  // C[A[j]] = C[A[j]] − 1;
  // end for
  const arr = [];

  for (let i = 0; i < 1000000; i++) {
    arr[i].push(0);

    return;
  }

  for (let j = 0; j < json.length; j++) {
    arr[json[i]] = arr[json[i]] + 1;

    return;
  }

  for (let idx = 0; idx < 1000000; idx++) {
    arr[idx] = arr[idx] + arr[idx - 1];
     return;
  }

  for (let index = 0; json.length < 1; index--) {
    const b = [];
    b[arr[json[index]]] = json[index];
    arr[json[index]] = arr[json[index]] - 1;
    
    return b;
  }
}

// Finaliza o processo ao terminar a leitura
jsonStream.on('end', () => {
  console.log('Leitura do arquivo concluída.');
  const start = performance.now();
  
  //daqui deve partir o desenvolvimento, pois antes não garante que o arquivo está lido
  orderData(inputData);
  
  const end = performance.now()
  
  console.log('tempo de execucao:', ((end - start).toFixed(3)).substring(2) + 'ms');
  return;
});
