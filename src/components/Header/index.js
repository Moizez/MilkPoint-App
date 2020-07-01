import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import { View } from 'react-native'

import { BoxNome, Nome, Titulo } from './styles'

export default function Header() {

    const { user } = useContext(AuthContext)

    return (
        <View>
            <BoxNome>
                <Nome>Bem-vindo</Nome>
                <Nome style={{fontSize: 23, fontWeight: 'bold'}}>{user.perfil == 3 ? user.nomeFantasia : user.apelido}</Nome>
                <Titulo>
                    {user.perfil == 1 && ('Produtor')}
                    {user.perfil == 2 && ('Responsável')}
                    {user.perfil != 1 && user.perfil != 2 && ('Laticínio')}</Titulo>
            </BoxNome>
        </View>
    );
}
