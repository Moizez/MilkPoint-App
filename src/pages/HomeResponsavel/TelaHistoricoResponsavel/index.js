import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import Header from '../../../components/Header'
import ListaRetiradas from '../../../components/ListaRetiradas'
import ListaDepositos from '../../../components/ListaDepositos'
import Picker from '../../../components/Picker'


import {
    Container, BoxNomeAviso, NomeAviso, Box, BoxTitulo, TituloLista, List,
} from './styles'

export default function TelaHistoricoResponsavel() {

    const { user } = useContext(AuthContext)
    const [deposito, setDeposito] = useState([])
    const [retirada, setRetirada] = useState([])
    const [value, setValue] = useState(true)

    //Lista de todos os depositos
    const loadListDepositos = async () => {
        const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos')
        const data = await response.json()
        setDeposito(data.filter(function (status) {
            return status.confirmacao === true || status.excluido === true
        }))
        return deposito
    }

    useEffect(() => {
        loadListDepositos()
    }, [])

    //Lista de Retiradas
    const loadListRetiradas = async () => {
        const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos')
        const data = await response.json()
        setRetirada(data.filter(function (status) {
            return status.confirmacao === true || status.excluido === true
        }))
        return retirada
    }

    useEffect(() => {
        loadListRetiradas()
    }, [])

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <BoxTitulo>
                    <TituloLista>Lista de depósitos/retiradas</TituloLista>
                </BoxTitulo>
                <Picker onChange={setValue} />
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={value == false ? retirada : deposito}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    value == false ? (<ListaRetiradas data={item} />) :
                        (<ListaDepositos data={item} />))}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />

        </Container>
    );
}