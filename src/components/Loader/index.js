import React, { useContext } from 'react'
import styled from 'styled-components/native';

import { AuthContext } from '../../contexts/auth'

const Loader = () => {

    const { user } = useContext(AuthContext)

    const changeColor = () => {
        if (user.perfil === 1) return '#2a9d8f'
        if (user.perfil === 2) return '#fca311'
        if (user.perfil === 3) return '#da1e37'
        if (user.perfil === 4) return '#0077b6'
    }

    return (
        <Container>
            <Load>
                <Indicator color={changeColor()} size="large" />
                <Text>Carregando...</Text>
            </Load>
        </Container>
    );
}

export default Loader

const Container = styled.View`
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

const Load = styled.View`
    width: 200px;
    height: 100px;
    background-color: #292b2c;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-bottom: 30px;
`;

const Indicator = styled.ActivityIndicator`
    margin-top: 5px;
    margin-bottom: 10px;
`;

const Text = styled.Text`
    color: #FFF;
    text-align: center;
`;


