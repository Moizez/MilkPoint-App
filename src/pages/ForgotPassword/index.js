import React, { useState } from 'react';

import { Container, BoxInput, Titulo, AreaInput, Input, SubmitButton, SubmitText } from './styles';

export default function ForgotPassword() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    return (
        <Container>
            <BoxInput>
                <Titulo>Recuperar senha:</Titulo>
                <AreaInput>
                    <Input
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

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

                <SubmitButton>
                    <SubmitText>Recuperar</SubmitText>
                </SubmitButton>

            </BoxInput>
        </Container>
    );
}