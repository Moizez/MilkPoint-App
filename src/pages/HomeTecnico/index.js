import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import { StyleSheet, Modal } from 'react-native'
import api from '../../services/api'

import { AuthContext } from '../../contexts/auth'
import ListaTanques from '../HomeTecnico/ListaTanques'
import Header from '../../components/Header'
import ModalCreateTanque from '../../components/ModalCreateTanque'
import AlertErrorSuccess from '../../components/AlertErrorSuccess'
import Loader from '../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function HomeTecnico() {

    const { user, responsavel } = useContext(AuthContext)

    const [tanque, setTanque] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)

    const loadTanques = async () => {
        setLoading(true)
        const response = await api.get(`tecnico/${user.id}/tanque`)
        setTanque(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadTanques()
    }, [])

    const onRefreshList = async () => {
        setIsRefreshing(true)
        await loadTanques()
        setIsRefreshing(false)
    }

    const closeModal = () => setVisible(false)
    const closeAlertErroSuccess = () => setAlertVisible(false)
    const showAlertErroSuccess = () => setAlertVisible(true)

    return (
        <Container>
            <Header msg={'Lista de tanques'} />
            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaTanques data={item} onRefresh={onRefreshList} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Nenhum tanques disponíveis!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar os tanques</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap-hold' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e segure no tanque para mais detalhes</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                color='#FFF'
                onPress={() => setVisible(true)}
            />
            <Modal
                visible={isVisible}
                animationType='fade'
                transparent={false}
            >
                <ModalCreateTanque
                    dataMap={tanque}
                    data={responsavel}
                    onCloseModal={closeModal}
                    showAlertErroSuccess={showAlertErroSuccess}
                    onRefreshList={onRefreshList}
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
                        jsonPath={require('../../assets/lottie/success-icon.json')}
                        buttonColor={'#292b2c'}
                    />
                }
            </Modal>
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: '#FFF'
    },
})