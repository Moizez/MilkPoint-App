import React, { useState, useContext, Fragment } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../contexts/auth'
import { numberToReal } from '../Helpers'

import {
    Container, CardBox, InfoBox, Text, BoldText, IconBox, MoreInfoButton, DividerV,
    DividerH, ExpandedCardBox, ExpandedHeader, ExpandedInfoBox, ExpandedItemBox
} from './styles'

const ConfirmedHistoryCard = ({ data }) => {

    let date = moment(data.dataNow).format('L [às] LT[h]')
    let requestDate = moment(data.dataSolicitacao).format('L [às] LT[h]')
    let qtd = data.quantidade.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    const { user } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    const bucketColor = () => {
        if (data.confirmacao == true) {
            return 'Confirmado'
        } if (data.excluido == true) {
            return 'Cancelado'
        } else {
            return 'Pendente'
        }
    }
    let status = bucketColor()
    let valor = numberToReal(data.valor)

    return (
        <Container>

            <CardBox>
                <InfoBox>
                    <BoldText>Tanque: <Text>{data.tanque.nome}</Text></BoldText>
                    <BoldText>Tipo do leite: <Text>{data.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></BoldText>
                    <BoldText>Qtd. Solicitada: <Text>{data.quantidade}</Text></BoldText>
                    <BoldText>Data/Hora: <Text>{requestDate}</Text></BoldText>
                </InfoBox>
                <DividerV />
                <IconBox>
                    <Icon name='bucket' size={30} color='#2a9d8f' />
                </IconBox>
            </CardBox>

            {show &&
                <ExpandedCardBox onPress={() => setShow(false)} activeOpacity={1}>

                    <ExpandedHeader>
                        <BoldText>Mais informações</BoldText>
                    </ExpandedHeader>

                    <ExpandedInfoBox>
                        <ExpandedItemBox>
                            <BoldText>Tipo do leite</BoldText>
                            <Text>{data.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text>
                        </ExpandedItemBox>

                        <DividerV />

                        <ExpandedItemBox>
                            <BoldText>Valor da solicitação</BoldText>
                            <Text>{valor}</Text>
                        </ExpandedItemBox>
                    </ExpandedInfoBox>

                    <DividerH />

                    <ExpandedInfoBox>
                        <ExpandedItemBox>
                            <BoldText>Data da aprovação</BoldText>
                            <Text>{date}</Text>
                        </ExpandedItemBox>

                        <DividerV />

                        <ExpandedItemBox>
                            <BoldText>Responsável</BoldText>
                            <Text>{data.tanque.responsavel.nome}</Text>
                        </ExpandedItemBox>

                    </ExpandedInfoBox>


                </ExpandedCardBox>
            }

            <MoreInfoButton onPress={() => setShow(!show)} activeOpacity={0.8}>
                <Icon name={show ? 'chevron-thin-up' : 'chevron-thin-down'} size={18} color='#2a9d8f' />
            </MoreInfoButton>

        </Container>
    );
}

export default ConfirmedHistoryCard