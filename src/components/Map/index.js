import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, PermissionsAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker, Callout } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from 'react-native-geolocation-service'


export default function Map({ dataMap }) {

    const navigation = useNavigation()

    let pinCow = require('../../assets/images/pin-cow.png')
    let pinSheep = require('../../assets/images/pin-sheep.png')
    let lat = dataMap.latitude
    let long = dataMap.longitude

    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        error: null
    })

    async function verifyLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasLocationPermission(true)
            } else {
                setHasLocationPermission(false)
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const [destination] = useState({
        latitude: lat,
        longitude: long,
    })

    useEffect(() => {
        verifyLocationPermission()
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    setInitialRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null
                    })
                }, error => setInitialRegion({ error: error.message }), {
                enableHighAccuracy: true, timeout: 2000, maximumAge: 1000
            })
        }
    }, [hasLocationPermission])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                loadingEnabled
                region={{
                    latitude: initialRegion.latitude,
                    longitude: initialRegion.longitude,
                    latitudeDelta: 0.2000,
                    longitudeDelta: 0.1000
                }}
            >
                {
                    destination && (
                        <MapViewDirections
                            origin={initialRegion}
                            destination={destination}
                            apikey="AIzaSyCqJEj4QwlweIp1dTC94eqJ6Kb5wUyYL_M"
                            strokeWidth={5}
                            strokeColor={dataMap.tipo == 'BOVINO' ? '#0077b6' : '#2a9d8f'}
                        />
                    )
                }
                <Marker
                    coordinate={{ latitude: lat, longitude: long }}
                    title={'Tanque: ' + dataMap.nome}
                    description={`Cabem: ${dataMap.qtdRestante} litros`}
                >
                    <Image source={dataMap.tipo == 'BOVINO' ? pinCow : pinSheep}
                        style={{ height: 55, width: 55 }}
                    />

                    <Callout onPress={() => navigation.navigate('DetalhesTanque', { data: dataMap })}>
                        <View style={styles.cardInfo}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Informações do Tanque</Text>
                                <Icon name='information' color='#000' size={22} />
                            </View>
                            <View style={{ width: '100%', height: 0.5, backgroundColor: '#DDD', marginVertical: 3 }}></View>
                            <Text style={styles.titleCard}>Tanque: <Text style={styles.textSimple}>{dataMap.nome}</Text></Text>
                            <Text style={styles.titleCard}>Vol. atual: <Text style={styles.textSimple}>{dataMap.qtdAtual} litros</Text></Text>
                            <Text style={styles.titleCard}>Cabem: <Text style={styles.textSimple}>{dataMap.qtdRestante} litros</Text></Text>
                            <Text style={styles.titleCard}>Responsável: <Text style={styles.textSimple}>{dataMap.responsavel.nome}</Text></Text>
                        </View>
                    </Callout>
                </Marker>

            </MapView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%', height: '100%'
    },
    viewButton: {
        position: 'absolute',
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 3,
        width: '95%',
        height: 45,
        top: 18
    },
    textBtn: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18
    },
    cardInfo: {
        width: 200,
    },
    titleCard: {
        fontWeight: 'bold'
    },
    textSimple: {
        fontWeight: 'normal'
    }
})

