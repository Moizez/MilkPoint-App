import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'

import MenuButton from '../../components/MenuButton'
import TanqueList from '../../components/TanqueList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function HomeProdutor() {

    const { user, tanque } = useContext(AuthContext)

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Bem-vindo {user.nome}</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 1 ? 'Produtor' : ''}</Titulo>
            </BoxNome>

            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<TanqueList data={item} />)}
            />
        </Container >
    );
}