import styled from 'styled-components/native'

export const BoxGeral = styled.View`
padding-bottom: 8px;
`;

export const Container = styled.TouchableOpacity`
flex-direction: row;
margin-bottom: 5px;
padding: 8px;
box-shadow: 2px 2px rgba(0,0,0,0.40);
background-color: #ececec;
margin-left: 3px;
margin-right: 3px;
border-radius: 5px;
justify-content: space-between;
`;

export const Nome = styled.Text`
font-size: 15px;
font-weight: bold;
`;

export const NomeValor = styled.Text`
font-weight: normal;
`;

export const BoxTanque = styled.View`
flex: 1;
align-items: flex-start;
justify-content: center;
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







