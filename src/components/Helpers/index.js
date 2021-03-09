import moment from 'moment'
import 'moment/locale/pt-br'

const somar = (acumulado, x) => acumulado + x

//Soma todas as quantidades em litros do array
const sumAllLiters = (data) => {
    let result = data.map(i => i.quantidade).reduce(somar, 0)
    return result
}

//Soma todos os valores em reais do array
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

//Filtrar os dados da quantidade de leite do objeto pela data recebida
export const sumLitersByDate = (data, day, period) => {
    let date = moment().locale('en').subtract(day, period).format('L')
    let result = data.filter(i => {
        let dateDatabase = moment(i.dataNow).locale('en').format('L')
        return moment(dateDatabase).isSameOrAfter(date, 'days')
    })
    return sumAllLiters(result)
}

//Filtrar os valores em reais do objeto pela data recebida  
export const sumValuesByDate = (data, day, period) => {
    let date = moment().locale('en').subtract(day, period).format('L')
    let result = data.filter(i => {
        let dateDatabase = moment(i.dataNow).locale('en').format('L')
        return moment(dateDatabase).isSameOrAfter(date, 'days')
    })
    return sumAllValuesByDate(result)
}

//Filtar dados pelo valor da quantidade de leite recebida


//Filtrar dados pela data do dia
export const filterToday = (selectedDate, data) => {
    let day = moment(selectedDate).format('L')
    let result = data.filter(i => {
        let dateDatabase = moment(i.dataNow).format('L')
        return dateDatabase === day
    })
    return result
}

//Filtrar pelo intervalo de data especifico
export const filterByDateInterval = (value, period, data) => {
    let date = moment().locale('en').subtract(value, period).format('L')
    let result = data.filter(i => {
        let dateDatabase = moment(i.dataNow).locale('en').format('L')
        return moment(dateDatabase).isSameOrAfter(date, 'days')
    })
    return result
}

//Filtrar entre duas datas especificas
export const filterByBetweenDates = (data, initialDate, finalDate) => {
    let initial = moment(initialDate).locale('en').format('L')
    let final = moment(finalDate).locale('en').format('L')
    let result = data.filter(i => {
        let dateDatabase = moment(i.dataNow).locale('en').format('L')
        return moment(dateDatabase).isBetween(initial, final, undefined, '[]')
    })
    return result
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

