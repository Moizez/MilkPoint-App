import React, { useState, useEffect } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'

import MenuButton from '../../../components/MenuButton'
import ListaRetiradas from '../../../components/ListaRetiradas'
import ListaDepositos from '../../../components/ListaDepositos'
import Header from '../../../components/Header'
import Picker from '../../../components/Picker'

import {
    Container, BoxNomeAviso, NomeAviso, Box, BoxTitulo, TituloLista, List,
} from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function TelaHistoricoResponsavel() {

    const [deposito, setDeposito] = useState([])
    const [retirada, setRetirada] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [value, setValue] = useState(true)

    //Lista de todos os depositos
    const loadListDepositos = async () => {
        const response = await fetch(`${baseUrl}deposito/listatodos`)
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
        const response = await fetch(`${baseUrl}retirada/listatodos`)
        const data = await response.json()
        setRetirada(data.filter(function (status) {
            return status.confirmacao === true || status.excluido === true
        }))
        return retirada
    }

    useEffect(() => {
        loadListRetiradas()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        value === false ? await loadListRetiradas() : await loadListDepositos()
        setIsRefreshing(false)
    }

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
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => (
                    value == false ? (<ListaRetiradas data={item} />) :
                        (<ListaDepositos data={item} />))}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />

        </Container>
    );
}