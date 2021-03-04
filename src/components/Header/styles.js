import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    height: 150px;
    flex-direction: row;
`;

export const Cover = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
`;

export const Avatar = styled.TouchableOpacity`
    height: 80px;
    width: 80px;
`;

export const UserRole = styled.Text`
    color: #FFF;
    font-style: italic;
    font-size: 13px;
    margin-top: 5px;
`;

export const AvatarBox = styled.View`
    align-items: center;
`;

export const Profile = styled.ImageBackground`
    flex: 1;
    border-radius: 15px;
    padding: 3px;
`;

export const InfoBox = styled.View`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
`;

export const UserName = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #FFF;
    width: 250px;
`;

export const UserEmail = styled.Text`
    color: #FFF;
    font-size: 15px;
`;

export const InfoButton = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 9;
`;

export const TitleBox = styled.View`
    height: 34px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 2px;
`;

export const TitleListBox = styled.View`

`;

export const TitleList = styled.Text`
    color: #FFF;
    font-size: 15px;
`;

export const TitleButton = styled.TouchableOpacity`

`;


