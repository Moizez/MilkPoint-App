import React, { useState } from 'react'
import moment from 'moment'
import { Formik } from 'formik'
import * as yup from 'yup'

import Api from '../../../services/api'

import SimpleHeader from '../../SimpleHeader'
import WarningModal from '../WarningModal'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, Text,
    ButtonBox, CloseButton, SaveButton, TextButton, ErrorText, Modal, Divider
} from './styles'

const formSchema = yup.object({
    nome: yup.string().required('O nome do tanque é obrigatório!'),
    apelido: yup.string().required('O apelido é obrigatório!'),
    email: yup.string().required('O e-mail é obrigatório!'),
    cep: yup.string().required('O CEP é obrigatório!'),
    localidade: yup.string().required('A cidade é obrigatória!'),
    uf: yup.string().required('O estado é obrigatório!'),
    bairro: yup.string().required('O bairro é obrigatório!'),
    logradouro: yup.string().required('A rua é obrigatória!')
})

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
                validationSchema={formSchema}
                onSubmit={async (values) => {
                    await Api.editUser(values.nome, values.apelido, values.cep,
                        values.localidade, values.uf, values.bairro, values.logradouro,
                        values.complemento)
                    setLottie(success)
                    setTypeMessage('Perfil editado com sucesso!')
                    openWarningModal()
                    setTimeout(() => {
                        closeWarningModal()
                        closeModal()
                        loadUser()
                    }, 2000);
                }}
            >
                {(props) => (
                    <InputContainer>

                        <FormTitle>Dados cadastrais</FormTitle>
                        <Divider />

                        <FormItem>
                            <Text>Nome:</Text>
                            <Input
                                placeholder='Ex: T-100'
                                onChangeText={props.handleChange('nome')}
                                value={props.values.nome}
                                onBlur={props.handleBlur('nome')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.nome && props.errors.nome}</ErrorText>
                        <FormItem>
                            <Text>{user.perfil === 3 ? 'Empresa:' : 'Apelido:'}</Text>
                            <Input
                                placeholder='Ex: Joãozinho'
                                onChangeText={props.handleChange('apelido')}
                                value={props.values.apelido}
                                onBlur={props.handleBlur('apelido')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.apelido && props.errors.apelido}</ErrorText>

                        <FormItem>
                            <Text>E-mail:</Text>
                            <Input
                                editable={false}
                                style={{ color: '#767577' }}
                                placeholder='Ex: joao@gmail.com'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.email && props.errors.email}</ErrorText>

                        <FormItem>
                            <Text>Senha:</Text>
                            <Input
                                editable={false}
                                style={{ color: '#767577' }}
                                placeholder='Ex: Joao@2021'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </FormItem>

                        <FormTitle style={{ marginTop: 6 }}>Endereço</FormTitle>
                        <Divider />

                        <FormItem>
                            <Text>CEP:</Text>
                            <Input
                                placeholder='Somente números'
                                keyboardType='phone-pad'
                                onChangeText={props.handleChange('cep')}
                                value={props.values.cep}
                                onBlur={props.handleBlur('cep')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.cep && props.errors.cep}</ErrorText>

                        <FormBox style={{ marginBottom: 0 }}>
                            <FormItem style={{ flex: 1 }}>
                                <Text>Nome da cidade:</Text>
                                <Input
                                    placeholder='Nome da cidade'
                                    onChangeText={props.handleChange('localidade')}
                                    value={props.values.localidade}
                                    onBlur={props.handleBlur('localidade')}
                                />
                            </FormItem>

                            <FormItem style={{ width: '18%', marginLeft: 8 }}>
                                <Text>UF:</Text>
                                <Input
                                    placeholder='UF'
                                    onChangeText={props.handleChange('uf')}
                                    value={props.values.uf}
                                    onBlur={props.handleBlur('uf')}
                                />
                            </FormItem>
                        </FormBox>
                        <ErrorText>{props.touched.localidade && props.errors.localidade}</ErrorText>

                        <FormItem>
                            <Text>Bairro ou comunidade:</Text>
                            <Input
                                placeholder='Nome do bairro ou comunidade'
                                onChangeText={props.handleChange('bairro')}
                                value={props.values.bairro}
                                onBlur={props.handleBlur('bairro')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.bairro && props.errors.bairro}</ErrorText>

                        <FormItem>
                            <Text>Rua:</Text>
                            <Input
                                placeholder='Nome da rua'
                                onChangeText={props.handleChange('logradouro')}
                                value={props.values.logradouro}
                                onBlur={props.handleBlur('logradouro')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.logradouro && props.errors.logradouro}</ErrorText>

                        <FormItem>
                            <Text>Referência:</Text>
                            <Input
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