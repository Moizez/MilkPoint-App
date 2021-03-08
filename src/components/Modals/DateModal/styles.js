import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const CloseContainer = styled.TouchableOpacity`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: flex-end;
`;

export const ModalBox = styled.View`
    background-color: #292b2c;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

export const ModalHeader = styled.View`
    height: 40px;
    flex-direction: row;
    align-items: center;
`;
export const Title = styled.Text`
    font-size: 18px;
    color: #FFF;
    margin-left: 15px;
`;

export const ChosenDateBox = styled.View`
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
`;

export const Button15Days = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #e9c46a;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
`;

export const Button30Days = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #e76f51;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    margin-left: 10px;
`;

export const ButtonInitialDate = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #76c893;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
`;

export const ButtonFinalDate = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #c1121f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    margin-left: 10px;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 15px;
    margin-left: 3px;
`;

export const SearchBox = styled.View`
    background-color: #d9d9d9;
    height: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    color: #292b2c;
    margin-left: 10px;
    margin-right: 10px;

`;

export const SearchButton = styled.TouchableOpacity`
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    background-color: #219ebc;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left-width: 1px;
    border-color: #6c757d;
`;



