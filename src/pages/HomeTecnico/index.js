import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import { StyleSheet, Modal } from 'react-native'

import { AuthContext } from '../../contexts/auth'
import ListaTanques from '../HomeTecnico/ListaTanques'
import Header from '../../components/Header'
import ModalCreateTanque from '../../components/ModalCreateTanque'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function HomeTecnico() {

    const { loadListTanques, tanque } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
        loadListTanques()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListTanques()
        setIsRefreshing(false)
    }

    const closeModal = () => { setVisible(false) }

    return (
        <Container>
            <Header msg={'Lista de tanques'} />
            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaTanques data={item} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há registro de transações!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar os tanques</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap' color='#adb5bd' size={60} />
                                <NomeAviso>Clique no tanque para mais detalhes e opções</NomeAviso>
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
                    onClose={closeModal}
                />
            </Modal>
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