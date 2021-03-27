import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

const Container = styled.View`
    background-color: ${props => props.theme.main};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
`;

const Title = styled.Text`
    color: #FFF;
    font-size: 18px;
    text-align: center;
`;

const ListHeader = ({ title, iconName, iconColor }) => {
    return (
        <Container style={{ elevation: 5 }}>
            <Title>{title}</Title>
            <Icon name={iconName} color={iconColor} size={26} style={{marginLeft: 15}} />
        </Container>
    );
}

export { ListHeader }

