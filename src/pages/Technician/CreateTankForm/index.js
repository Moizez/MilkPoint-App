import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik } from 'formik'

import SimpleHeader from '../../../components/SimpleHeader'

import {
    Container, InputContainer, FormTitle, Input, FormBox, FormItem, MapButtonBox,
    MapButton, Text, ButtonBox, CloseButton, SaveButton, TextButton, DateButton,
    CepButton, Divider
} from './styles'

const CreateTankForm = () => {

    const navigation = useNavigation()

    const [show, setShow] = useState(false)

    const [milkType, setMilkType] = useState('BOVINO')
    const [milkTypes] = useState([
        { value: 'BOVINO', label: 'Leite Bovino', color: '#00b4d8' },
        { value: 'CAPRINO', label: 'Leite Caprino', color: '#2a9d8f' }
    ])

    const [capacity, setCapacity] = useState('MIL')
    const [capabilities] = useState([
        { value: 'MIL', label: '1000 litros', color: '#da1e37' },
        { value: 'DOISMIL', label: '2000 litros', color: '#0077b6' },
        { value: 'TRESMIL', label: '3000 litros', color: '#da1e37' },
        { value: 'QUATROMIL', label: '4000 litros', color: '#0077b6' },
        { value: 'QUATROMILEQUINHENTOS', label: '4500 litros', color: '#da1e37' },
    ])

    return (
        <Container>
            <SimpleHeader title={'Criação de Tanque'} />
            <Formik
                initialValues={{
                    nome: '', qtdAtual: '', cep: ''
                }}
                onSubmit={(values, actions) => {
                    console.log(values)
                }}
            >
                {(props) => (
                    <InputContainer>
                        <FormTitle>Características</FormTitle>
                        <Divider />
                        <FormItem style={{ width: '100%', marginBottom: 8 }}>
                            <Input
                                placeholder='Ex: T-100'
                                onChangeText={props.handleChange('nome')}
                                value={props.values.nome}
                            />
                        </FormItem>

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

                        <FormBox>
                            <Input
                                placeholder='Em litros'
                                onChangeText={props.handleChange('qtdAtual')}
                                value={props.values.qtdAtual}
                            />
                            <FormItem>
                                <DateButton>
                                    <TextButton>12/03/21</TextButton>
                                </DateButton>
                            </FormItem>
                        </FormBox>

                        <FormTitle style={{ marginTop: 6 }}>Localização</FormTitle>
                        <Divider />
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
        </Container>
    );
}

export default CreateTankForm