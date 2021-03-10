import styled from 'styled-components/native';

export const Container = styled.View`
`;

export const CardBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ececec;
    margin: 10px 10px 0 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    border-width: 1px;
    border-bottom-width: 0;
    border-color: rgba(0,0,0,0.25);
`;

export const InfoBox = styled.View`
    padding: 8px;
    flex: 2;
`;

export const BoldText = styled.Text`
    font-weight: bold;
`;

export const Text = styled.Text`
    font-weight: normal;
`;

export const IconBox = styled.View`
    flex: 0.5;
    align-items: center;
    justify-content: center;
    background-color: #adb5bd;
    border-top-right-radius: 5px;
`;

export const IconButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const IconText = styled.Text`
    font-size: 11px;
    color: #e9ecef;
    margin-top: 3px;
`;

export const MoreInfoButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #cfd2cd;
    margin: 0px 10px 0 10px;
    padding: 5px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;

    border-width: 1px;
    border-top-width: 0;
    border-color: rgba(0,0,0,0.25);
`;

export const ExpandedCardBox = styled.TouchableOpacity`
    background-color: #ececec;
    margin: 0px 10px 0 10px;

    border-width: 1px;
    border-bottom-width: 0;
    border-top-width: 0;
    border-color: #cfd2cd;

    border-width: 1px;
    border-bottom-width: 0;
    border-top-width: 0;
    border-color: rgba(0,0,0,0.25);
`;

export const ExpandedHeader = styled.View`
    width: 100%;
    background-color: #cfd2cd;
    align-items: center;
    justify-content: center;
    padding: 3px;
`;

export const ExpandedInfoBox = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 3px;
`;

export const ExpandedItemBox = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
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
    margin-left: 5px;
`;