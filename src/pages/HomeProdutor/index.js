import React, { useState, useEffect, useContext } from 'react';

import MenuButton from '../../components/MenuButton'
import ListaTanques from '../HomeProdutor/ListaTanques'
import Header from '../../components/Header'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

export default function HomeProdutor() {

    const [tanque, setTanque] = useState([])



    //Carregar lista tanque
    useEffect(() => {

        async function loadListTanques() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/tanque')
            const data = await response.json()
            setTanque(data)
        }

        loadListTanques()
    }, [])

    return (
        <Container>
            <MenuButton />

            <Header />
            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaTanques data={item} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Nenhum tanque disponível!</NomeAviso></BoxNomeAviso>}
            />

        </Container >
    );
}