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

export const ModalInfo = styled.View`
    background-color: #d9d9d9;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 8px;
`;

export const InfoBox = styled.View`
    flex-direction: row;
    align-items: center;
    height: 40px;
`;

export const ItemBox = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const InfoTitle = styled.Text`
    font-weight: bold;
`;

export const InfoText = styled.Text`

`;

export const MessageBox = styled.View`
    
`;

export const MessageItemsBox = styled.View`
    flex-direction: row;
`;

export const MessageItemBox = styled.View`
    margin-top: 10px;
    width: 100%;
    align-items: center;
    background-color: #d9d9d9;
    border-radius: 5px;
`;

export const MessageText = styled.Text`
    margin-left: 3px;
`;

export const MessageInputBox = styled.View`
    background-color: #d9d9d9;
    height: 75px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const MessageInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    color: #292b2c;
    margin-left: 10px;
    margin-right: 10px;   
    text-align: center; 
`;

export const ModalButton = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 8px;
`;

export const RefuseButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #c1121f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const AcceptButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    background-color: #2a9d8f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
    margin-right: 12px;
`;

export const DividerH = styled.View`
    width: 100%;    
    height: 0.5px;
    background-color: #333533;
    margin: 5px 0 5px 0;
`;

export const DividerV = styled.View`
    height: 100%;    
    width: 0.5px;
    background-color: #333533;
    margin: 0 5px 0 5px;
`;
