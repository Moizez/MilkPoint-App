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
align-items: baseline;
justify-content: flex-start;
margin-left: 15px;
margin-bottom: 3px;
margin-top: 25px;
`;

export const Nome = styled.Text`
font-size: 25px;
color: #FFF;
text-align: center;
`;

export const Titulo = styled.Text`
font-size: 14px;
color: #FFF;
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

//Logaout temporario

export const Logout = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #a11d33;
    width: 90%;
    height: 45px;
    border-radius: 7px;
    margin-bottom: 10px;
`;
export const LogoutText = styled.Text`
    font-size: 20;
    color: #FFF;
`;

