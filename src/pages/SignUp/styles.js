import styled from 'styled-components/native'

Container, BoxInput, AreaInput, Input, SubmitButton, SubmitText

export const Container = styled.View`
flex: 1;
`;

export const BoxInput = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

export const Titulo = styled.Text`
font-size: 20px;
color: #000;
margin-bottom: 15px;
`;

export const AreaInput = styled.View`
flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#343a40',
})`
background: rgba(0,0,0,0.20);
font-size: 18px;
width: 90%;
color: #000;
margin-bottom: 15px;
padding: 10px;
border-radius: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #292b2c;
width: 90%;
height: 45px;
border-radius: 8px;
margin-top: 10px;
`;

export const SubmitText = styled.Text`
font-size: 20px;
color: #FFF;
`;

