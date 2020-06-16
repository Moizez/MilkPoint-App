import React, { useState } from 'react';
import { View, Modal } from 'react-native';

import { BoxModal, BoxInfo, TituloInfo, BoxTitulo, BoxEndereco } from './styles'

export function ModalDepositoRetirada() {

    const [modalVisible, setModalVisible] = useState(true)

    return (

        <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
        >
            <BoxModal>
                <BoxTitulo>
                    <TituloInfo>Tanque: </TituloInfo>
                    <TituloInfo style={{ color: 'red' }}>T55</TituloInfo>
                </BoxTitulo>

                <BoxInfo>
                    <BoxEndereco>

                    </BoxEndereco>
                </BoxInfo>

                <Button
                    title='Fechar Modal'
                    onPress={() => { setModalVisible(!modalVisible) }}
                ></Button>
            </BoxModal>
        </Modal>
    )
}