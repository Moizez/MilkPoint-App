import styled from 'styled-components/native';

export const Container = styled.View`
`;

export const CardBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ececec;
    padding: 10px;
    margin: 10px 10px 0 10px;
    border-radius: 8px;
`;

export const InfoBox = styled.View`
    flex: 2;
`;

export const BoldText = styled.Text`
    font-weight: bold;
`;

export const Text = styled.Text`
    font-weight: normal;
`;


export const TankChartBox = styled.TouchableOpacity`
    margin-left: 6px;
`;

export const TankIconBox = styled.View`
    flex-direction: row;
    justify-content: space-between; 
`;

export const TankChart = styled.View`
   
`;

export const PetImage = styled.Image`
    width: 30px;
    height: 30px;
`;

export const DividerV = styled.View`
    height: 100%;    
    width: 0.5px;
    background-color: #333533;
    margin: 0 5px 0 5px;
`;