import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, InformationBox, Title, Text, TipsBox, InfoItem
} from './styles'

const EmptyListCard = ({ iconLeft, iconRight, infoLeft, infoRight }) => {
    return (
        <Container>
            <Title>Não há registros!</Title>
            <TipsBox>
                <Text>Dicas</Text>
                <Icon
                    name='lightbulb-on-outline'
                    color='#6c757d' size={25}
                    style={{ marginLeft: 10 }}
                />
            </TipsBox>
            <InformationBox>
                <InfoItem>
                    <Icon name={iconLeft} color='#6c757d' size={60} />
                    <Text>{infoLeft}</Text>
                </InfoItem>
                <InfoItem>
                    <Icon name={iconRight} color='#6c757d' size={60} />
                    <Text>{infoRight}</Text>
                </InfoItem>
            </InformationBox>
        </Container>
    );
}

export default EmptyListCard

