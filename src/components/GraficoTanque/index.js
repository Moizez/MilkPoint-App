import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Speedometer from 'react-native-speedometer-chart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

export default function GraficoTanque({ dataGrafico, handleOpenModal, activeTanque }) {

    const capacidade = dataGrafico.qtdAtual + dataGrafico.qtdRestante
    const navigation = useNavigation()

    function corGrafico() {
        if (dataGrafico.qtdAtual > (capacidade / 4) & dataGrafico.qtdAtual < (capacidade / 2)) {
            return '#f5cb5c'
        } if (dataGrafico.qtdAtual >= (capacidade / 2)) {
            return '#2a9d8f'
        } else {
            return '#da1e37'
        }
    }

    return (
        <TouchableOpacity style={styles.container} disabled={activeTanque ? activeTanque : false} onLongPress={() => navigation.navigate('DetalhesTanque', { data: dataGrafico })} onPress={handleOpenModal}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {dataGrafico.tipo == 'BOVINO' ?
                    <Image style={styles.goatImage} source={require('../../assets/images/cow-circle.png')} /> :
                    <Image style={styles.goatImage} source={require('../../assets/images/goat-circle.png')} />
                }
                <Icon name={dataGrafico.status ? 'beaker-check' : 'beaker-remove'} size={35} color={dataGrafico.status ? '#2a9d8f' : '#da1e37'} />
            </View>

            <Speedometer
                value={dataGrafico.qtdAtual}
                totalValue={capacidade}
                size={125}
                outerColor="#d3d3d3"
                internalColor={corGrafico()}
                showText
                text={''}
                textStyle={{ color: 'black' }}
                innerColor={'#ececec'}
                showLabels
                labelStyle={{ color: 'blue' }}
                labelFormatter={number => `${number}`}
                showPercent
                percentStyle={{ color: 'black', fontSize: 16 }}
            />

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ececec',
        padding: 5
    },
    goatImage: {
        width: 35,
        height: 35
    }
})