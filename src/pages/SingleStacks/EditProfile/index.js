import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Formik } from 'formik'

import Api from '../../../services/technician.api'
import { RequestContext } from '../../../contexts/request'

import SimpleHeader from '../../../components/SimpleHeader'
import WarningModal from '../../../components/Modals/WarningModal'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, MapButtonBox,
    MapButton, Text, ButtonBox, CloseButton, SaveButton, TextButton, DateButton,
    TitleBox, Modal, Divider
} from './styles'

const EditProfile = ({ route }) => {

    const { user, loadUser } = route.params

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const today = moment(user.dataNacimento).locale('pt-br').format('L')

    const { loadActiveTanks, loadInactiveTanks } = useContext(RequestContext)
    const navigation = useNavigation()

    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)

    useEffect(() => {

    }, [])

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <SimpleHeader title={'Criação de Tanque'} />

            <Formik
                initialValues={{
                    nome: user.nome,
                    cep: user.cep,
                    localidade: user.localidade,
                    uf: user.uf,
                    bairro: user.bairro,
                    logradouro: user.logradouro,
                    complemento: user.complemento,
                }}
                onSubmit={async (values) => {
                    await Api.updateTank(user.id, values.nome, values.cep, values.localidade,
                        values.uf, values.bairro, values.logradouro, values.complemento)
                    setLottie(success)
                    setTypeMessage('Tanque atualizado com sucesso!')
                    loadActiveTanks()
                    loadInactiveTanks()
                    openWarningModal()
                    navigation.goBack()
                }}
            >
                {(props) => (
                    <InputContainer>

                        <FormTitle>Características</FormTitle>
                        <Divider />

                        <Text>Nome do tanque:</Text>
                        <FormItem style={{ width: '100%', marginBottom: 8 }}>
                            <Input
                                style={{ width: '100%' }}
                                placeholder='Ex: T-100'
                                onChangeText={props.handleChange('nome')}
                                value={props.values.nome}
                            />
                        </FormItem>
                        <TitleBox>
                            <Text>Tipo do leite:</Text>
                            <Text style={{ marginLeft: 102 }}>Capacidade:</Text>
                        </TitleBox>
                        <FormBox>
                            <FormItem>

                            </FormItem>

                            <FormItem style={{ marginLeft: 8 }}>

                            </FormItem>
                        </FormBox>

                        <TitleBox>
                            <Text>Quantidade atual:</Text>
                            <Text style={{ marginLeft: 77 }}>Data de criação:</Text>
                        </TitleBox>
                        <FormBox>
                            <FormItem>
                                <DateButton>
                                    <Text style={{ color: '#767577', fontSize: 15 }}>{today}</Text>
                                    <Icon name='calendar' size={25} color='#767577' />
                                </DateButton>
                            </FormItem>
                        </FormBox>

                        <TitleBox>
                            <Text>Responsável do tanque:</Text>
                            <Text style={{ marginLeft: 44 }}>Status do tanque:</Text>
                        </TitleBox>
                        <FormBox>
                            <FormItem>

                            </FormItem>

                        </FormBox>

                        <FormTitle style={{ marginTop: 6 }}>Localização</FormTitle>
                        <Divider />

                        <Text>CEP:</Text>
                        <FormBox>
                            <FormItem style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Input
                                    style={{ flex: 1 }}
                                    placeholder='Somente números'
                                    onChangeText={props.handleChange('cep')}
                                    value={props.values.cep}
                                    keyboardType='phone-pad'
                                />
                            </FormItem>
                        </FormBox>

                        <TitleBox>
                            <Text>Nome da cidade:</Text>
                            <Text style={{ marginLeft: 180 }}>UF:</Text>
                        </TitleBox>
                        <FormBox>
                            <FormItem style={{ flex: 1 }}>
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder='Nome da cidade'
                                    onChangeText={props.handleChange('localidade')}
                                    value={props.values.localidade}
                                />
                            </FormItem>

                            <FormItem style={{ width: '18%', marginLeft: 8 }}>
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder='UF'
                                    onChangeText={props.handleChange('uf')}
                                    value={props.values.uf}
                                />
                            </FormItem>
                        </FormBox>

                        <Text>Bairro ou comunidade:</Text>
                        <FormItem style={{ width: '100%', marginBottom: 8 }}>
                            <Input
                                style={{ width: '100%' }}
                                placeholder='Nome do bairro ou comunidade'
                                onChangeText={props.handleChange('bairro')}
                                value={props.values.bairro}
                            />
                        </FormItem>

                        <Text>Rua:</Text>
                        <FormItem style={{ width: '100%', marginBottom: 8 }}>
                            <Input
                                style={{ width: '100%' }}
                                placeholder='Nome da rua'
                                onChangeText={props.handleChange('logradouro')}
                                value={props.values.logradouro}
                            />
                        </FormItem>

                        <Text>Referência:</Text>
                        <FormItem style={{ width: '100%', marginBottom: 8 }}>
                            <Input
                                style={{ width: '100%' }}
                                multiline
                                placeholder='Ex: Próximo ao mercadinho do José'
                                onChangeText={props.handleChange('complemento')}
                                value={props.values.complemento}
                            />
                        </FormItem>

                        <ButtonBox>
                            <CloseButton onPress={() => navigation.goBack()}>
                                <TextButton>Fechar</TextButton>
                            </CloseButton>

                            <SaveButton onPress={props.handleSubmit}>
                                <TextButton>Salvar</TextButton>
                            </SaveButton>
                        </ButtonBox>

                    </InputContainer>
                )}
            </Formik>

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >

                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={lottie}
                    bgColor={true}
                />
            </Modal>

        </Container>
    );
}

export default EditProfile