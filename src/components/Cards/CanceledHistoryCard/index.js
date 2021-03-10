import React, { useState, Fragment } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { numberToReal } from '../../Helpers'

import {
    Container, CardBox, InfoBox, Text, BoldText, IconBox, MoreInfoButton, DividerV,
    DividerH, ExpandedCardBox, ExpandedHeader, ExpandedInfoBox, ExpandedItemBox
} from './styles'

const CanceledHistoryCard = ({ data }) => {

    let date = moment(data.dataNow).format('L [às] LT[h]')
    let requestDate = moment(data.dataSolicitacao).format('L [às] LT[h]')

    const [show, setShow] = useState(false)

    let valor = numberToReal(data.valor)

    return (
        <Container>

            <CardBox>
                <InfoBox>
                    <BoldText>Tanque: <Text>{data.tanque.nome}</Text></BoldText>
                    <BoldText>Qtd. Solicitada: <Text>{data.quantidade} {data.quantidade > 1 ? 'litros' : 'litro'}</Text></BoldText>
                    <BoldText>Cancelado em: <Text>{date}</Text></BoldText>
                </InfoBox>
                <DividerV />
                <IconBox>
                    <Icon name='bucket' size={30} color='#da1e37' />
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
                            <BoldText>Data da solicitação</BoldText>
                            <Text>{requestDate}</Text>
                        </ExpandedItemBox>

                        <DividerV />

                        <ExpandedItemBox>
                            <BoldText>Responsável</BoldText>
                            <Text>{data.tanque.responsavel.nome}</Text>
                        </ExpandedItemBox>

                    </ExpandedInfoBox>

                    {data.observacao != 'Não informado!' &&
                        <Fragment>
                            <DividerH />
                            <ExpandedInfoBox>

                                <ExpandedItemBox>
                                    <BoldText>Motivo do cancelamento</BoldText>
                                    <Text>{data.observacao}</Text>
                                </ExpandedItemBox>

                            </ExpandedInfoBox>
                        </Fragment>
                    }

                </ExpandedCardBox>
            }

            <MoreInfoButton onPress={() => setShow(!show)} activeOpacity={0.8}>
                <Icon name={show ? 'chevron-thin-up' : 'chevron-thin-down'} size={18} color='#2a9d8f' />
            </MoreInfoButton>

        </Container>
    );
}

export default CanceledHistoryCard