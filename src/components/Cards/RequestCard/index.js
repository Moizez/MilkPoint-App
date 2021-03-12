import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../../contexts/auth'
import { numberToReal } from '../../Helpers'

import {
    Container, CardBox, InfoBox, Text, BoldText, IconBox, MoreInfoButton, DividerV,
    IconButton, ExpandedCardBox, ExpandedHeader, ExpandedInfoBox, ExpandedItemBox,
    IconText, CardInfoBox
} from './styles'

const RequestCard = ({ data, showModal, role, roleName }) => {

    let date = moment(data.dataNow).format('L [às] LT[h]')
    let valor = numberToReal(data.valor)

    const { user } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    return (
        <Container>

            <CardBox style={{ elevation: 5 }}>

                <CardInfoBox>
                    <InfoBox>
                        {user.perfil === 2 ?
                            <BoldText>{role}<Text>{roleName}</Text></BoldText> :
                            <BoldText>Tanque: <Text>{data.tanque.nome}</Text></BoldText>
                        }
                        <BoldText>Qtd. Solicitada: <Text>{data.quantidade} {data.quantidade == 1 ? 'litro' : 'litros'}</Text></BoldText>
                        <BoldText>Pedido em: <Text>{date}</Text></BoldText>
                    </InfoBox>
                    <DividerV />
                    <IconBox>
                        <IconButton onPress={showModal}>
                            <Icon name='bucket' size={30} color='#e9ecef' />
                            <IconText>Cancelar</IconText>
                        </IconButton>
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
                                <BoldText>Valor do pedido</BoldText>
                                <Text>{valor}</Text>
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
                    <Icon
                        name={show ? 'chevron-thin-up' : 'chevron-thin-down'}
                        size={18}
                        color={data.type ? '#2a9d8f' : '#cc444b'}
                    />
                </MoreInfoButton>

            </CardBox>

        </Container>
    );
}

export default RequestCard