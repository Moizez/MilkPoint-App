import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: rgba(0,0,0,0.05);
`;

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
    height: 45;
    width: 48%;
    font-size: 16px;
    background-color: #DDD;
    color: #292b2c;
    border-radius: 5px;
    padding: 8px;
`;

export const DateButton = styled.TouchableOpacity`
    flex: 1;
    background-color: #DDD;
    border-radius: 5px;
`;

export const FormBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

export const FormItem = styled.View`
    height: 45;
    width: 48%;
    justify-content: center;
    background-color: #DDD;
    border-radius: 5px;
`;

export const MapButtonBox = styled.View`
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 5px;
`;

export const Text = styled.Text`
    text-align: center;
    font-size: 16px;
    color: #000;
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
    height: 45px;
    width: 60px;
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
    margin: 8px 0 8px 0;
`;




