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
    font-size: 15px;
    color: #000;
`;

export const CancelButton = styled.TouchableOpacity`
    height: 45px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #c1121f;
    border-radius: 5px;
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




