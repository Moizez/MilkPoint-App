import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, BoxInput, Titulo, AreaInput, Input, CloseButton, SubmitButton,
    SubmitText, Text, ButtonBox
} from './styles';

const ForgotPassword = () => {

    const navigation = useNavigation()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    return (
        <Container behavior='padding'>
            <CloseButton onPress={() => navigation.goBack()}>
                <Icon name='chevron-down' color='#000' size={40} />
            </CloseButton>
            <BoxInput>
                <Titulo>Recuperar senha</Titulo>
                <Text>E-mail:</Text>
                <AreaInput>
                    <Input
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>
                <Text>Telefone:</Text>
                <AreaInput>
                    <Input
                        placeholder="Telefone"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>
                <Text>CPF/CNPJ:</Text>
                <AreaInput>
                    <Input
                        placeholder="CPF/CNPJ"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={cpf}
                        onChangeText={(text) => setCpf(text)}
                    />
                </AreaInput>

                <ButtonBox>
                    <SubmitButton>
                        <SubmitText>Recuperar</SubmitText>
                    </SubmitButton>
                </ButtonBox>

            </BoxInput>
        </Container>
    );
}

export default ForgotPassword