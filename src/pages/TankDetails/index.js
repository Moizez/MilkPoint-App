import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import Api from '../../services/api'

import { AuthContext } from '../../contexts/auth'
import Map from '../../components/Map'
import { numberToReal } from '../../components/Helpers'

import Movements from './Movements'
import Specifications from './Specifications'

const initialLayout = { width: Dimensions.get('window').width };

const TankDetails = ({ route }) => {

    const { data } = route.params
    const { user } = useContext(AuthContext)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Características' },
        { key: 'second', title: 'Movimentações' },
    ])

    const [modalVisible, setModalVisible] = useState(false)
    const [mainDataDeposito, setMainDataDeposito] = useState([])
    const [mainDataRetirada, setMainDataRetirada] = useState([])

    const loadResolvedDeposito = async () => {
        const response = await Api.getGeneric(
            `deposito/confirmados${user.perfil === 1 ? `/${user.id}` : '/'}`
        )
        setMainDataDeposito(response)
    }

    const loadResolvedRetirada = async () => {
        const response = await Api.getGeneric(
            `retirada/confirmados${user.perfil === 3 ? `/${user.id}` : '/'}`
        )
        setMainDataRetirada(response)
    }

    useEffect(() => {
        loadResolvedDeposito()
        loadResolvedRetirada()
    }, [data])

    const handleCloseModal = () => setModalVisible(false)

    let nascimento = moment(data.dataCriacao).locale('pt-br').format('L')
    let capacidade = data.qtdAtual + data.qtdRestante
    let tipo = data.tipo == 'BOVINO' ? 'Bovino' : 'Caprino'

    //Lista dos depositos e retiradas por status e usuário logado
    const responsavelId = r => r.tanque.responsavel.id == user.id
    const tanqueId = t => t.tanque.id == data.id
    const depositos = mainDataDeposito.filter(responsavelId)
    const retiradas = mainDataRetirada.filter(responsavelId)

    const depositosPro = mainDataDeposito.filter(tanqueId)
    const dataDeposito = user.perfil === 1 ? depositosPro : depositos

    const retiradasLat = mainDataRetirada.filter(tanqueId)
    const dataRetirada = user.perfil === 3 ? retiradasLat : retiradas

    //Soma de todos os depositos confirmados desde a criação do tanque
    const somar = (acumulado, x) => acumulado + x
    const totalDepositos = dataDeposito.map(s => s.quantidade).reduce(somar, 0)
    const valorTotalDepositos = numberToReal(dataDeposito.map(s => s.valor).reduce(somar, 0))

    //Soma dos depositos dos últimos 15 dias
    const depDays = moment().locale('en').subtract(15, 'days').format('L')
    const depFifteenDays = dataDeposito.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(depDays, 'days')
    })
    const totalQuinzenal = depFifteenDays.map(qtd => qtd.quantidade).reduce(somar, 0)
    const valorDepositosQuinzenal = numberToReal(depFifteenDays.map(s => s.valor).reduce(somar, 0))

    //Soma dos depositos dos últimos 30 dias
    const oneMonth = moment().locale('en').subtract(1, 'month').format('L')
    const depOneMonth = dataDeposito.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(oneMonth, 'days')
    })
    const totalMensal = depOneMonth.map(qtd => qtd.quantidade).reduce(somar, 0)
    const valorDepositosMensal = numberToReal(depOneMonth.map(s => s.valor).reduce(somar, 0))

    //Soma de todas as retiradas confirmadas desde a criação do tanque
    const totalRetitadas = dataRetirada.map(s => s.quantidade).reduce(somar, 0)
    const valorTotalRetiradas = numberToReal(dataRetirada.map(s => s.valor).reduce(somar, 0))

    //Soma das retiradas dos últimos 15 dias
    const retDays = moment().locale('en').subtract(15, 'days').format('L')
    const retFifteenDays = dataRetirada.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(retDays, 'days')
    })
    const totalRetQuinzenal = retFifteenDays.map((qtd) => qtd.quantidade).reduce(somar, 0)
    const valorRetiradasQuinzenal = numberToReal(retFifteenDays.map(s => s.valor).reduce(somar, 0))

    //Soma das retiradas dos últimos 30 dias
    const oneMonthRet = moment().locale('en').subtract(1, 'month').format('L')
    const retOneMonth = dataRetirada.filter(function (q) {
        const regDay = moment(q.dataNow).locale('en').format('L')
        return moment(regDay).isSameOrAfter(oneMonthRet, 'days')
    })
    const totalRetMensal = retOneMonth.map((qtd) => qtd.quantidade).reduce(somar, 0)
    const valorRetiradasMensal = numberToReal(retOneMonth.map(s => s.valor).reduce(somar, 0))

    const renderTabBar = props => (
        <TabBar {...props}
            renderLabel={({ route, color }) => (
                <Text style={{ color, fontSize: 15, height: 30 }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: '#FFF' }}
            style={{ backgroundColor: '#292b2c', height: 35 }}
        />
    );

    const renderScene = SceneMap({
        first: () => <Specifications data={data} />,
        second: () => <Movements data={data} />,
    });

    return (
        <View style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Tanque: <Text style={{ color: 'red' }}>{data.nome}</Text></Text>
            </View>
            <Divider />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitulo: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',
    },
    containerCard: {
        flex: 1,
        marginHorizontal: 12,
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
        fontSize: 15
    },
    text: {
        fontSize: 15,
        fontWeight: 'normal',
    },
    titleMov: {
        fontWeight: 'bold',
        fontSize: 12
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
    icon: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2a9d8f',
        width: 25,
        borderRadius: 3
    }
})

export default TankDetails