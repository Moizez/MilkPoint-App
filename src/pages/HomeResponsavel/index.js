import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth'

import MenuButton from '../../components/MenuButton'
import TanqueResponsavelList from '../../components/TanqueResponsavelList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function HomeResponsavel() {

    const { user, tanqueResponsavel } = useContext(AuthContext)

    return (

        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Bem-vindo {user.nome}</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 2 ? 'Responsável' : ''}</Titulo>
            </BoxNome>

            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanqueResponsavel}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item }) => (<TanqueResponsavelList data={item} />)}
            />
        </Container>
    );
}