import styled from 'styled-components/native'

export const BoxGeral = styled.View`
flex: 1;
padding-bottom: 20px;
`;

export const Container = styled.TouchableOpacity`
flex-direction: column;
padding: 5px;
box-shadow: 2px 2px rgba(0,0,0,0.40);
margin-left: 10px;
margin-right: 10px;
border-radius: 8px;
justify-content: space-between;
border-width: 1px;
border-color: #000;
`;

export const BoxIcon = styled.View`
flex: 1;
flex-direction: row;
align-items: center;
justify-content: center;
`;

export const Nome = styled.Text`
font-size: 14px;
`;

export const BoxSpeed = styled.View`
flex: 1;
align-items: center;
justify-content: center;
background-color: #FFF;
border-radius: 3px;
`;

export const BoxTanque = styled.View`
flex: 1;
align-items: flex-start;
justify-content: center;
margin-top: 3px;
`;

//MODAL

export const BoxModal = styled.View`
flex: 1;
background-color: #292b2c;
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
background-color: #292b2c;
`;

export const BoxCaracteristicas = styled.View`
flex: 1;
background-color: #ececec;
padding: 5px;
border-radius: 5px;
justify-content: center;
margin-bottom: 5px;
margin-top: 5px;
`;

export const BoxEndereco = styled.View`
flex: 1;
background-color: #ececec;
padding: 5px;
border-radius: 5px;
margin-left: 3px;
justify-content: center;
margin-bottom: 5px;
margin-top: 5px;
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
border-top-left-radius: 8px;
border-top-right-radius: 8px;
`;

export const BtnVoltar = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #292b2c;
width: 95%;
height: 45px;
border-radius: 8px;
margin-top: 5px;
`;

export const BoxBtnText = styled.View`
align-items: center;
justify-content: center;
border-top-color: #FFF;
border-width: 1px;
`;

export const BtnText = styled.Text`
font-size: 20px;
color: #FFF;
`;