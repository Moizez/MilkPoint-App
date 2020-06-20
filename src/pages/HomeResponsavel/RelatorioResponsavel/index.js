import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import RetiradaList from '../../../components/RetiradaList'
import DepositoList from '../../../components/DepositoList'
import Picker from '../../../components/Picker'

import { Container, BoxNome, Nome, Box, Titulo, BoxTitulo, TituloLista, List } from './styles'

export default function RelatorioResponsavel() {

    const { user } = useContext(AuthContext)
    const [deposito, setDeposito] = useState([])
    const [retirada, setRetirada] = useState([])
    const [value, setValue] = useState(null)

    //Lista de todos os depositos
    useEffect(() => {
        const loadListDepositos = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos')
            const deposito = await response.json()
            setDeposito(deposito)
        }

        loadListDepositos()

    }, [...deposito])

    //Lista de Retiradas
    useEffect(() => {
        const loadListRetiradas = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos')
            const retirada = await response.json()
            setRetirada(retirada)
        }

        loadListRetiradas()

    }, [...retirada])

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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    value == 'retirada' ? (<RetiradaList data={item} />) :
                        (<DepositoList data={item} />))}

            />
        </Container>
    );
}