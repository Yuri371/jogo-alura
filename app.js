let listaDeNumeroSorteados = [];
let numeroLimite = 5;
let numroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    resposiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
  exibirTextoNaTela('h1', 'Jogo do número secreto!');
  exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numroSecreto){
      let quandoAcertarNaPrimeira = tentativas > 1 ? 'Parabéns, você acertou!' : 'Incrível, você é muito bom!!!';
      exibirTextoNaTela('h1', quandoAcertarNaPrimeira);
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você deacobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
      if(chute > numroSecreto){
        exibirTextoNaTela ('p', 'O número secreto é menor.');
      } else {
        exibirTextoNaTela('p', 'O número secreto e maior.');
      }
      tentativas++;
      limparCampo();
    }
}

function gerarNumeroAleatorio(){
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumeroSorteados = [];
  }
  if (listaDeNumeroSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  } else {
    listaDeNumeroSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
} 

function limparCampo(){
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
  numroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}