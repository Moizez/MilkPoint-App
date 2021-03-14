import React from 'react';
import styled from 'styled-components/native';

const SimpleHeader = ({title}) => {
    return (
        <Container>
            <Title>{title}</Title>
        </Container>
    );
}

export default SimpleHeader

const Container = styled.View`
    width: 100%;
    height: 75px;
    background-color: #292b2c;
    align-items: center;
    justify-content: center;
`;
const Title = styled.Text`
    font-size: 20px;
    color: #FFF;
`;