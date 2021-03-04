import React, { useState, useEffect } from 'react'
import { FAB } from 'react-native-paper'
import { StyleSheet, Modal, Dimensions, Text, View } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native'

import Api from '../../../services/technician.api'

import Header from '../../../components/Header'
import ModalCreateTanque from '../../../components/ModalCreateTanque'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import Loader from '../../../components/Loader'

import ActiveTanks from './ActiveTanks'
import InactiveTanks from './InactiveTanks'

const initialLayout = { width: Dimensions.get('window').width };

const TechnicianHome = () => {

    const navigation = useNavigation()

    //TabView states
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Tanques Ativos' },
        { key: 'second', title: 'Tanques Inativos' },
    ])

    const [activeTanks, setActiveTanks] = useState([])
    const [inactiveTanks, setInactiveTanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)

    const loadActiveTanks = async () => {
        setLoading(true)
        const response = await Api.getActiveTanks()
        setActiveTanks(response)
        setLoading(false)
    }

    const loadInactiveTanks = async () => {
        setLoading(true)
        const response = await Api.getInactiveTanks()
        setInactiveTanks(response)
        setLoading(false)
    }

    const onLoad = (value) => setLoading(value)

    useEffect(() => {
        loadActiveTanks()
        loadInactiveTanks()
    }, [])

    const closeModal = () => setVisible(false)
    const closeAlertErroSuccess = () => setAlertVisible(false)
    const showAlertErroSuccess = () => setAlertVisible(true)

    const renderTabBar = props => (
        <TabBar {...props}
            renderLabel={({ route, color }) => (
                <Text style={{ color, fontSize: 14, height: 30 }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: '#FFF' }}
            style={{ backgroundColor: '#292b2c', height: 35 }}
        />
    )

    const renderScene = SceneMap({
        first: () => <ActiveTanks data={activeTanks} loadActiveTanks={loadActiveTanks} />,
        second: () => <InactiveTanks data={inactiveTanks} loadInactiveTanks={loadInactiveTanks} />
    });

    return (
        <>
            <Header showNameList={true} sizeNameList={147} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
                onSwipeEnd={() => (
                    loadActiveTanks(),
                    loadInactiveTanks()
                )}
                sceneContainerStyle={styles.container}
            />

            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                onPress={() => navigation.navigate('CreateTankForm')}
            />

            <Modal
                visible={isVisible}
                animationType='fade'
                transparent={false}
            >
                <ModalCreateTanque
                    onCloseModal={closeModal}
                    showAlertErroSuccess={showAlertErroSuccess}
                    onRefresh={loadActiveTanks}
                    onLoad={onLoad}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {alertVisible &&
                    <AlertErrorSuccess
                        onClose={closeAlertErroSuccess}
                        title='Aviso'
                        message='Tanque criado com sucesso!'
                        titleButton='Ok'
                        jsonPath={require('../../../assets/lottie/success-icon.json')}
                        buttonColor={'#292b2c'}
                    />
                }
            </Modal>
            {loading && <Loader />}
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#292b2c',
        borderWidth: 2,
        borderColor: '#FFF',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    container: {
        flex: 1
    }
})

export default TechnicianHome