import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, PermissionsAndroid, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker, Callout } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from 'react-native-geolocation-service'
import { getDistance, convertDistance } from 'geolib'

export default function Map({ dataMap, onClose }) {

    const navigation = useNavigation()
    const mapRef = useRef(null)

    let pinCow = require('../../assets/images/pin-cow.png')
    let pinGoat = require('../../assets/images/pin-goat.png')
    let lat = dataMap.latitude
    let long = dataMap.longitude

    const [destination] = useState({
        latitude: lat,
        longitude: long,
    })

    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        error: null
    })

    const getDistancia = () => {
        let distance = getDistance(
            { latitude: initialRegion.latitude, longitude: initialRegion.longitude },
            { latitude: lat, longitude: long }
        )
        return convertDistance(distance, 'km').toFixed(1)
    }

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

            <View style={styles.distanceView}>
                <Text style={styles.distanceText}>Você está a {getDistancia()}km do tanque</Text>
            </View>

            <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation
                loadingEnabled
                region={{
                    latitude: initialRegion.latitude,
                    longitude: initialRegion.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
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
                            onReady={result => {
                                result.distance
                                result.duration
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        top: 145,
                                        bottom: 50,
                                        right: 50,
                                        left: 50
                                    }
                                })
                            }}
                        />
                    )
                }
                <Marker
                    coordinate={{ latitude: lat, longitude: long }}
                    title={'Tanque: ' + dataMap.nome}
                    description={`Cabem: ${dataMap.qtdRestante} litros`}
                >
                    <Image source={dataMap.tipo == 'BOVINO' ? pinCow : pinGoat}
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

            <TouchableOpacity style={styles.btnMap} onPress={onClose}>
                <Text style={styles.btnMapText}>Fechar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '85%',
        marginBottom: 5,
        marginTop: 5
    },
    cardInfo: {
        width: 200,
    },
    titleCard: {
        fontWeight: 'bold'
    },
    textSimple: {
        fontWeight: 'normal'
    },
    distanceView: {
        flexDirection: 'row',
        width: '100%',
        height: 30,
        backgroundColor: '#292b2c',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    distanceText: {
        fontSize: 17,
        color: '#FFF'
    },
    btnMap: {
        width: '100%',
        height: 45,
        backgroundColor: '#292b2c',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnMapText: {
        fontSize: 18,
        color: '#FFF'
    }
})


