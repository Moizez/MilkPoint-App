import React, { useState } from 'react'
import moment from 'moment'
import { Formik } from 'formik'

import Api from '../../../services/api'

import SimpleHeader from '../../SimpleHeader'
import WarningModal from '../WarningModal'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, Text,
    ButtonBox, CloseButton, SaveButton, TextButton, TitleBox, Modal, Divider
} from './styles'

const EditProfileModal = ({ user, loadUser, closeModal }) => {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    //const birth = moment(user.dataNacimento).locale('pt-br').format('L')

    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <SimpleHeader title={'Edição de Dados'} />

            <Formik
                initialValues={{
                    nome: user.nome,
                    apelido: user.apelido,
                    email: user.email,
                    password: user.password,
                    cep: user.cep,
                    localidade: user.localidade,
                    uf: user.uf,
                    bairro: user.bairro,
                    logradouro: user.logradouro,
                    complemento: user.complemento,
                }}
                onSubmit={async (values) => {
                    await Api.editUser(values.nome, values.apelido, values.cep,
                        values.localidade, values.uf, values.bairro, values.logradouro,
                        values.complemento)
                    setLottie(success)
                    setTypeMessage('Perfil editado com sucesso!')
                    openWarningModal()
                    setTimeout(() => {
                        closeModal()
                    }, 2000);
                    loadUser()
                }}
            >
                {(props) => (
                    <InputContainer>

                        <FormTitle>Dados cadastrais</FormTitle>
                        <Divider />

                        <Text>Nome:</Text>
                        <FormItem style={{ width: '100%', marginBottom: 8 }}>
                            <Input
                                style={{ width: '100%' }}
                                placeholder='Ex: T-100'
                                onChangeText={props.handleChange('nome')}
                                value={props.values.nome}
                            />
                        </FormItem>
                        <Text>{user.perfil === 3 ? 'Empresa:' : 'Apelido:'}</Text>
                        <FormBox>
                            <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder='Ex: Joãozinho'
                                    onChangeText={props.handleChange('apelido')}
                                    value={props.values.apelido}
                                />
                            </FormItem>
                        </FormBox>

                        <Text>E-mail:</Text>
                        <FormBox>
                            <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                <Input
                                    editable={false}
                                    style={{ width: '100%', color: '#767577' }}
                                    placeholder='Ex: joao@gmail.com'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                />
                            </FormItem>

                        </FormBox>

                        <Text>Senha:</Text>
                        <FormBox>
                            <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                <Input
                                    editable={false}
                                    style={{ width: '100%', color: '#767577' }}
                                    placeholder='Ex: Joao@2021'
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                />
                            </FormItem>
                        </FormBox>

                        <FormTitle style={{ marginTop: 6 }}>Endereço</FormTitle>
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
                            <CloseButton onPress={closeModal}>
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

export default EditProfileModal