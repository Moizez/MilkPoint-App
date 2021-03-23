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
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;

export const InputContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 5px;
`;

export const InputBox = styled.View`
    height: 48px;
    width: 100%;
    background-color: #DDD;
    margin-bottom: 10px;
    justify-content: space-around;
    border-radius: 5px;
`;

export const InputItemBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#495057',
})`
    width: 90%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const IconBox = styled.View`
    height: 48px;
    width: 40px;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
    margin-bottom: 6px;
`;

export const IconButton = styled.TouchableOpacity`
    height: 48px;
    width: 40px;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
    margin-bottom: 6px;
`;

export const EnterButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #292b2c;
    width: 100%;
    height: 45px;
    border-radius: 5px;
    margin-top: 10px;
`;

export const EnterText = styled.Text`
    font-size: 20px;
    color: #FFF;
`;

export const Link = styled.TouchableOpacity`
    margin-top: 5px;
    margin-bottom: 10px;
`;

export const LinkText = styled.Text`
    margin-top: 5px;
    color: #000;
    font-size: 15px;
`;

