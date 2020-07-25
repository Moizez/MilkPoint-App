import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import moment from 'moment'

import { AuthContext } from '../../contexts/auth'

export default function DetalhesTanque({ route }) {

    const { data } = route.params

    const { user } = useContext(AuthContext)
    let nascimento = moment(data.dataCriacao).locale('pt-br').format('L')
    let capacidade = data.qtdAtual + data.qtdRestante
    let tipo = data.tipo == 'BOVINO' ? 'bovino' : 'caprino'

    return (
        <View style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Detalhes do Tanque: <Text style={{ color: 'red' }}>{data.nome}</Text></Text>
            </View>
            <ScrollView style={styles.containerCard}>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>CARACTERISTICAS</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Capacidade: <Text style={styles.text}>{capacidade} litros</Text></Text>
                    <Text style={styles.textItem}>Volume atual: <Text style={styles.text}>{data.qtdAtual} litros</Text></Text>
                    <Text style={styles.textItem}>Cabem ainda: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
                    <Text style={styles.textItem}>Tipo do leite: <Text style={styles.text}>{tipo}</Text></Text>
                    <Text style={styles.textItem}>Data de criação: <Text style={styles.text}>{nascimento}</Text></Text>
                    <Text style={styles.textItem}>Responsável: <Text style={styles.text}>{data.responsavel.nome}</Text></Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>LOCALIZAÇÃO</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Estado: <Text style={styles.text}>{data.uf}</Text></Text>
                    <Text style={styles.textItem}>Cidade: <Text style={styles.text}>{data.localidade}</Text></Text>
                    <Text style={styles.textItem}>CEP: <Text style={styles.text}>{data.cep}</Text></Text>
                    <Text style={styles.textItem}>Bairro: <Text style={styles.text}>{data.bairro}</Text></Text>
                    <Text style={styles.textItem}>Rua/Comunidade: <Text style={styles.text}>{data.logradouro}</Text></Text>
                    <Text style={styles.textItem}>Complemento: <Text style={styles.text}>{data.complemento}</Text></Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>MOVIMENTAÇÕES</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Total de depósitos:</Text>
                    <Text style={styles.textItem}>- No último mês: <Text style={styles.text}>3000 litros</Text></Text>
                    <Text style={styles.textItem}>- Na última semana: <Text style={styles.text}>344 litros</Text></Text>
                    <Text style={styles.textItem}>- Desde a criação: <Text style={styles.text}>25000 litros</Text></Text>
                    <Text style={styles.textItem}>Total de retiradas:</Text>
                    <Text style={styles.textItem}>- No último mês: <Text style={styles.text}>3000 litros</Text></Text>
                    <Text style={styles.textItem}>- Na última semana: <Text style={styles.text}>344 litros</Text></Text>
                    <Text style={styles.textItem}>- Desde a criação: <Text style={styles.text}>25000 litros</Text></Text>
                </View>
                <View style={styles.ContainerButtons}>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.textButton}>Gerar Relatório</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    containerTitulo: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',
    },
    containerCard: {
        flex: 1,
        marginHorizontal: 12,
        padding: 12
    },
    containerImage: {
        marginRight: 6,
    },
    image: {
        width: 80,
        height: 80,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    tituloPerfil: {
        color: '#FFF',
        fontStyle: 'italic',
        fontSize: 13
    },
    editPhoto: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 12,
        margin: 4
    },
    titulo: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF'
    },
    tituloItem: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textItem: {
        fontSize: 17
    },
    text: {
        fontSize: 17,
        fontFamily: 'Lato',
    },
    cardItem: {
        flex: 1,
        marginVertical: 15,
    },
    ContainerButtons: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        backgroundColor: '#292b2c',
        justifyContent: 'center',
        width: '95%',
        height: 45,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15
    },
    textButton: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF'
    }
})