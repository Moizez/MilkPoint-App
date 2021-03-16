import React, { useState, Fragment, useEffect } from 'react'
import { Switch, PermissionsAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../../components/DatePicker'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Formik } from 'formik'

import ApiCep from '../../../services/api'
import Api from '../../../services/technician.api'

import SimpleHeader from '../../../components/SimpleHeader'
import Loader from '../../../components/Loader'
import WarningModal from '../../../components/Modals/WarningModal'
import MarkMapModal from '../../../components/Modals/MarkMapModal'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, MapButtonBox,
    MapButton, Text, ButtonBox, CloseButton, SaveButton, TextButton, DateButton,
    CepButton, TitleBox, Modal, Divider
} from './styles'

const CreateTankForm = ({ route }) => {

    const { loadPage } = route.params

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const today = moment(selectedDate).locale('pt-br').format('L')
    const navigation = useNavigation()

    const [show, setShow] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [enabled, setEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment())
    const [lottie, setLottie] = useState(error)

    //Endereço
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [uf, setUf] = useState('')

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [markMapModal, setMarkMapModal] = useState(false)

    const [milkType, setMilkType] = useState('BOVINO')
    const [milkTypes] = useState([
        { value: 'BOVINO', label: 'Leite Bovino', color: '#003566' },
        { value: 'CAPRINO', label: 'Leite Caprino', color: '#007f5f' }
    ])

    const [capacity, setCapacity] = useState('MIL')
    const [capabilities] = useState([
        { value: 'MIL', label: '1000 litros', color: '#da1e37' },
        { value: 'DOISMIL', label: '2000 litros', color: '#003566' },
        { value: 'TRESMIL', label: '3000 litros', color: '#da1e37' },
        { value: 'QUATROMIL', label: '4000 litros', color: '#003566' },
        { value: 'QUATROMILEQUINHENTOS', label: '4500 litros', color: '#da1e37' },
    ])

    const [responsible, setResponsible] = useState('')
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

    const onChange = (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        let date = currentDate ? currentDate : moment()
        setSelectedDate(date)
    }

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)
    const openMarkMapModal = () => setMarkMapModal(true)
    const closeMarkMapModal = () => setMarkMapModal(false)

    const getCoordinates = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
    }

    const findCep = async (cep) => {
        setLoading(true)
        try {
            const response = await ApiCep.getCep(cep)
            const data = await response.json()
            if (data.error) {
                setLoading(false)
                setTypeMessage('CEP não encontrado!')
                openWarningModal()
            } else {
                setShow(true)
                setCep(data.cep)
                setLogradouro(data.logradouro)
                setBairro(data.bairro)
                setLocalidade(data.localidade)
                setUf(data.uf)
            }
        } catch (error) {
            setLoading(false)
            setTypeMessage('CEP inválido!')
            openWarningModal()
        }
        setLoading(false)
    }

    return (
        <Container>
            <SimpleHeader title={'Criação de Tanque'} />

            <Formik
                initialValues={{
                    nome: '',
                    qtdAtual: 0,
                    cep: cep,
                    complemento: '',
                }}
                onSubmit={async (values) => {
                    await Api.createTank(values.nome, milkType, capacity, values.qtdAtual, selectedDate,
                        responsible, enabled, values.cep, localidade, uf, bairro, logradouro,
                        values.complemento, latitude, longitude)
                    setLottie(success)
                    setTypeMessage('Tanque criado com sucesso!')
                    openWarningModal()
                    setTimeout(() => {
                        closeWarningModal()
                        navigation.goBack()
                        loadPage()
                    }, 2000);
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
                                    onValueChange={(itemValue, itemIndex) =>
                                        setMilkType(itemValue)
                                    }>
                                    {milkTypes.map(i => {
                                        return <Picker.Item label={i.label} value={i.value} color={i.color} />
                                    })}
                                </Picker>
                            </FormItem>

                            <FormItem style={{ marginLeft: 8 }}>
                                <Picker
                                    selectedValue={capacity}
                                    prompt='Capacidade do tanque?'
                                    onValueChange={(itemValue, itemIndex) =>
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
                                <DateButton onPress={() => setDatePicker(true)}>
                                    <TextButton style={{ color: '#000', fontSize: 15 }}>{today}</TextButton>
                                    <Icon name='calendar' size={25} color='#000' />
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
                                    onValueChange={(itemValue, itemIndex) =>
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
                                <CepButton onPress={() => findCep(props.values.cep)}>
                                    <Icon name='magnify' size={30} color='#FFF' />
                                </CepButton>
                            </FormItem>
                        </FormBox>

                        {show &&
                            <Fragment>
                                <TitleBox>
                                    <Text>Nome da cidade:</Text>
                                    <Text style={{ marginLeft: 180 }}>UF:</Text>
                                </TitleBox>
                                <FormBox>
                                    <FormItem style={{ flex: 1 }}>
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder='Nome da cidade'
                                            onChangeText={setLocalidade}
                                            value={localidade}
                                        />
                                    </FormItem>

                                    <FormItem style={{ width: '18%', marginLeft: 8 }}>
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder='UF'
                                            onChangeText={setUf}
                                            value={uf}
                                        />
                                    </FormItem>
                                </FormBox>

                                <Text>Bairro ou comunidade:</Text>
                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder='Nome do bairro ou comunidade'
                                        onChangeText={setBairro}
                                        value={bairro}
                                    />
                                </FormItem>

                                <Text>Rua:</Text>
                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder='Nome da rua'
                                        onChangeText={setLogradouro}
                                        value={logradouro}
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

                            </Fragment>}

                        <MapButtonBox>
                            <MapButton onPress={openMarkMapModal}>
                                <TextButton>Marcar Tanque no Mapa</TextButton>
                                <Icon name='map-search' size={30} color='#FFF' style={{ marginLeft: 10 }} />
                            </MapButton>
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
            {datePicker &&
                <DatePicker
                    chosenDate={selectedDate}
                    onSet={onChange}
                />
            }
            {loading && <Loader />}

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

export default CreateTankForm