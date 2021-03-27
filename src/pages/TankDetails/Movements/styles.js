import styled from 'styled-components/native';

export const MainContainer = styled.ScrollView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    padding: 10px;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;

export const HeaderMovements = styled.View`
    height: 30px;
    width: 100%;
    flex-direction: row;
    margin-bottom: 5px;
    margin-top: 5px;
`;

export const MilkMovements = styled.View`
    flex: 1;
    flex-direction: row;
    background-color: #2a9d8f;
    align-items: center;
    justify-content: space-around;
    border-top-left-radius: 8px;
`;

export const CashMovements = styled.View`
    flex: 1;
    flex-direction: row;
    background-color: #fca311;
    align-items: center;
    justify-content: space-around;
    border-top-right-radius: 8px;
`;

export const TextMoviments = styled.Text`
    font-size: 15px;
    color: #FFF;
`;

export const PeriodTitle = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    background-color: #e5e5e5;
`;

export const PeriodBox = styled.View`
    flex-direction: row;
    padding: 8px;
`;

export const PeriodItem = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const PeriodText = styled.Text`
    font-size: 16px;
`;

export const MilkMovementsBottom = styled.View`
    flex: 1;
    height: 20px;
    background-color: #2a9d8f;
    border-bottom-left-radius: 8px;
`;

export const CashMovementsBottom = styled.View`
    flex: 1;
    height: 20px;
    background-color: #fca311;
    border-bottom-right-radius: 8px;
`;

export const DividerH = styled.View`
    width: 100%;    
    height: 0.5px;
    background-color: #333533;
    margin: 2px 0 5px 0;
`;

export const DividerV = styled.View`
    height: 100%;    
    width: 0.5px;
    background-color: #333533;
    margin: 0 5px 0 5px;
`;




