import styled from 'styled-components/native'

export const Container = styled.View`
flex-direction: row;
align-items: center;
margin-top: 20px;
margin-bottom: -30px;
width: 100%;
height: 50px;
margin-left: 8px;
margin-right: 8px;
`;

export const Menu = styled.TouchableWithoutFeedback`
justify-content: center;
align-items: center;
`;

export const InfoButton = styled.TouchableOpacity`
justify-content: center;
align-items: center;
margin-left: 280px;
`;

//Modal

export const ContainerModal = styled.View`
flex:1;
background-color: rgba(0,0,0,0.7);
justify-content: center;
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
margin-bottom: 10px;
padding: 8px;
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