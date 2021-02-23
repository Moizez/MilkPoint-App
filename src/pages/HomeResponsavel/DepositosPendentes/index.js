import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import DepositoPendenteList from '../../../components/DepositoPendenteList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function DepositosPendentes() {

    const { user } = useContext(AuthContext)
    const [depositoPendente, setDepositoPendente] = useState([])

    //Lista de Depositos Pendentes
    useEffect(() => {

        const loadListDepositosPendentes = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listapendentes')
            const depositoPendente = await response.json()
            setDepositoPendente(depositoPendente)
        }

        loadListDepositosPendentes()
    }, [])

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Bem-vindo {user.nome}</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 2 ? 'Responsável' : ''}</Titulo>
            </BoxNome>

            <Box>
                <Titulo>Lista de depósitos pendentes</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={depositoPendente}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<DepositoPendenteList data={item} />)}
            />
        </Container>
    );
}