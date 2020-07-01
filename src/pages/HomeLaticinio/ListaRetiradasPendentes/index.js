import React, { useState, useContext } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../../../contexts/auth'
import ModalCancel from '../../../components/ModalCancel'

import { BoxGeral, Nome, BoxIcon, BoxInfoTanque, NomeValor } from './styles'

export default function ListaRetiradasPendentes({ data, index }) {

    const { user } = useContext(AuthContext)

    const [modalCancelVisible, setModalCancelVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false) // não está alterando o estado da variavel confirmação
    const [idRetirada, setIdRetirada] = useState(data.id)
    const [efetuou, setEfetuou] = useState(user.nomeFantasia)

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada, efetuou) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idRetirada", idRetirada);
        data.append("efetuou", efetuou);

        await fetch('https://milkpoint.herokuapp.com/api/retirada/confirmacao', { method: 'POST', body: data })

        if (confirmacao) {
            alert("Pedido confirmado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
        else {
            alert("Pedido cancelado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }

    };

    //Função para cancelar a retirada
    async function handleCancel() {
        setConfirmacao(false)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        await confirmacaoRetirada(false, idRetirada, efetuou) // forçar a confirmação
        setModalCancelVisible(!modalCancelVisible)
    }


    function bucketColor(status) {
        if (data.confirmacao == true) {
            return status = 'Confirmado'
        } if (data.excluido == true) {
            return status = 'Cancelado'
        } else {
            return status = 'Pendente'
        }
    }
    let status = bucketColor()

    function handleCloseCancelModal() {
        setModalCancelVisible(false)
    }

    return (
        <BoxGeral>
            <BoxInfoTanque>
                <Nome>Indice: <NomeValor>{index}</NomeValor></Nome>
                <Nome>Tanque: <NomeValor>{data.tanque.nome}</NomeValor></Nome>
                <Nome>Valor requerido: <NomeValor>{data.quantidade} litros</NomeValor></Nome>
                <Nome>Tipo do leite: <NomeValor>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</NomeValor></Nome>
                <Nome>Data: <NomeValor>{data.dataNow} às {data.horaNow}h</NomeValor></Nome>
            </BoxInfoTanque>
            <BoxIcon onLongPress={() => { setModalCancelVisible(!modalCancelVisible) }}>
                <NomeValor>Retirada</NomeValor>
                {status == 'Confirmado' && (
                    <Icon
                        name='bucket'
                        size={70}
                        color='#2a9d8f'
                    ></Icon>
                )}
                {status == 'Cancelado' && (
                    <Icon
                        name='bucket'
                        size={70}
                        color='#da1e37'
                    ></Icon>
                )}
                {status != 'Cancelado' && status != 'Confirmado' && (
                    < Icon
                        name='bucket'
                        size={70}
                        color='#adb5bd'
                    ></Icon>
                )}
                <NomeValor>{status}</NomeValor>
            </BoxIcon>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalCancelVisible}
            >
                <ModalCancel
                    dataTanque={data}
                    onClose={handleCloseCancelModal}
                    onCancel={handleCancel}
                />
            </Modal>

        </BoxGeral>

    );
}