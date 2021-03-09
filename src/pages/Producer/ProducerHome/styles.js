import styled from 'styled-components/native'

export const Container = styled.View`
flex: 1;
background-color: #292b2c;
margin-bottom: 10px;
`;

export const BoxNomeAviso = styled.View`
padding-top: 15px;
background-color: #FFF;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
margin-left: 8px;
margin-right: 8px;
align-items: center;
`;

export const NomeAviso = styled.Text`
font-size: 18px;
color: #adb5bd;
text-align: center;
margin-top: 15px;
`;

export const BoxIconAviso = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const BoxIconUpdate = styled.View`
justify-content: center;
align-items: center;
width: 150px;
`;

export const BoxIconDelete = styled.View`
margin-left: 8px;
justify-content: center;
align-items: center;
width: 150px;
`;

export const Titulo = styled.Text`
font-size: 14px;
color: #FFF;
`;

export const List = styled.FlatList`
flex: 1;
background-color: #FFF;
border-top-left-radius: 3px;
border-top-right-radius: 3px;
`;