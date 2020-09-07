import styled from 'styled-components/native'

export const BoxGeral = styled.View`
flex:1;
padding-bottom: 6px;
`;

export const Container = styled.View`
flex-direction: row;
align-items: center;
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
font-weight: bold;
`;

export const NomeValor = styled.Text`
font-weight: normal;
`;

export const BoxIcon = styled.TouchableOpacity`
flex: 1;
align-items: center;
justify-content: center;
background-color: #FFF;
padding: 8px;
border-radius: 3px;
margin-left: 5px;
`;

export const BoxInfoTanque = styled.View`
flex: 2;
`;

//MODAL

export const BoxModal = styled.View`
height: 50%;
width: 100%;
bottom: 0;
position: absolute;
border-top-left-radius: 10px;
border-top-right-radius: 10;
background-color: #292b2c;
justify-content: center;
align-items: center;
`;

export const BoxTitulo = styled.View`
flex-direction: row;
padding: 8px;
background-color: #292b2c;
`;

export const TituloInfo = styled.Text`
font-size: 17px;
font-weight: bold;
color: #FFF;
margin-top: 5px;
`;

export const BoxInfo = styled.View`
flex: 1;
flex-direction: row;
align-items: center ;
justify-content: center;
`;

export const NomeModal = styled.Text`
font-size: 17px;
font-weight: bold;
`;

export const BoxInfoModal = styled.View`
flex: 1;
border-radius: 8px;
background-color: #ececec;
align-items: center ;
justify-content: center;
width: 90%;
`;

export const BtnConfirm = styled.View`
align-items: center ;
justify-content: center;
background-color: #2a9d8f;
width: 44%;
height: 45px;
border-radius: 8px;
`;

export const BtnCancel = styled.View`
align-items: center;
justify-content: center;
background-color: #da1e37;
width: 44%;
height: 45px;
border-radius: 8px;
margin-left: 8px;
`;

export const Btn = styled.Text`
font-size: 16px;
`;

export const BtnFechar = styled.TouchableOpacity`
background-color: #ececec;
border-radius: 8px;
margin-bottom: 10px;
width: 90%;
height: 45px;
align-items: center;
justify-content: center;
`;

export const BtnText = styled.Text`
font-size: 22px;
color: #000;

`;

