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

    const { user } = useContext(AuthContext)

    //Fab button
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [tanque, setTanque] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [status, setStatus] = useState(true)

    const loadTanques = async () => {
        setLoading(true)
        const state = status ? 'ativos' : 'inativos'
        const response = await api.get(`tanque/${state}`)
        setTanque(response.data)
        setLoading(false)
    }

    const onLoad = (value) => setLoading(value)

    useEffect(() => {
        loadTanques()
    }, [status])

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
            <Header
                msg={status ? 'Lista de tanques ATIVOS' : 'Lista de tanques INATIVOS'}
                disabled={true}
                calendar={
                    <Icon
                        name={status ? 'beaker-check' : 'beaker-remove'}
                        color={status ? '#2a9d8f' : '#da1e37'}
                        size={25}
                    />}
            />
            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaTanques data={item} onLoad={onLoad} onRefresh={loadTanques} />}
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

            <FAB.Group
                fabStyle={styles.fab}
                color='#FFF'
                open={open}
                icon={open ? 'close' : 'menu'}
                actions={[
                    {
                        icon: 'plus',
                        label: 'Criar Tanque',
                        color: '#0077b6',
                        style: styles.fabActions,
                        onPress: () => setVisible(true)
                    },
                    {
                        icon: 'beaker-check',
                        label: 'Tanques Ativos',
                        color: '#2a9d8f',
                        style: styles.fabActions,
                        onPress: () => setStatus(true)
                    },
                    {
                        icon: 'beaker-remove',
                        label: 'Tanques Inativos',
                        color: '#da1e37',
                        style: styles.fabActions,
                        onPress: () => setStatus(false)
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />
            <Modal
                visible={isVisible}
                animationType='fade'
                transparent={false}
            >
                <ModalCreateTanque
                    dataMap={tanque}
                    onCloseModal={closeModal}
                    showAlertErroSuccess={showAlertErroSuccess}
                    onRefresh={loadTanques}
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
        backgroundColor: '#292b2c',
        borderWidth: 2,
        borderColor: '#FFF'
    },
    fabActions: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
