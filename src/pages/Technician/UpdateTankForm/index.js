import React, { useState, useEffect, useContext } from 'react'
import { Switch, PermissionsAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Formik } from 'formik'

import Api from '../../../services/technician.api'
import { RequestContext } from '../../../contexts/request'

import SimpleHeader from '../../../components/SimpleHeader'
import WarningModal from '../../../components/Modals/WarningModal'
import MarkMapModal from '../../../components/Modals/MarkMapModal'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, MapButtonBox,
    MapButton, Text, ButtonBox, CloseButton, SaveButton, TextButton, DateButton,
    TitleBox, Modal, Divider
} from './styles'

const UpdateTankForm = ({ route }) => {

    const { data } = route.params

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const today = moment(data.dataCriacao).locale('pt-br').format('L')

    const { loadActiveTanks, loadInactiveTanks } = useContext(RequestContext)
    const navigation = useNavigation()

    const [enabled, setEnabled] = useState(data.status)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)

    const [latitude, setLatitude] = useState(data.latitude)
    const [longitude, setLongitude] = useState(data.longitude)
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [markMapModal, setMarkMapModal] = useState(false)

    const [milkType, setMilkType] = useState(data.tipo)
    const [milkTypes] = useState([
        { value: 'BOVINO', label: 'Leite Bovino', color: '#003566' },
        { value: 'CAPRINO', label: 'Leite Caprino', color: '#007f5f' }
    ])

    const [capacity, setCapacity] = useState(data.capacidade)
    const [capabilities] = useState([
        { value: 'MIL', label: '1000 litros', color: '#767577' },
        { value: 'DOISMIL', label: '2000 litros', color: '#767577' },
        { value: 'TRESMIL', label: '3000 litros', color: '#767577' },
        { value: 'QUATROMIL', label: '4000 litros', color: '#767577' },
        { value: 'QUATROMILEQUINHENTOS', label: '4500 litros', color: '#767577' },
    ])

    const [responsible, setResponsible] = useState(data.responsavel.id)
    const [responsibles, setResponsibles] = useState([])

    useEffect(() => {
        const loadResponsibles = async () => {
            const response = await Api.getResponsibles()
            const result = response.map(i => ({
                label: i.nome,
                value: i.id,
                color: '#000'

            }))
            setResponsibles(result)
        }
        loadResponsibles()
    }, [])

    const verifyLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasLocationPermission(true)
            } else {
                setHasLocationPermission(false)
            }
        } catch (err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        verifyLocationPermission()
    }, [hasLocationPermission])

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)
    const openMarkMapModal = () => setMarkMapModal(true)
    const closeMarkMapModal = () => setMarkMapModal(false)

    const getCoordinates = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
    }

    return (
        <Container>
            <SimpleHeader title={'Criação de Tanque'} />

            <Formik
                initialValues={{
                    nome: data.nome,
                    qtdAtual: data.qtdAtual.toString(),
                    cep: data.cep,
                    localidade: data.localidade,
                    uf: data.uf,
                    bairro: data.bairro,
                    logradouro: data.logradouro,
                    complemento: data.complemento,
                }}
                onSubmit={async (values) => {
                    await Api.updateTank(data.id, values.nome, milkType, values.qtdAtual, responsible,
                        enabled, values.cep, values.localidade, values.uf, values.bairro,
                        values.logradouro, values.complemento, latitude, longitude)
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
                                <Picker
                                    selectedValue={milkType}
                                    prompt='Tipo do leite?'
                                    onValueChange={(itemValue) =>
                                        setMilkType(itemValue)
                                    }>
                                    {milkTypes.map(i => {
                                        return <Picker.Item label={i.label} value={i.value} color={i.color} />
                                    })}
                                </Picker>
                            </FormItem>

                            <FormItem style={{ marginLeft: 8 }}>
                                <Picker
                                    enabled={false}
                                    selectedValue={capacity}
                                    prompt='Capacidade do tanque?'
                                    onValueChange={(itemValue) =>
                                        setCapacity(itemValue)
                                    }>
                                    {capabilities.map(i => {
                                        return <Picker.Item label={i.label} value={i.value} color={i.color} />
                                    })}
                                </Picker>
                            </FormItem>
                        </FormBox>

                        <TitleBox>
                            <Text>Quantidade atual:</Text>
                            <Text style={{ marginLeft: 77 }}>Data de criação:</Text>
                        </TitleBox>
                        <FormBox>
                            <Input
                                keyboardType='phone-pad'
                                placeholder='Em litros'
                                onChangeText={props.handleChange('qtdAtual')}
                                value={props.values.qtdAtual}
                            />
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
                                <Picker
                                    selectedValue={responsible}
                                    prompt='Responsável do tanque?'
                                    onValueChange={(itemValue) =>
                                        setResponsible(itemValue)
                                    }>
                                    {responsibles.map(i => {
                                        return <Picker.Item label={i.label} value={i.value} color={i.color} />
                                    })}
                                </Picker>
                            </FormItem>
                            <FormItem style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                                <TextButton style={{
                                    color: enabled ? '#2a9d8f' : '#767577',
                                    fontSize: 20
                                }}>{enabled ? 'Ativo' : 'Inativo'}</TextButton>
                                <Switch
                                    value={enabled}
                                    trackColor={{ false: "#767577", true: "#b7e4c7" }}
                                    thumbColor={enabled ? "#2a9d8f" : "#f4f3f4"}
                                    onValueChange={() => setEnabled(!enabled)}
                                />
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

                        <MapButtonBox>
                            {(latitude === 0 || longitude === 0) ?
                                <MapButton onPress={openMarkMapModal}>
                                    <TextButton>Marcar Tanque no Mapa</TextButton>
                                    <Icon name='map-search' size={30} color='#FFF' style={{ marginLeft: 10 }} />
                                </MapButton> :
                                <MapButton style={{ backgroundColor: '#2a9d8f' }} onPress={openMarkMapModal}>
                                    <TextButton>Tanque Marcado!</TextButton>
                                    <Icon name='check-circle' size={30} color='#FFF' style={{ marginLeft: 10 }} />
                                </MapButton>
                            }
                        </MapButtonBox>

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
                animationType='slide'
                transparent={true}
                visible={markMapModal}
            >

                <MarkMapModal
                    closeModal={closeMarkMapModal}
                    permission={hasLocationPermission}
                    milkType={milkType}
                    getCoordinates={getCoordinates}
                />
            </Modal>

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

export default UpdateTankForm