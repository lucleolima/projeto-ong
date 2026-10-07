// Máscaras de entrada: formatam o valor enquanto o usuário digita.
// A validação em si continua sendo feita pelo atributo pattern do HTML.

function somenteDigitos(valor) {
  return valor.replace(/\D/g, '');
}

function mascaraCPF(valor) {
  return somenteDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascaraTelefone(valor) {
  const digitos = somenteDigitos(valor).slice(0, 11);
  if (digitos.length <= 2) {
    return digitos.replace(/(\d{1,2})/, '($1');
  }
  // Celular tem 9 dígitos após o DDD; fixo tem 8
  const tamanhoPrefixo = digitos.length === 11 ? 5 : 4;
  const ddd = digitos.slice(0, 2);
  const prefixo = digitos.slice(2, 2 + tamanhoPrefixo);
  const sufixo = digitos.slice(2 + tamanhoPrefixo);
  return '(' + ddd + ') ' + prefixo + (sufixo ? '-' + sufixo : '');
}

function mascaraCEP(valor) {
  return somenteDigitos(valor)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');
}

function aplicarMascara(id, funcaoMascara) {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.addEventListener('input', function () {
    campo.value = funcaoMascara(campo.value);
  });
}

aplicarMascara('cpf', mascaraCPF);
aplicarMascara('telefone', mascaraTelefone);
aplicarMascara('cep', mascaraCEP);
