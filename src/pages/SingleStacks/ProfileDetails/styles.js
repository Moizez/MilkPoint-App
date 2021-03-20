import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Modal = styled.Modal``;

export const HeaderBox = styled.View``;

export const Cover = styled.ImageBackground`
    height: 150px;
    align-items: center;
    justify-content: center;
`;

export const ProfileBox = styled.View``;

export const Profile = styled.ImageBackground`
    height: 80px;
    width: 80px;
    align-items: flex-end;
`;

export const EditPhoto = styled.TouchableOpacity`
    background-color: #292b2c;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    margin: 4px;
`;

export const ProfileInformation = styled.ScrollView`
    flex: 1;
    padding: 15px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

export const CardInfo = styled.View`
    margin-bottom: 20px;
`;

export const BoldText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const Text = styled.Text`
    font-size: 16px;
    font-weight: normal;
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
`;

export const EditBox = styled.View`
    padding: 15px;
`;

export const EditButton = styled.TouchableOpacity`
    flex-direction: row;
    height: 45px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #292b2c;
    border-radius: 5px;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;

export const CloseButton = styled.TouchableOpacity`
    background-color: #292b2c;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    position: absolute;
    top: 10px;
    left: 12px;
`;

