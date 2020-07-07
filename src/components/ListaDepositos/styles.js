import styled from 'styled-components/native'

export const Container = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 10px;
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

export const BoxIcon = styled.View`
flex: 1;
align-items: center;
justify-content: center;
background-color: #FFF;
padding: 8px;
border-radius: 3px;
margin-left: 5px;
`;

export const BoxInfo = styled.View`
flex: 2;
`;

