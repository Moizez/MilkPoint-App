import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #ececec;
`;

export const Modal = styled.Modal``

export const InputContainer = styled.View`
    flex: 1;
    padding: 15px;
`;

export const FormTitle = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

export const Input = styled.TextInput`
    height: 48px;
    width: 100%;
    font-size: 16px;
    color: #292b2c;
    border-radius: 5px;
    padding: 8px;
`;

export const FormButton = styled.TouchableOpacity`
    height: 48px;
    flex-direction: row;
    border-radius: 5px;
    align-items: center;
    justify-content: space-around;
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;

export const ErrorText = styled.Text`
    font-size: 11px;
    color: #c1121f;
`;

export const FormItem = styled.View`
    height: 48px;
    width: 48%;
    justify-content: space-around;
    background-color: #d3d3d3;
    border-radius: 5px;
`;

export const FormBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const MapButtonBox = styled.View`
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 5px;
`;

export const MapButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #292b2c;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
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

export const CepButton = styled.TouchableOpacity`
    height: 48px;
    width: 50px;
    background-color: #292b2c;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;

export const Divider = styled.View`
    width: 100%;    
    height: 0.5px;
    background-color: #CCB;
    margin: 8px 0 15px 0;
`;




