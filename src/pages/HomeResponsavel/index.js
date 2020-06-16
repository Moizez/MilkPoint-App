import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'

import MenuButton from '../../components/MenuButton'
import TanqueList from '../../components/TanqueList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function HomeResponsavel() {

    const [dataTanque, setDataTanque] = useState([])
    const { user, tanque } = useContext(AuthContext)

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
                data={dataTanque}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item }) => (<TanqueList data={item} />)}
            />

        </Container>
    );
}