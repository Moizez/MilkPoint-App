import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/pt-br'
import api from '../../services/api'

import { AuthContext } from '../../contexts/auth'
import Map from '../../components/Map'
import { numberToReal } from '../../components/Helpers'

export default function DetalhesTanque({ route }) {

    const { data } = route.params
    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [mainDataDeposito, setMainDataDeposito] = useState([])
    const [mainDataRetirada, setMainDataRetirada] = useState([])

    const loadResolvedDeposito = async () => {
        const response = await api.get(`deposito/confirmados${user.perfil === 1 ? `/${user.id}` : '/'}`)
        setMainDataDeposito(response.data)
    }

    const loadResolvedRetirada = async () => {
        const response = await api.get(`retirada/confirmados${user.perfil === 3 ? `/${user.id}` : '/'}`)
        setMainDataRetirada(response.data)
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

    return (
        <View style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Detalhes do Tanque: <Text style={{ color: 'red' }}>{data.nome}</Text></Text>
            </View>
            <ScrollView style={styles.containerCard} showsVerticalScrollIndicator={false}>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>CARACTERISTICAS</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Capacidade: <Text style={styles.text}>{capacidade} litros</Text></Text>
                    <Text style={styles.textItem}>Volume atual: <Text style={styles.text}>{data.qtdAtual} litros</Text></Text>
                    <Text style={styles.textItem}>Cabem: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
                    <Text style={styles.textItem}>Tipo do leite: <Text style={styles.text}>{tipo}</Text></Text>
                    <Text style={styles.textItem}>Data de criação: <Text style={styles.text}>{nascimento}</Text></Text>
                    <Text style={styles.textItem}>Criado por: <Text style={styles.text}>{data.tecnico.nome}</Text></Text>
                    <Text style={styles.textItem}>Responsável: <Text style={styles.text}>{data.responsavel.nome}</Text></Text>
                    {!data.status ? <Text style={styles.textItem}>Inativo: <Text style={styles.text}>{data.observacao}</Text></Text>
                        : <Text style={styles.textItem}>Status: <Text style={styles.text}>Ativo</Text></Text>}
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
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.icon}>
                                <Icon name='basket-fill' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{totalQuinzenal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{totalMensal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{totalDepositos} litros</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ ...styles.icon, backgroundColor: '#fca311' }}>
                                <Icon name='currency-usd' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{valorDepositosQuinzenal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{valorDepositosMensal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{valorTotalDepositos}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }} />

                    </View>
                }
                {user.perfil === 2 &&
                    <View style={styles.cardItem}>
                        <Text style={styles.tituloItem}>MOVIMENTAÇÕES</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', marginTop: 5 }}></View>
                        <View style={{ backgroundColor: '#DDD', height: 25, justifyContent: 'center' }}>
                            <Text style={{ ...styles.textItem, textAlign: 'center' }}>Total de Depósitos</Text>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', marginBottom: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.icon}>
                                <Icon name='basket-fill' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{totalQuinzenal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{totalMensal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{totalDepositos} litros</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ ...styles.icon, backgroundColor: '#fca311' }}>
                                <Icon name='currency-usd' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{valorDepositosQuinzenal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{valorDepositosMensal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{valorTotalDepositos}</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', marginTop: 5 }} />
                        <View style={{ backgroundColor: '#DDD', height: 25, justifyContent: 'center' }}>
                            <Text style={{ ...styles.textItem, textAlign: 'center' }}>Total de retiradas</Text>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', marginBottom: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ ...styles.icon, backgroundColor: '#da1e37' }}>
                                <Icon name='basket-unfill' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{totalRetQuinzenal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{totalRetMensal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{totalRetitadas} litros</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ ...styles.icon, backgroundColor: '#fca311' }}>
                                <Icon name='currency-usd' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{valorRetiradasQuinzenal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{valorRetiradasMensal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{valorTotalRetiradas}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }} />
                    </View>
                }
                {user.perfil === 3 &&
                    <View style={styles.cardItem}>
                        <Text style={styles.tituloItem}>MOVIMENTAÇÕES</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ ...styles.icon, backgroundColor: '#da1e37' }}>
                                <Icon name='basket-unfill' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{totalRetQuinzenal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{totalRetMensal} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{totalRetitadas} litros</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ ...styles.icon, backgroundColor: '#fca311' }}>
                                <Icon name='currency-usd' size={20} color='#FFF' />
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>15 dias</Text>
                                <Text style={styles.text}>{valorRetiradasQuinzenal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>30 dias</Text>
                                <Text style={styles.text}>{valorRetiradasMensal}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }} />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.titleMov}>Total</Text>
                                <Text style={styles.text}>{valorTotalRetiradas}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }} />

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

/*
<FAB
                style={styles.fab}
                small={false}
                icon="file-pdf-outline"
                color='#FFF'
                onPress={() => { }}
            />
 */