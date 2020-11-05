import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ActionButton = ({
    title, btnColor, nameIcon, onAction, btnSize, marginRight,
    btnAlign, colorText, fontSize, colorIcon, iconSize, active
}) => {
    return (
        <TouchableOpacity
            disabled={active}
            onPress={onAction}
            style={{
                ...styles.button,
                backgroundColor: btnColor,
                width: btnSize ? btnSize : '45%',
                justifyContent: btnAlign ? btnAlign : 'space-around',
            }}
        >
            <Text style={{
                color: colorText ? colorText : '#FFF',
                fontSize: fontSize ? fontSize : 18,
                marginRight: marginRight
            }}>{title}</Text>
            <Icon name={nameIcon} size={iconSize ? iconSize : 28} color={colorIcon ? colorIcon : '#FFF'} />

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        height: 45
    },
})

export default ActionButton