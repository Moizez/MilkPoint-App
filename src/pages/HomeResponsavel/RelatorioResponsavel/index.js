import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import RetiradaList from '../../../components/RetiradaList'
import DepositoList from '../../../components/DepositoList'
import Picker from '../../../components/Picker'

import { Container, BoxNome, Nome, Box, Titulo, BoxTitulo, TituloLista, List } from './styles'

export default function RelatorioResponsavel() {

    const { user, deposito, retirada } = useContext(AuthContext)
    const [value, setValue] = useState(null)

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Relatório</Nome>
                <Titulo style={{ color: '#da1e37' }}>{user.perfil === 2 ? 'Responsável' : ''}</Titulo>
            </BoxNome>

            <Box>
                <BoxTitulo>
                    <TituloLista>Lista de depósitos/retiradas</TituloLista>
                </BoxTitulo>
                <Picker onChange={setValue} />
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={value == 'retirada' ? retirada : deposito}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item }) => (
                    value == 'retirada' ? (<RetiradaList data={item} />) :
                        (<DepositoList data={item} />))}

            />
        </Container>
    );
}