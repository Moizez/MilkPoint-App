import styled from 'styled-components/native'

export const Container = styled.View`
flex: 1;
background-color: #292b2c;
`;

export const BoxNome = styled.View`
margin-bottom: 5px;
align-items: center;
`;

export const Box = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-left: 10px;
margin-right: 10px;
margin-top: 20px;
margin-bottom: 5px;
`;

export const Nome = styled.Text`
font-size: 25px;
color: #FFF;
text-align: center;
`;

export const BoxTitulo = styled.View`
align-items: center;
`;

export const Titulo = styled.Text`
font-size: 14px;
color: #FFF;
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
