import React, { useState, Fragment, useContext } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../../contexts/auth'
import { numberToReal } from '../../Helpers'

import {
    Container, CardBox, InfoBox, Text, BoldText, IconBox, MoreInfoButton, DividerV,
    DividerH, ExpandedCardBox, ExpandedHeader, ExpandedInfoBox, ExpandedItemBox, CardInfoBox
} from './styles'

const HistoricCard = ({ data }) => {

    let date = moment(data.dataNow).format('L [às] LT[h]')
    let requestDate = moment(data.dataSolicitacao).format('L [às] LT[h]')

    const { user } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    let valor = numberToReal(data.valor)

    return (
        <Container>
            <CardBox style={{ elevation: 5 }}>
                <CardInfoBox>
                    <InfoBox>
                        {user.perfil === 2 ?
                            <BoldText>{data.type ? 'Produtor: ' : 'Laticínio: '}
                                <Text>{data.type ? data.produtor.nome : data.laticinio.apelido}</Text>
                            </BoldText> :
                            <BoldText>Tanque: <Text>{data.tanque.nome}</Text></BoldText>
                        }
                        <BoldText>Qtd. Solicitada: <Text>{data.quantidade} {data.quantidade > 1 ? 'litros' : 'litro'}</Text></BoldText>
                        <BoldText>{data.confirmacao ? 'Confirmado' : 'Recusado'} em: <Text>{date}</Text></BoldText>
                    </InfoBox>
                    <DividerV />
                    <IconBox>
                        <MaterialCommunityIcons
                            name={data.confirmacao ? 'check-circle' : 'delete-circle'}
                            size={30}
                            color={data.confirmacao ? '#2a9d8f' : '#cc444b'}
                        />
                    </IconBox>
                </CardInfoBox>


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

                        {data.observacao &&
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
                    <Entypo
                        name={show ? 'chevron-thin-up' : 'chevron-thin-down'}
                        size={18}
                        color={data.confirmacao ? '#2a9d8f' : '#cc444b'}
                    />
                </MoreInfoButton>

            </CardBox>

        </Container>
    );
}

export default HistoricCard