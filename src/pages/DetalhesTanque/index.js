import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../contexts/auth'
import Map from '../../components/Map'

export default function DetalhesTanque({ route }) {

    const { data } = route.params

    const {
        user,
        loadListDepositosResolvidos,
        depositoResolvido,
        loadListRetiradasResolvidas,
        retiradaResolvida
    } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false)

    const handleCloseModal = () => setModalVisible(false)

    let nascimento = moment(data.dataCriacao).locale('pt-br').format('L')
    let capacidade = data.qtdAtual + data.qtdRestante
    let tipo = data.tipo == 'BOVINO' ? 'Bovino' : 'Caprino'

    //Lista dos depositos e retiradas por status e usuário logado
    const responsavelId = p => p.tanque.responsavel.id == user.id
    const tanqueRetId = t => t.tanque.id == data.id
    const depositos = depositoResolvido.filter(responsavelId)
    const retiradas = retiradaResolvida.filter(responsavelId)

    const laticinioId = l => l.laticinio.id == user.id
    const retiradasLat = retiradaResolvida.filter(laticinioId).filter(tanqueRetId)
    const loadPerfilRet = user.perfil === 3 ? retiradasLat : retiradas

    const produtorId = p => p.produtor.id == user.id
    const depositosPro = depositoResolvido.filter(produtorId).filter(tanqueRetId)
    const loadPerfilPro = user.perfil === 1 ? depositosPro : depositos

    //Soma de todos os depositos confirmados desde a criação do tanque
    const somar = (acumulado, x) => acumulado + x
    const totalDepositos = loadPerfilPro.map((s) => s.quantidade).reduce(somar, 0)

    //Soma dos depositos dos últimos 15 dias
    const depDays = moment().locale('en').subtract(15, 'days').format('L')
    const depFifteenDays = loadPerfilPro.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(depDays, 'days')
    })
    const totalQuinzenal = depFifteenDays.map((qtd) => qtd.quantidade).reduce(somar, 0)

    //Soma dos depositos dos últimos 30 dias
    const oneMonth = moment().locale('en').subtract(1, 'month').format('L')
    const depOneMonth = loadPerfilPro.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(oneMonth, 'days')
    })
    const totalMensal = depOneMonth.map((qtd) => qtd.quantidade).reduce(somar, 0)

    //Soma de todas as retiradas confirmadas desde a criação do tanque
    const totalRetitadas = loadPerfilRet.map((s) => s.quantidade).reduce(somar, 0)

    //Soma das retiradas dos últimos 15 dias
    const retDays = moment().locale('en').subtract(15, 'days').format('L')
    const retFifteenDays = loadPerfilRet.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(retDays, 'days')
    })
    const totalRetQuinzenal = retFifteenDays.map((qtd) => qtd.quantidade).reduce(somar, 0)

    //Soma das retiradas dos últimos 30 dias
    const oneMonthRet = moment().locale('en').subtract(1, 'month').format('L')
    const retOneMonth = loadPerfilRet.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(oneMonthRet, 'days')
    })
    const totalRetMensal = retOneMonth.map((qtd) => qtd.quantidade).reduce(somar, 0)

    useEffect(() => {
        loadListDepositosResolvidos()
        loadListRetiradasResolvidas()
    }, [])

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
                    <Text style={styles.textItem}>Ainda cabe: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
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
                    {data.complemento && <Text style={styles.textItem}>Complemento: <Text style={styles.text}>{data.complemento}</Text></Text>}

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ ...styles.ContainerButtons, marginBottom: 0 }}>
                        <Text style={styles.textButton}>Como Chegar?</Text>
                        <Icon name='google-maps' color='#FFF' size={30} />
                    </TouchableOpacity>
                </View>
                {user.perfil === 1 &&
                    <View style={styles.cardItem}>
                        <Text style={styles.tituloItem}>MOVIMENTAÇÕES</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                        <Text style={styles.textItem}>Total de depósitos:</Text>
                        <Text style={styles.textItem}>- Nos últimos 15 dias: <Text style={styles.text}>{totalQuinzenal} litros</Text></Text>
                        <Text style={styles.textItem}>- Nos últimos 30 dias: <Text style={styles.text}>{totalMensal} litros</Text></Text>
                        <Text style={styles.textItem}>- Desde a criação: <Text style={styles.text}>{totalDepositos} litros</Text></Text>
                    </View>
                }
                {user.perfil === 2 &&
                    <View style={styles.cardItem}>
                        <Text style={styles.tituloItem}>MOVIMENTAÇÕES</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                        <Text style={styles.textItem}>Total de depósitos:</Text>
                        <Text style={styles.textItem}>- Nos últimos 15 dias: <Text style={styles.text}>{totalQuinzenal} litros</Text></Text>
                        <Text style={styles.textItem}>- Nos últimos 30 dias: <Text style={styles.text}>{totalMensal} litros</Text></Text>
                        <Text style={styles.textItem}>- Desde a criação: <Text style={styles.text}>{totalDepositos} litros</Text></Text>
                        <Text style={{ ...styles.textItem, marginTop: 10 }}>Total de retiradas:</Text>
                        <Text style={styles.textItem}>- Nos últimos 15 dias: <Text style={styles.text}>{totalRetQuinzenal} litros</Text></Text>
                        <Text style={styles.textItem}>- Nos últimos 30 dias: <Text style={styles.text}>{totalRetMensal} litros</Text></Text>
                        <Text style={styles.textItem}>- Desde a criação: <Text style={styles.text}>{totalRetitadas} litros</Text></Text>
                    </View>
                }
                {user.perfil === 3 &&
                    <View style={styles.cardItem}>
                        <Text style={styles.tituloItem}>MOVIMENTAÇÕES</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                        <Text style={{ ...styles.textItem, marginTop: 10 }}>Total de retiradas:</Text>
                        <Text style={styles.textItem}>- Nos últimos 15 dias: <Text style={styles.text}>{totalRetQuinzenal} litros</Text></Text>
                        <Text style={styles.textItem}>- Nos últimos 30 dias: <Text style={styles.text}>{totalRetMensal} litros</Text></Text>
                        <Text style={styles.textItem}>- Desde a criação: <Text style={styles.text}>{totalRetitadas} litros</Text></Text>
                    </View>
                }

                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={modalVisible}
                >
                    <Map dataMap={data} onClose={handleCloseModal} />
                </Modal>

            </ScrollView>

            <FAB
                style={styles.fab}
                small={false}
                icon="file-pdf-outline"
                color='#FFF'
                onPress={() => { }}
            />

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
        fontWeight: 'bold',
        fontSize: 17
    },
    text: {
        fontSize: 17,
        fontWeight: 'normal',
    },
    cardItem: {
        flex: 1,
        marginVertical: 15,
    },
    ContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292b2c',
        width: '100%',
        height: 45,
        borderRadius: 5,
        marginTop: 15,
    },
    textButton: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF',
        marginRight: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#292b2c',
        borderWidth: 1,
        borderColor: '#FFF'
    },
})