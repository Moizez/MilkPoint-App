import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, InputContainer, Titulo, InputBox, Input, CloseButton,
    RecoverButton, RecoverText, Text
} from './styles';

const ForgotPassword = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [doc, setDoc] = useState('');

    return (
        <Container behavior='padding'>
            <CloseButton onPress={() => navigation.goBack()}>
                <Icon name='chevron-down' color='#000' size={40} />
            </CloseButton>
            <InputContainer>
                <Titulo>Recuperar senha</Titulo>
                <InputBox>
                    {email != 0 && <Text>E-mail:</Text>}
                    <Input
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </InputBox>

                <InputBox>
                    {phone != 0 && <Text>Telefone:</Text>}
                    <Input
                        placeholder="Celular"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                </InputBox>

                <InputBox>
                    {doc != 0 && <Text>CPF/CNPJ:</Text>}
                    <Input
                        placeholder="CPF/CNPJ"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={doc}
                        onChangeText={(text) => setDoc(text)}
                    />
                </InputBox>

                <RecoverButton>
                    <RecoverText>Recuperar</RecoverText>
                </RecoverButton>

            </InputContainer>
        </Container>
    );
}

export default ForgotPassword