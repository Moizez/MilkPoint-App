import styled from 'styled-components/native';

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

export const WithdrawalBox = styled.View`
    background-color: #d9d9d9;
    height: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const WithdrawalInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    color: #292b2c;
    margin-left: 10px;
    margin-right: 10px;

`;

export const WithdrawalButton = styled.TouchableOpacity`
    height: 45px;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #c1121f;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left-width: 1px;
    border-color: #6c757d;
`;

export const ModalInfo = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 8px;
`;

export const TotalWithdrawal = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #c1121f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

export const PartialWithdrawal = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #2a9d8f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
    margin-right: 12px;
`;



