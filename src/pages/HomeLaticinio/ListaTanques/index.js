import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modal } from 'react-native'

import GraficoTanque from '../../../components/GraficoTanque'
import ModalDetalheTanque from '../../../components/ModalDetalheTanque'


import { AuthContext } from '../../../contexts/auth'

import {
    BoxGeral, Container, Nome, BoxTanque, BoxModal, BoxInfoModal, TituloInfo, InputModal, BoxBtn, BtnConfirm,
    BtnCancel, Button, BtnText, BoxFabBtn, FabBtn, FabText
} from './styles'

export default function ListaTanques({ data }) {

    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)

    const [quantidade, setQuantidade] = useState()
    const [idLat, setIdLat] = useState(user.id)
    const [idTanque, setIdTanque] = useState(data.id)

    //Solicitação de retirada pelo laticinio
    const requestRetirada = async (quantidade, idLat, idTanque) => {
        const data = new FormData();
        data.append("quantidade", quantidade);
        data.append("idLat", idLat);
        data.append("idTanque", idTanque);

        await fetch('https://milkpoint.herokuapp.com/api/retirada', { method: 'POST', body: data })

        if (idLat === undefined) {
            alert('Erro ao processar o pedido! QTD: ' + quantidade + ' ID Laticinio: ' + idLat + ' ID Tanque: ' + idTanque)
        } else {
            alert("Retirada realizada com sucesso!" + "\n" + "Aguarde a confirmação!")
        }
    };

    async function handleRetirada() {
        setQuantidade(quantidade)
        setIdLat(user.id)
        setIdTanque(data.id)
        await requestRetirada(quantidade, idLat, idTanque)
        setModalVisibleDois(!modalVisibleDois)
        setModalVisible(!modalVisible)
    }

    function handleCloseModal() {
        setModalVisible(false)
    }

    return (
        <BoxGeral>
            <Container onPress={() => { setModalVisible(!modalVisible) }}>
                <BoxTanque>
                    <Nome>Tanque: {data.nome}</Nome>
                    <Nome>Tipo do Leite: {data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Nome>
                    <Nome>Qtd. Atual: {data.qtdAtual}L</Nome>
                    <Nome>Qtd. Restante: {data.qtdRestante}L</Nome>
                    <Nome>Responsável: {data.responsavel.nome} </Nome>
                </BoxTanque>

                <GraficoTanque dataGrafico={data} />
            </Container>

            {/*MODAL DETALHE DO TANQUE */}
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <ModalDetalheTanque
                    dataTanque={data}
                    onClose={handleCloseModal}
                />

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisibleDois}
                >
                    <BoxModal>

                        <BoxInfoModal>
                            <TituloInfo>Solicitação de retirada no tanque</TituloInfo>
                            <InputModal
                                placeholder='Quantidade em litros (L)'
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                value={quantidade}
                                onChangeText={(quantidade) => setQuantidade(quantidade)}
                            />

                            <BoxBtn>
                                <BtnConfirm>
                                    <Button onPress={handleRetirada}>
                                        <BtnText>Confirmar</BtnText>
                                    </Button>
                                </BtnConfirm>

                                <BtnCancel>
                                    <Button onPress={() => { setModalVisibleDois(!modalVisibleDois) }}>
                                        <BtnText>Cancelar</BtnText>
                                    </Button>
                                </BtnCancel>
                            </BoxBtn>

                        </BoxInfoModal>

                    </BoxModal>

                </Modal>

                <BoxFabBtn>
                    <FabBtn onPress={() => { setModalVisibleDois(!modalVisibleDois) }}>
                        <Icon
                            name='arrow-up-bold-hexagon-outline'
                            color='#FFF'
                            size={20}>
                        </Icon>
                        <FabText>Retirar</FabText>
                    </FabBtn>
                </BoxFabBtn>

            </Modal>
        </BoxGeral>
    );
}
