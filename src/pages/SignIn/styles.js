import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
flex: 1;
align-items: center;
justify-content: center;
behavior: 'padding';
`;

export const BoxImage = styled.View`
flex: 1;
justify-content: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#343a40',
})`
background: #d3d3d3;
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

export const Link = styled.TouchableOpacity`
margin-top: 5px;
margin-bottom: 10px;
`;

export const LinkText = styled.Text`
margin-top: 5px;
color: #000;
font-size: 15px;
`;

