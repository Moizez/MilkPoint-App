import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import Header from '../../../components/Header'
import ListaRetiradas from '../../../components/ListaRetiradas'
import ListaDepositos from '../../../components/ListaDepositos'
import Picker from '../../../components/Picker'

import { Container, BoxNomeAviso, NomeAviso, Box, BoxTitulo, TituloLista, List } from './styles'

export default function TelaHistoricoResponsavel() {

    const { user } = useContext(AuthContext)
    const [deposito, setDeposito] = useState([])
    const [retirada, setRetirada] = useState([])
    const [value, setValue] = useState(null)

    //Lista de todos os depositos
    useEffect(() => {
        const loadListDepositos = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos')
            const deposito = await response.json()
            setDeposito(deposito.filter(function (status) {
                return status.confirmacao === true || status.excluido === true
            }))
        }

        loadListDepositos()

    }, [])

    //Lista de Retiradas
    useEffect(() => {
        const loadListRetiradas = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos')
            const retirada = await response.json()
            setRetirada(retirada.filter(function (status) {
                return status.confirmacao === true || status.excluido === true
            }))
        }

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
                data={value == 'retirada' ? retirada : deposito}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    value == 'retirada' ? (<ListaRetiradas data={item} />) :
                        (<ListaDepositos data={item} />))}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}