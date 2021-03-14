import React from 'react';
import moment from 'moment'
import { Formik } from 'formik'


import SimpleHeader from '../../../components/SimpleHeader'
import DatePicker from '../../../components/DatePicker'

import {
    Container, InputContainer, Input, ButtonBox, CloseButton,
    SaveButton, TextButton
} from './styles'

const UpdateTankForm = ({ route }) => {

    const { data } = route.params
    const [selectedDate, setSelectedDate] = useState(new Date())

    return (
        <Container>
            <SimpleHeader title={'Atualização do Tanque'} />
            <Formik
                initialValues={{
                    nome: data.nome, qtdAtual: data.qtdAtual, cep: data.cep
                }}
                onSubmit={(values, actions) => {
                    console.log(values)
                }}
            >
                {(props) => (
                    <InputContainer>
                        <Input
                            placeholder='Ex: T-100'
                            onChangeText={props.handleChange('nome')}
                            value={props.values.nome}
                        />

                        <Input
                            placeholder='Em litros'
                            onChangeText={props.handleChange('qtdAtual')}
                            value={props.values.qtdAtual}
                        />

                        <Input
                            placeholder='Somente números'
                            onChangeText={props.handleChange('cep')}
                            value={props.values.cep}
                            keyboardType='phone-pad'
                        />

                        <ButtonBox>
                            <CloseButton>
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

export default UpdateTankForm