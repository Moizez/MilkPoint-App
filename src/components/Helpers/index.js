//Função para converter valores para nossa moeda em real
export const numberToReal = (numero) => {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

export const formatarCEP = (str) => {
    var re = /^([\d]{2})\.?([\d]{3})-*([\d]{3})/; // Pode usar ? no lugar do *

    if (re.test(str)) {
        return str.replace(re, "$1$2-$3");
    } else {
        alert("CEP inválido!");
    }
    return "";
}

const cpf = '12345679810'

const cpfFormatado = cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")

