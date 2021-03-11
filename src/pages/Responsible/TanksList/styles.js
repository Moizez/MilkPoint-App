import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #ececec;
    padding: 10px;
    margin: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
`;

export const TankChartBox = styled.TouchableOpacity`
    flex: 1;
`;

export const TankIconBox = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px; 
`;

export const BoldText = styled.Text`
    font-weight: bold;
    font-size: 18px;
`;

export const Text = styled.Text`
    font-weight: normal;
`;

export const TankChart = styled.View`
    align-items: center;
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

export const PetImage = styled.Image`
    width: 30px;
    height: 30px;
`;

export const DividerH = styled.View`
    height: 0.5px;    
    width: 100%;
    background-color: #333533;
    margin: 5px 0 5px 0;
`;

export const DividerV = styled.View`
    height: 100%;    
    width: 0.5px;
    background-color: #333533;
    margin: 0 5px 0 5px;
`;