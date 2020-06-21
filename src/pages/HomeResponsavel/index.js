import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth'

import MenuButton from '../../components/MenuButton'
import TanqueListResponsavel from '../HomeResponsavel/TanqueListResponsavel'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'

export default function HomeResponsavel() {

    const { user } = useContext(AuthContext)
    const [tanqueResponsavel, setTanqueResponsavel] = useState([])

    //Carregar lista apenas do responsável logado e seus tanques
    useEffect(() => {
        const loadListTanquesResponsavel = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/responsavel/' + user.id + '/tanques')
            const tanqueResponsavel = await response.json()
            setTanqueResponsavel(tanqueResponsavel)
        }

        loadListTanquesResponsavel()

    }, [])

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
                data={tanqueResponsavel}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<TanqueListResponsavel data={item} />)}
            />
        </Container>
    );
}