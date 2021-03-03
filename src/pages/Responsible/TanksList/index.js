import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Speedometer from 'react-native-speedometer-chart'

const TanksList = ({ data }) => {

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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('TankDetails', { data: data })} activeOpacity={0.9}>
                <View style={styles.iconContainer}>
                    {data.tipo == 'BOVINO' ?
                        <Image style={styles.goatImage} source={require('../../../assets/images/cow-circle.png')} /> :
                        <Image style={styles.goatImage} source={require('../../../assets/images/goat-circle.png')} />
                    }
                    <Text style={styles.title}>Tanque: <Text style={styles.text}>{data.nome}</Text></Text>
                    <Icon name={data.status ? 'beaker-check' : 'beaker-remove'} size={35} color={data.status ? '#2a9d8f' : '#da1e37'} />
                </View>

                <View style={{ alignItems: 'center' }}>

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

                </View>

                <View style={{ width: '95%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 10 }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Capacidade</Text>
                        <Text>{capacidade} litros</Text>
                    </View>
                    <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Volume atual</Text>
                        <Text>{data.qtdAtual} litros</Text>
                    </View>
                    <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Cabem</Text>
                        <Text>{data.qtdRestante} litros</Text>
                    </View>
                </View>

            </TouchableOpacity>

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
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    title: {
        fontSize: 17, fontWeight: 'bold'
    },
    text: {
        fontWeight: 'normal'
    },
    goatImage: {
        width: 35,
        height: 35
    }
})

export default TanksList
