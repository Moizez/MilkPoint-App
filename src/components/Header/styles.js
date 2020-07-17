import styled from 'styled-components/native'

export const Container = styled.View`
flex: 0.28;
flex-direction: row;
padding: 5px;
background-color: #FFF;
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;
align-items: center;
justify-content: center;
`;

export const Image = styled.Image`
width: 80px;
height: 80px;
border-radius: 20px;
`;

export const InfoNotiButton = styled.View`
`;

export const NotificationButton = styled.TouchableOpacity`
flex: 1;
justify-content: space-between;
`;

export const InfoButton = styled.TouchableOpacity`
`;

export const BoxPerfil = styled.TouchableOpacity`
flex: 1;
flex-direction: row;
align-items: center;
margin-right: 8px;
margin-left: 8px;
padding: 8px;
border-top-width: 0.5px;
border-bottom-width: 0.5px;
border-color: #DDD;
`;

export const BoxImg = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

export const BoxNome = styled.View`
flex: 2.5;
margin-left: 8px;
align-items: center;
justify-content: center;
`;

export const Nome = styled.Text`
font-family: Lato;
font-size: 23px;
color: #000;
text-align: center;
`;

export const Titulo = styled.Text`
font-size: 13px;
color: #da1e37;
font-style: italic;
`;

//Modal

export const ContainerModal = styled.View`
flex:1;
background-color: rgba(0,0,0,0.7);
justify-content: center;
align-items: center;
`;

export const InfoContainer = styled.View`
background-color: #FFF;
width: 95%;
height: 80%;
border-radius: 8px;
`;

export const HeaderModal = styled.View`
background-color: #292b2c;
align-items: center;
justify-content: center;
flex: 1;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
`;

export const InfoBox = styled.ScrollView`
flex: 4;
background-color: #ececec;
height: 70%;
border-radius: 8px;
padding: 8px;
margin: 5px;
`;

export const Info = styled.View`
padding: 8px;
flex-direction: row;
margin-right: 15px;
margin-bottom: 8px;
`;

export const InfoText = styled.Text`
font-size: 18px;
color: #000;
`;

export const BoxBtnModal = styled.View`
border-radius: 8px;
margin-bottom: 8px;
align-items: center;
justify-content: center;
`;

export const BtnFechar = styled.TouchableOpacity`
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
