import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import DepositoPendenteList from '../../../components/DepositoPendenteList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function DepositosPendentes() {
    
    const { user, depositoPendente } = useContext(AuthContext)

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
                data={depositoPendente}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item }) => (<DepositoPendenteList data={item} />)}
            />
        </Container>
    );
}