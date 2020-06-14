import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'

import MenuButton from '../../components/MenuButton'
import TanqueList from '../../components/TanqueList'

import { Container, BoxNome, Nome, Box, Titulo, List, BoxLogout, Logout, LogoutText } from '../HomeProdutor/styles'

export default function HomeResponsavel() {

    const [tanque, setTanque] = useState([])
    const { user, logOut } = useContext(AuthContext)

    useEffect(() => {
        async function loadList() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/tanque')
            const data = await response.json()
            setTanque(data)
        }

        loadList()

    }, [])

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Bem-vindo {user.nome}</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 2 ? 'Responsável' : ''}</Titulo>
            </BoxNome>

            <BoxLogout>
                <Logout onPress={() => logOut()}>
                    <LogoutText>Sair</LogoutText>
                </Logout>
            </BoxLogout>

            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item }) => (<TanqueList data={item} />)}
            />
        </Container>
    );
}