import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native'

import MenuButton from '../../components/MenuButton'
import Header from '../../components/Header'
import ListaTanques from '../HomeResponsavel/ListaTanques'
import { AuthContext } from '../../contexts/auth'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

export default function HomeResponsavel() {

    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [tanqueResponsavel, setTanqueResponsavel] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Retona uma lista apenas com os tanques do responsável logado
    const loadListTanquesResponsavel = async () => {
        const response = await fetch(`https://milkpoint.herokuapp.com/api/responsavel/${user.id}/tanque`)
        setTanqueResponsavel(await response.json())
        return tanqueResponsavel
    }

    useEffect(() => {
        setIsLoading(true)
        loadListTanquesResponsavel()
        setIsLoading(false)
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListTanquesResponsavel()
        setIsRefreshing(false)
    }

    return (

        <Container>
            <MenuButton />
            <Header />
            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            {isLoading && <ActivityIndicator size='large' color='#ff9142' />}

            {!isLoading &&
                <List
                    showsVerticalScrollIndicator={false}
                    data={tanqueResponsavel}
                    keyExtractor={(item) => item.id}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                    renderItem={({ item }) => (<ListaTanques data={item} />)}
                    ListEmptyComponent={<BoxNomeAviso><NomeAviso>Nenhum tanque disponível!</NomeAviso></BoxNomeAviso>}
                />}
        </Container>
    );
}