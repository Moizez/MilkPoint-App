import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'

import MenuButton from '../../components/MenuButton'
import TanqueListLaticinio from '../HomeLaticinio/TanqueListLaticinio'

import { Container, BoxNome, Nome, Box, Titulo, List } from '../HomeProdutor/styles'

export default function HomeLaticinio() {

    const { user } = useContext(AuthContext)
    const [tanque, setTanque] = useState([])

    //Carregar lista tanque para o Context
    useEffect(() => {
        const loadListTanques = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/tanque')
            const tanque = await response.json()
            setTanque(tanque)
        }

        loadListTanques()

    }, [])

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Bem-vindo {user.nome}</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 3 ? 'Laticínio' : ''}</Titulo>
            </BoxNome>

            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<TanqueListLaticinio data={item} />)}
            />
        </Container>
    );
}