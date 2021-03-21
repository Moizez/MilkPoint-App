import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const BoxInput = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Titulo = styled.Text`
    font-size: 20px;
    color: #000;
    margin-bottom: 15px;
    text-align: center;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#343a40',
})`
    background: rgba(0,0,0,0.20);
    font-size: 18px;
    width: 81%;
    color: #000;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #292b2c;
    width: 81%;
    height: 45px;
    border-radius: 8px;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    font-size: 20px;
    color: #FFF;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    margin-top: 20px;
    margin-left: 20px;
`;

export const Text = styled.Text`
    font-size: 12px;
    color: #000;
    margin-left: 34px;
`;

export const ButtonBox = styled.View`
    align-items: center;
    justify-content: center;
`;

