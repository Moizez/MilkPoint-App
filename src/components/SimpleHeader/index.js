import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SimpleHeader = ({ title, color, action, button }) => {

    return (
        <Container>
            {button &&
                <CloseButton onPress={action}>
                    <Icon name='chevron-down' color='#FFF' size={40} />
                </CloseButton>
            }
            <Title style={{ color: color ? color : '#FFF' }}>{title}</Title>
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

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 10px;

`;
const Title = styled.Text`
    font-size: 20px;
    text-align: center;
`;