import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import RetiradaPendenteList from '../../../components/RetiradaPendenteList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function RetiradasPendentes() {

    const { user } = useContext(AuthContext)
    const [retiradaPendente, setRetiradaPendente] = useState([])

    //Lista de Retiradas Pendentes
    useEffect(() => {
        const loadListRetiradasPendentes = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listapendentes')
            const retiradaPendente = await response.json()
            setRetiradaPendente(retiradaPendente)
        }

        loadListRetiradasPendentes()

    }, [])

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Bem-vindo {user.nome}</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 2 ? 'Responsável' : ''}</Titulo>
            </BoxNome>

            <Box>
                <Titulo>Lista de retiradas pendentes</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={retiradaPendente}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<RetiradaPendenteList data={item} />)}
            />
        </Container>
    );
}