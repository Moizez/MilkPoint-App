import React, { useState, useEffect, Fragment } from 'react'
import { FAB } from 'react-native-paper'
import { StyleSheet, Modal, Dimensions, Text } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native'

import Header from '../../../components/Header'
import WarningModal from '../../../components/Modals/WarningModal'
import ActiveTanks from './ActiveTanks'
import InactiveTanks from './InactiveTanks'

const initialLayout = { width: Dimensions.get('window').width };

const TechnicianHome = () => {

    const navigation = useNavigation()
    const [warningModal, setWarningModal] = useState(false)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Tanques Ativos' },
        { key: 'second', title: 'Tanques Inativos' },
    ])

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

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
        first: () => <ActiveTanks />,
        second: () => <InactiveTanks />
    });

    return (
        <Fragment>
            <Header showNameList={true} sizeNameList={147} />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateTankForm')}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message='Tanque criado com sucesso!'
                    lottie={require('../../../assets/lottie/success-icon.json')}
                />
            </Modal>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#00abe7',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default TechnicianHome