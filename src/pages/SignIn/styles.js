import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const BoxImage = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 18px;
    margin-bottom: 12px;
    color: #292b2c;
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;

export const InputContainer = styled.View`
    width: 100%;
`;

export const InputBox = styled.View`
    width: 100%;
    flex-direction: row;
    border-radius: 5px;
    background-color: #DDD;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const InputItemBox = styled.View`
    height: 48px;
    width: 85%;
    justify-content: space-around;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#495057',
})`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const IconBox = styled.TouchableOpacity`
    height: 48px;
    width: 15%;
    align-items: center;
    justify-content: center;
    background-color: #CCC;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
`;

export const EnterButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #292b2c;
    width: 272px;
    height: 48px;
    border-radius: 5px;
    margin-top: 10px;
`;

export const EnterText = styled.Text`
    font-size: 20px;
    color: #FFF;
`;

export const Link = styled.TouchableOpacity`
    margin-top: 5px;
`;

export const LinkText = styled.Text`
    margin-top: 5px;
    color: #000;
    font-size: 15px;
`;

