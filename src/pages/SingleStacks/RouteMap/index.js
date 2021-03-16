import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import MapViewDirections from 'react-native-maps-directions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Geolocation from 'react-native-geolocation-service'
import { getDistance, convertDistance } from 'geolib'
import styled from 'styled-components/native';

import key from '../../../keys/api.key'


const RouteMap = ({ route }) => {

    const navigation = useNavigation()
    const { data, permission } = route.params
    const map = useRef(null)

    const images = {
        cow: require('../../../assets/images/pin-cow.png'),
        goat: require('../../../assets/images/pin-goat.png')
    }

    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 })
    const [destination] = useState({ latitude: data.latitude, longitude: data.longitude })

    const getDetachment = () => {
        const distance = getDistance(
            { latitude: userPosition.latitude, longitude: userPosition.longitude },
            { latitude: destination.latitude, longitude: destination.longitude }
        )
        return convertDistance(distance, 'km').toFixed(1)
    }

    useEffect(() => {
        if (permission) {
            Geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                error => {
                    console.log(error.code, error.message)
                }
            )
        }
    }, [permission])

    return (
        <Container>

            <MapView
                style={{ flex: 1 }}
                ref={map}
                showsUserLocation
                loadingEnabled
                region={{
                    latitude: userPosition.latitude,
                    longitude: userPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
                {destination &&
                    <MapViewDirections
                        origin={userPosition}
                        destination={destination}
                        apikey={key.google.secret}
                        strokeWidth={5}
                        strokeColor={data.tipo == 'BOVINO' ? '#0077b6' : '#2a9d8f'}
                        onReady={result => {
                            result.distance
                            result.duration
                            map.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    top: 145,
                                    bottom: 50,
                                    right: 50,
                                    left: 50
                                }
                            })
                        }}
                    />
                }

                <Marker
                    coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                    title={'Tanque: ' + data.nome}
                    description={`Cabem: ${data.qtdRestante} litros`}
                >
                    <Image source={data.tipo == 'BOVINO' ? images.cow : images.goat} />
                </Marker>

                <Header>
                    <Title>Você está a {getDetachment()}km do tanque</Title>
                </Header>

            </MapView>

            <ButtonBox>
                <CloseButton onPress={() => navigation.goBack()}>
                    <Icon name='close-circle' size={30} color='#FFF' />
                </CloseButton>
            </ButtonBox>

        </Container>
    );
}

export default RouteMap

const Container = styled.View`
    flex: 1;
`;

const Header = styled.View`
    height: 25px;
    width: 100%;
    padding: 3px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
`;

const Image = styled.Image`
    height: 55px;
    width: 55px;
`;

const Title = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;

const Text = styled.Text`

`;

const ButtonBox = styled.View`
    height: 48px;
    align-items: center;
    justify-content: center;
    margin: 8px 3px 10px 3px;
`;

const CloseButton = styled.TouchableOpacity`
    height: 48px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #292b2c;
`;




