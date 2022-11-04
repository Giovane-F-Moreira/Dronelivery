'use strict';

//Exemple
// const reseachCEP = () => {
//   const cep = document.getElementById('cep').value;
//   const url = `https://viacep.com.br/ws/${cep}/json/`;
//   fetch(url).then(answer => answer.json()).then(console.log);
// }

const reseachCEP = async() => {
  const cepFormated = document.getElementById('cep').value;
  const removeDot = cepFormated.replace('.', '');
  const cep = removeDot.replace('-', '');
  const url     = `https://viacep.com.br/ws/${cep}/json/`;
  const data    = await fetch(url);
  const adress  = await data.json();

  // adress.hasOwnProperty('erro') ? alert("CEP não cadastrado!") : fillForms(adress)
  //Exemple CEP with ERROR 18135301

  if (adress.hasOwnProperty('erro')) {
    
    alert("CEP não encontrado!");
    document.getElementById('uf').value = ''
    document.getElementById('city').value = ''
    document.getElementById('district').value = ''
    document.getElementById('adress').value = ''
    document.getElementById('complement').value = ''

  } else {
    fillForms(adress)
  }

}

const fillForms = (adress) => {

  document.getElementById('uf').value = adress.uf;
  document.getElementById('city').value = adress.localidade;
  document.getElementById('district').value = adress.bairro;
  document.getElementById('adress').value = adress.logradouro;
  document.getElementById('complement').value = adress.complemento;
}


document.getElementById('cep')
        .addEventListener('focusout',reseachCEP);