import React, { useState, Fragment, useEffect, useContext } from 'react'
import { Switch, PermissionsAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../../components/DatePicker'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Formik } from 'formik'
import * as yup from 'yup'

import ApiCep from '../../../services/api'
import Api from '../../../services/technician.api'
import { RequestContext } from '../../../contexts/request'

import SimpleHeader from '../../../components/SimpleHeader'
import Loader from '../../../components/Loader'
import WarningModal from '../../../components/Modals/WarningModal'
import MarkMapModal from '../../../components/Modals/MarkMapModal'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, MapButtonBox,
    MapButton, Text, ButtonBox, CloseButton, SaveButton, TextButton, FormButton,
    CepButton, Modal, ErrorText, Divider
} from './styles'

const formSchema = yup.object({
    nome: yup.string().required('O nome do tanque é obrigatório!'),
    cep: yup.string().required('O CEP é obrigatório!'),
})

const CreateTankForm = () => {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const today = moment(selectedDate).locale('pt-br').format('L')
    const { loadActiveTanks, loadInactiveTanks } = useContext(RequestContext)
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
                validationSchema={formSchema}
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
                        loadActiveTanks()
                        loadInactiveTanks()
                    }, 2000);
                }}
            >
                {(props) => (
                    <InputContainer>

                        <FormTitle>Características</FormTitle>
                        <Divider />

                        <FormItem style={{ width: '100%' }}>
                            <Text>Nome do tanque:</Text>
                            <Input
                                placeholder='Ex: T-100'
                                onChangeText={props.handleChange('nome')}
                                value={props.values.nome}
                                onBlur={props.handleBlur('nome')}
                            />
                        </FormItem>
                        <ErrorText>{props.touched.nome && props.errors.nome}</ErrorText>

                        <FormBox>
                            <FormItem>
                                <Text>Tipo do leite:</Text>
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
                                <Text>Capacidade:</Text>
                                <Picker
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

                        <FormBox>
                            <FormItem>
                                <Text>Quantidade atual:</Text>
                                <Input
                                    keyboardType='phone-pad'
                                    placeholder='Em litros'
                                    onChangeText={props.handleChange('qtdAtual')}
                                    value={props.values.qtdAtual}
                                />
                            </FormItem>

                            <FormItem>
                                <Text>Data de criação:</Text>
                                <FormButton onPress={() => setDatePicker(true)}>
                                    <TextButton style={{ color: '#000', fontSize: 15 }}>{today}</TextButton>
                                    <Icon name='calendar' size={25} color='#000' />
                                </FormButton>
                            </FormItem>
                        </FormBox>

                        <FormBox>
                            <FormItem>
                                <Text>Responsável do tanque:</Text>
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
                            <FormItem>
                                <Text>Status do tanque:</Text>
                                <FormButton>
                                    <TextButton style={{
                                        color: enabled ? '#2a9d8f' : '#767577',
                                        fontSize: 18
                                    }}>{enabled ? 'Ativo' : 'Inativo'}</TextButton>
                                    <Switch
                                        value={enabled}
                                        trackColor={{ false: "#767577", true: "#b7e4c7" }}
                                        thumbColor={enabled ? "#2a9d8f" : "#f4f3f4"}
                                        onValueChange={() => setEnabled(!enabled)}
                                    />
                                </FormButton>
                            </FormItem>
                        </FormBox>

                        <FormTitle style={{ marginTop: 6 }}>Localização</FormTitle>
                        <Divider />

                        <FormBox style={{ marginBottom: 0 }}>
                            <FormItem style={{ width: '85%', borderBottomRightRadius: 0, borderTopRightRadius: 0 }}>
                                <Text>CEP:</Text>
                                <Input
                                    placeholder='Somente números'
                                    keyboardType='phone-pad'
                                    onChangeText={props.handleChange('cep')}
                                    value={props.values.cep}
                                    onBlur={props.handleBlur('cep')}
                                />
                            </FormItem>

                            <CepButton onPress={() => findCep(props.values.cep)}>
                                <Icon name='magnify' size={30} color='#FFF' />
                            </CepButton>
                        </FormBox>
                        <ErrorText>{props.touched.cep && props.errors.cep}</ErrorText>

                        {show &&
                            <Fragment>
                                <FormBox>
                                    <FormItem style={{ flex: 1 }}>
                                        <Text>Nome da cidade:</Text>
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder='Nome da cidade'
                                            onChangeText={setLocalidade}
                                            value={localidade}
                                        />
                                    </FormItem>

                                    <FormItem style={{ width: '18%', marginLeft: 8 }}>
                                        <Text>UF:</Text>
                                        <Input
                                            placeholder='UF'
                                            onChangeText={setUf}
                                            value={uf}
                                        />
                                    </FormItem>
                                </FormBox>

                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Text>Bairro ou comunidade:</Text>
                                    <Input
                                        placeholder='Nome do bairro ou comunidade'
                                        onChangeText={setBairro}
                                        value={bairro}
                                    />
                                </FormItem>

                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Text>Rua:</Text>
                                    <Input
                                        placeholder='Nome da rua'
                                        onChangeText={setLogradouro}
                                        value={logradouro}
                                    />
                                </FormItem>

                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Text>Referência:</Text>
                                    <Input
                                        multiline
                                        placeholder='Ex: Próximo ao mercadinho do José'
                                        onChangeText={props.handleChange('complemento')}
                                        value={props.values.complemento}
                                    />
                                </FormItem>

                            </Fragment>}

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
            {datePicker &&
                <DatePicker
                    chosenDate={selectedDate}
                    onSet={onChange}
                    display='spinner'
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