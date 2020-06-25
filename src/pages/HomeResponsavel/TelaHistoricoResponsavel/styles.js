import styled from 'styled-components/native'

export const Container = styled.View`
flex: 1;
background-color: #292b2c;
`;

export const BoxNomeAviso = styled.View`
flex: 1;
padding-top: 15px;
background-color: #FFF;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
margin-left: 8px;
margin-right: 8px;
`;

export const NomeAviso = styled.Text`
font-size: 18px;
color: #292b2c;
text-align: center;
`;

export const Box = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-left: 10px;
margin-right: 10px;
margin-bottom: 5px;
`;

export const BoxTitulo = styled.View`
align-items: center;
`;

export const TituloLista = styled.Text`
font-size: 14px;
color: #FFF;
margin-bottom: -19px;
`;

export const List = styled.FlatList.attrs({
    marginHorinzontal: 15,
})`
    padding-top: 15px;
    background-color: #FFF;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-left: 8px;
    margin-right: 8px;
`;

//Fab Button

export const BoxFabBtn = styled.View`
align-items: center;
position: absolute;
bottom: 90px;
right: 59px;
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
