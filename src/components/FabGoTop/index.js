import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { BoxFabBtn, FabBtn, FabText } from './styles'

export default function FabGoTop() {
    return (
        <BoxFabBtn>
            <FabBtn>
                <Icon
                    name='arrow-up-bold-hexagon-outline'
                    color='#FFF'
                    size={20}>
                </Icon>
                <FabText>Up</FabText>
            </FabBtn>
        </BoxFabBtn>
    );
}