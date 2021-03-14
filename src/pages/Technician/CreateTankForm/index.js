import React, { useState, Fragment, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../../components/DatePicker'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Formik } from 'formik'

import ApiCep from '../../../services/api'
import ApiResponsibles from '../../../services/technician.api'

import SimpleHeader from '../../../components/SimpleHeader'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, MapButtonBox,
    MapButton, Text, ButtonBox, CloseButton, SaveButton, TextButton, DateButton,
    CepButton, TitleBox, Divider
} from './styles'

const CreateTankForm = () => {

    const today = moment(selectedDate).locale('pt-br').format('L')
    const navigation = useNavigation()

    const [show, setShow] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment())

    const [responsible, setResponsible] = useState('')
    const [responsibles, setResponsibles] = useState('')

    const [milkType, setMilkType] = useState('BOVINO')
    const [milkTypes] = useState([
        { value: 'BOVINO', label: 'Leite Bovino', color: '#003566' },
        { value: 'CAPRINO', label: 'Leite Caprino', color: '#007f5f' }
    ])

    const [capacity, setCapacity] = useState('MIL')
    const [capabilities] = useState([
        { value: 'MIL', label: '1000 litros', color: '#da1e37' },
        { value: 'DOISMIL', label: '2000 litros', color: '#0077b6' },
        { value: 'TRESMIL', label: '3000 litros', color: '#da1e37' },
        { value: 'QUATROMIL', label: '4000 litros', color: '#0077b6' },
        { value: 'QUATROMILEQUINHENTOS', label: '4500 litros', color: '#da1e37' },
    ])

    useEffect(() => {
        const loadResponsibles = async () => {
            const response = await ApiResponsibles.getResponsibles()
            setResponsibles(response)
        }

        loadResponsibles()
    }, [])

    const onChange = (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        let date = currentDate ? currentDate : moment()
        setSelectedDate(date)
    }

    return (
        <Container>
            <SimpleHeader title={'Criação de Tanque'} />

            <Formik
                initialValues={{
                    nome: '',
                    qtdAtual: '',
                    cep: '',
                    localidade: '',
                    uf: '',
                    bairro: '',
                    rua: '',
                    complemento: '',
                }}
                onSubmit={(values, actions) => {
                    console.log(values)
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
                                    prompt='Tipo do leite?'
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
                            <Text style={{ marginLeft: 78 }}>Data de criação:</Text>
                        </TitleBox>
                        <FormBox>
                            <Input
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

                        <FormBox>
                            <FormItem>
                                <Picker
                                    selectedValue={responsible}
                                    prompt='Tipo do leite?'
                                    onValueChange={(itemValue, itemIndex) =>
                                        setResponsible(itemValue)
                                    }>
                                    {responsibles.map(i => {
                                        return <Picker.Item label={i.label} value={i.value} color={i.color} />
                                    })}
                                </Picker>
                            </FormItem>
                            <FormItem>
                                <DateButton onPress={() => setDatePicker(true)}>
                                    <TextButton style={{ color: '#000', fontSize: 15 }}>{today}</TextButton>
                                    <Icon name='calendar' size={30} color='#000' />
                                </DateButton>
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
                                    placeholder='Somente números'
                                    onChangeText={props.handleChange('cep')}
                                    value={props.values.cep}
                                    keyboardType='phone-pad'
                                />
                                <CepButton>
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
                                        onChangeText={props.handleChange('nome')}
                                        value={props.values.nome}
                                    />
                                </FormItem>

                                <Text>Rua:</Text>
                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder='Nome da rua'
                                        onChangeText={props.handleChange('nome')}
                                        value={props.values.nome}
                                    />
                                </FormItem>

                                <Text>Referência:</Text>
                                <FormItem style={{ width: '100%', marginBottom: 8 }}>
                                    <Input
                                        style={{ width: '100%' }}
                                        multiline
                                        placeholder='Ex: Próximo ao mercadinho do José'
                                        onChangeText={props.handleChange('nome')}
                                        value={props.values.nome}
                                    />
                                </FormItem>

                            </Fragment>}

                        <MapButtonBox>
                            <MapButton onPress={() => navigation.navigate('MarkMap')}>
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
        </Container>
    );
}

export default CreateTankForm