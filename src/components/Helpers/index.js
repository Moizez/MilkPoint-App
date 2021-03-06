import moment from 'moment'
import 'moment/locale/pt-br'

const somar = (acumulado, x) => acumulado + x

const sumAllLiters = (data) => {
    let result = data.map(i => i.quantidade).reduce(somar, 0)
    return result
}

const sumAllValuesByDate = (data) => {
    let result = data.map(i => i.valor).reduce(somar, 0)
    return numberToReal(result)
}

//Função para converter valores para nossa moeda em real
export const numberToReal = (numero) => {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

export const sumLitersByDate = (data, day, period) => {
    const date = moment().locale('en').subtract(day, period).format('L')
    const setDate = data.filter(i => {
        const regDay = moment(i.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(date, 'days')
    })
    return sumAllLiters(setDate)
}

export const sumValuesByDate = (data, day, period) => {
    const date = moment().locale('en').subtract(day, period).format('L')
    const setDate = data.filter(i => {
        const regDay = moment(i.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(date, 'days')
    })
    return sumAllValuesByDate(setDate)
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

