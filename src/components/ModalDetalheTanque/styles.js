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
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
`;

export const BoxSubEndereco = styled.View`
flex: 1;
background-color: #adb5bd;
margin-left: 3px;
align-items: center;
justify-content: center;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
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
`;

export const BoxMap = styled.View`
flex:2;
background-color: #FFF;
padding: 10px;
justify-content: center;
align-items: center;
`;

//Botão de Voltar

export const BoxBtnModal = styled.View`
border-color: #FFF;
border-width: 0.5px;
border-radius: 8px;
margin-bottom: 10px;
align-items: center;
justify-content: center;
`;

export const BtnVoltar = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #292b2c;
width: 100%;
height: 45px;
border-radius: 8px;
`;

export const BtnText = styled.Text`
font-size: 20px;
color: #FFF;
`;
