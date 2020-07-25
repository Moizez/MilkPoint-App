import React, { useState } from 'react'
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Speedometer from 'react-native-speedometer-chart'
import ModalDetalheTanque from '../../../components/ModalDetalheTanque'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ListaTanques({ data }) {

    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()
    const capacidade = data.qtdAtual + data.qtdRestante

    function corGrafico() {
        if (data.qtdAtual > (capacidade / 4) & data.qtdAtual < (capacidade / 2)) {
            return '#f5cb5c'
        } if (data.qtdAtual >= (capacidade / 2)) {
            return '#2a9d8f'
        } else {
            return '#da1e37'
        }
    }

    const handleCloseModal = () => { setModalVisible(false) }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cardButton} onLongPress={() => navigation.navigate('DetalhesTanque', { data: data })} onPress={() => { setModalVisible(true) }} activeOpacity={0.5}>
                <View style={styles.iconContainer}>
                    {data.tipo == 'BOVINO' ?
                        <Icon name='cow' color='blue' size={40} /> :
                        <Icon name='sheep' color='green' size={40} />
                    }
                    <Text style={styles.title}>Tanque: <Text style={styles.text}>{data.nome}</Text></Text>
                </View>

                <Speedometer
                    value={data.qtdAtual}
                    totalValue={capacidade}
                    size={170}
                    outerColor="#d3d3d3"
                    internalColor={corGrafico()}
                    showText
                    text={''}
                    textStyle={{ color: 'black' }}
                    innerColor={'#faf9f9'}
                    showLabels
                    labelStyle={{ color: 'blue' }}
                    labelFormatter={number => `${number}`}
                    showPercent
                    percentStyle={{ color: 'black', fontSize: 22 }}
                />

                <View style={{ width: '95%', height: 1, backgroundColor: '#adb5bd', marginVertical: 10 }}></View>

                <View>
                    <Text>- Volume atual do tanque é de <Text style={{ fontWeight: 'bold' }}>{data.qtdAtual} litros</Text></Text>
                    <Text>- Faltam <Text style={{ fontWeight: 'bold' }}>{data.qtdRestante} litros</Text> para completar o tanque</Text>
                </View>

            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <ModalDetalheTanque
                    dataTanque={data}
                    onClose={handleCloseModal}
                />

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        padding: 10,
        margin: 12,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 1
        },
        elevation: 5,

    },
    cardButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
    },
    title: {
        fontSize: 16, fontWeight: 'bold', marginLeft: 10
    },
    text: {
        fontWeight: 'normal'
    }
})
