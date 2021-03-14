import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const InputContainer = styled.View`
    flex: 1;
    padding: 15px;
`;

export const Input = styled.TextInput`
    height: 45px;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #292b2c;
    margin-left: 10px;
    margin-right: 10px;
`;

export const ButtonBox = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 8px;
`;

export const CloseButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #c1121f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const SaveButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #2a9d8f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;


