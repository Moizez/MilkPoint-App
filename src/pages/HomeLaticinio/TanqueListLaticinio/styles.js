import styled from 'styled-components/native'

export const BoxGeral = styled.View`
flex:1;
padding-bottom: 6px;
`;

export const Container = styled.TouchableOpacity`
flex-direction: row;
margin-bottom: 5px;
padding: 10px;
box-shadow: 2px 2px rgba(0,0,0,0.40);
background-color: #ececec;
margin-left: 3px;
margin-right: 3px;
border-radius: 8px;
justify-content: space-between;
`;

export const Nome = styled.Text`
font-size: 15px;
`;

export const BoxTanque = styled.View`
flex: 1;
align-items: flex-start;
justify-content: center;
`;

export const Linha = styled.View`

`;

//MODAL UM

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

export const BoxSubTitulo = styled.View`
flex-direction: row;
height: 30px;
`;

export const BoxSubCar = styled.View`
flex: 1;
background-color: #adb5bd;
align-items: center;
justify-content: center;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
`;

export const BoxSubEnd = styled.View`
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

export const BoxBtnModal = styled.View`
border-color: #FFF;
border-width: 0.5px;
border-radius: 8px;
margin-bottom: 10px;
align-items: center;
justify-content: center;
`;

export const BtnFechar = styled.TouchableOpacity`
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

//MODAL DOIS

export const BoxModalDois = styled.View`
flex: 1;
height: 35%;
width: 100%;
bottom: 0;
position: absolute;
background-color: #292b2c;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
`;

export const BoxInfoModalDois = styled.View`
flex: 1;
align-items: center ;
justify-content: center;
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

export const Btn = styled.Text`
font-size: 16px;
`;

//Fab Button

export const BoxFabBtn = styled.View`
align-items: center;
position: absolute;
bottom: 135px;
right: 50px;
`;

export const FabBtn = styled.TouchableOpacity`
position: absolute;
width: 80px;
height: 55px;
border-radius: 10px;
background-color: #292b2c;
justify-content: center;
align-items: center;
`;

export const FabText = styled.Text`
font-size: 14px;
color: #FFF;
`;





