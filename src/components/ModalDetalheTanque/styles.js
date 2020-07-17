import styled from 'styled-components/native'

export const BoxModal = styled.View`
flex:1;
`;

export const BoxTitulo = styled.View`
flex-direction: row;
padding: 8px;
align-items: center;
justify-content: center;
background-color: #292b2c;
`;

export const BoxSubtitulo = styled.View`
flex-direction: row;
height: 30px;
`;

export const BoxSubCaracteristicas = styled.View`
flex: 1;
background-color: #adb5bd;
align-items: center;
justify-content: center;
border-bottom-right-radius: 5px;
`;

export const BoxSubEndereco = styled.View`
flex: 1;
background-color: #adb5bd;
margin-left: 3px;
align-items: center;
justify-content: center;
border-bottom-left-radius: 5px;

`;

export const TituloInfo = styled.Text`
font-size: 20px;
font-weight: bold;
color: #FFF;
`;

export const BoxInfo = styled.View`
flex-direction: row;
background-color: #FFF;
padding: 6px;
border-bottom-width: 1px;
border-bottom-color: #000;
`;

export const BoxCaracteristicas = styled.View`
flex: 1;
background-color: #ececec;
padding: 5px;
border-radius: 5px;
justify-content: center;
`;

export const BoxEndereco = styled.View`
flex: 1;
background-color: #ececec;
padding: 5px;
border-radius: 5px;
margin-left: 3px;
justify-content: center;
`;

export const TextInfo = styled.Text`
font-size: 16px;
font-weight: bold;
`;

export const BoxMap = styled.View`
flex: 2;
padding: 6px;
justify-content: center;
align-items: center;
`;

//Botão de Voltar

export const BoxBtnModal = styled.View`
border-radius: 8px;
margin-bottom: 8px;
align-items: center;
justify-content: center;
`;

export const BtnVoltar = styled.TouchableOpacity`
background-color: #292b2c;
border-radius: 8px;
width: 97%;
height: 45px;
align-items: center;
justify-content: center;
`;

export const BtnText = styled.Text`
font-size: 20px;
color: #FFF;
`;
