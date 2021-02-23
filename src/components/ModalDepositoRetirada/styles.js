import styled from 'styled-components/native';

//MODAL

export const BoxModal = styled.View`
flex: 1;
height: 35%;
width: 100%;
bottom: 0;
position: absolute;
background-color: #292b2c;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
`;

export const BoxInfoModal = styled.View`
flex: 1;
align-items: center ;
justify-content: center;
`;

export const TituloInfo = styled.Text`
font-size: 16px;
color: #FFF;
text-align: center;
`;

export const InputModal = styled.TextInput`
background-color: #FFF;
text-align: center;
font-size: 18px;
width: 300px;
color: #000;
margin-top: 15px;
margin-bottom: 15px;
padding: 10px;
border-radius: 8px;
`;

export const BoxBtn = styled.View`
flex-direction: row;
`;

export const BtnConfirm = styled.View`
align-items: center ;
justify-content: center;
background-color: #2a9d8f;
width: 144px;
height: 45px;
border-radius: 8px;
margin-top: 10px;
`;

export const BtnCancel = styled.View`
align-items: center;
justify-content: center;
background-color: #da1e37;
width: 144px;
height: 45px;
border-radius: 8px;
margin-top: 10px;
margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
font-size: 16px;
`;

export const BtnText = styled.Text`
font-size: 16px;
`;
