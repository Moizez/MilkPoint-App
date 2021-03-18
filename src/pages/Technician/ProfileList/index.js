import React, { useState, useEffect } from 'react'
import { Switch } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import Api from '../../../services/technician.api'
import WarnningModal from '../../../components/Modals/WarningModal'

import {
    Container, CardBox, InfoBox, Text, BoldText, ImageBox, MoreInfoButton, DividerV,
    ImageButton, Image, ExpandedCardBox, ExpandedHeader, ExpandedInfoBox, ExpandedItemBox,
    CardInfoBox, StatusBox, DividerH
} from './styles'

const ProfileList = ({ data }) => {

    const [show, setShow] = useState(false)
    const [enabled, setEnabled] = useState(data.status)
    const [role, setRole] = useState('')
    const [warningModal, setWarningModal] = useState(false)

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    const requestStatus = async () => {
        await Api.setStateRoles(role, enabled, data.id)
    }

    useEffect(() => {
        const setRoles = () => {
            if (data.perfil === 1) {
                setRole('produtor')
            } else if (data.perfil === 3) {
                setRole('laticinio')
            } else {
                setRole('responsavel')
            }
        }
        setRoles()
    }, [])

    const setColor = () => {
        if (data.perfil === 1) {
            return '#2a9d8f'
        } else if (data.perfil === 3) {
            return '#cc444b'
        } else {
            return '#e7b705'
        }
    }



    return (
        <Container>

            <CardBox style={{ elevation: 5 }}>

                <CardInfoBox>
                    <InfoBox>
                        <BoldText>Nome: <Text>{data.nome}</Text></BoldText>
                        <BoldText>{data.perfil === 3 ? 'Empresa: ' : 'Apelido: '}<Text>{data.apelido}</Text></BoldText>
                        <BoldText>E-mail: <Text>{data.email}</Text></BoldText>
                        <DividerH />
                        <StatusBox>
                            <BoldText>Status do usuário: </BoldText>
                            <Text style={{
                                color: enabled ? '#2a9d8f' : '#767577',
                                fontSize: 16, marginLeft: 10
                            }}>{enabled ? 'Ativo' : 'Inativo'}</Text>
                            <Switch
                                value={enabled}
                                trackColor={{ false: "#767577", true: "#b7e4c7" }}
                                thumbColor={enabled ? "#2a9d8f" : "#f4f3f4"}
                                onValueChange={() => setEnabled(!enabled)}
                            />
                        </StatusBox>
                    </InfoBox>
                    <DividerV />
                    <ImageBox>
                        <ImageButton style={{ backgroundColor: 'green' }}>
                            <Image
                                source={require('../../../assets/images/avatar.jpg')}
                                resizeMode='cover'
                            />
                        </ImageButton>
                    </ImageBox>
                </CardInfoBox>

                {show &&
                    <ExpandedCardBox onPress={() => setShow(false)} activeOpacity={1}>

                        <ExpandedHeader>
                            <BoldText>Mais informações</BoldText>
                        </ExpandedHeader>

                        <ExpandedInfoBox>
                            <ExpandedItemBox>
                                <BoldText>Cidade</BoldText>
                                <Text>{data.localidade}</Text>
                            </ExpandedItemBox>

                            <DividerV />

                            <ExpandedItemBox>
                                <BoldText>Estado</BoldText>
                                <Text>{data.uf}</Text>
                            </ExpandedItemBox>

                        </ExpandedInfoBox>

                        <DividerH />

                        <ExpandedInfoBox>
                            <ExpandedItemBox>
                                <BoldText>Bairro</BoldText>
                                <Text>{data.bairro}</Text>
                            </ExpandedItemBox>

                            <DividerV />

                            <ExpandedItemBox>
                                <BoldText>Rua</BoldText>
                                <Text>{data.logradouro}</Text>
                            </ExpandedItemBox>
                        </ExpandedInfoBox>

                        <DividerH />

                        <ExpandedInfoBox>
                            <ExpandedItemBox>
                                <BoldText>Complemento</BoldText>
                                <Text>{data.complemento}</Text>
                            </ExpandedItemBox>
                        </ExpandedInfoBox>

                    </ExpandedCardBox>
                }

                <MoreInfoButton onPress={() => setShow(!show)} activeOpacity={0.8}>
                    <Icon
                        name={show ? 'chevron-thin-up' : 'chevron-thin-down'}
                        size={18}
                        color={setColor()}
                    />
                </MoreInfoButton>

            </CardBox>

        </Container>
    );
}

export default ProfileList