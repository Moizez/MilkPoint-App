import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'

import styled from 'styled-components/native';

const MarkMapModal = ({ closeModal, permission, milkType, getCoordinates }) => {

    const images = {
        cow: require('../../../assets/images/pin-cow.png'),
        goat: require('../../../assets/images/pin-goat.png')
    }

    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 })
    const [myLatitude, setMyLatitude] = useState(0)
    const [myLongitude, setMyLongitude] = useState(0)

    const getLocation = (event) => {
        setMyLatitude(event.nativeEvent.coordinate.latitude)
        setMyLongitude(event.nativeEvent.coordinate.longitude)
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
                style={{ flex: 1, margin: 3 }}
                mapType='hybrid'
                rotateEnabled={false}
                showsMyLocationButton={true}
                showsUserLocation={true}
                loadingEnabled={true}
                minZoomLevel={18}
                onPress={getLocation}
                region={{
                    latitude: userPosition.latitude,
                    longitude: userPosition.longitude,
                    latitudeDelta: 0.0150,
                    longitudeDelta: 0.0100
                }}
            >
                <Marker coordinate={{ latitude: myLatitude, longitude: myLongitude }} >
                    <Image source={milkType === 'BOVINO' ? images.cow : images.goat} />
                </Marker>
            </MapView>

            <CloseButton onPress={() => { closeModal()}}>
                <Icon name='chevron-down' size={35} color='#FFF' />
            </CloseButton>

            {(myLatitude != 0 || myLongitude != 0) &&
                <ButtonBox>
                    <SaveButton onPress={() => { getCoordinates(myLatitude, myLongitude), closeModal() }}>
                        <Icon name='check-circle' size={30} color='#FFF' />
                    </SaveButton>
                </ButtonBox>
            }

            {(myLatitude === 0 || myLongitude === 0) &&
                <ButtonBox>
                    <InfoBox>
                        <Text>Clique em um ponto do mapa para marcar a exata localização do tanque</Text>
                    </InfoBox>
                </ButtonBox>
            }

        </Container>

    );
}

export default MarkMapModal

const Container = styled.View`
    flex: 1;
    background-color: #ececec;
`;

const Image = styled.Image`
    height: 55px;
    width: 55px;
`;

const ButtonBox = styled.View`
    height: 48px;
    align-items: center;
    justify-content: center;
    margin: 8px 3px 10px 3px;
`;

const InfoBox = styled.View`
    height: 48px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #292b2c;
    padding: 5px;
`;

const SaveButton = styled.TouchableOpacity`
    height: 48px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #2a9d8f;
`;

const CloseButton = styled.TouchableOpacity`
    background-color: #292b2c;
    border-radius: 18px;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    position: absolute;
    left: 15px;
    top: 15px;
`;

const Text = styled.Text`
    color: #FFF;
    font-size: 16px;
    text-align: center;
`;


