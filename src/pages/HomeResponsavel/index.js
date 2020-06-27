import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native'

import MenuButton from '../../components/MenuButton'
import Header from '../../components/Header'
import ListaTanques from '../HomeResponsavel/ListaTanques'
import { AuthContext } from '../../contexts/auth'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

export default function HomeResponsavel() {

    const { user } = useContext(AuthContext)
    const [tanqueResponsavel, setTanqueResponsavel] = useState([])

    //Carregar lista apenas do responsável logado e seus tanques
    const loadListTanquesResponsavel = async () => {
        const response = await fetch(`https://milkpoint.herokuapp.com/api/responsavel/${user.id}/tanque`)
        setTanqueResponsavel(await response.json())
        return tanqueResponsavel
    }

    useEffect(() => {
        loadListTanquesResponsavel()
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
                data={tanqueResponsavel}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaTanques data={item} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Nenhum tanque disponível!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}