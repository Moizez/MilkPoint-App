import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, StyleSheet } from 'react-native'

export default function Picker({ onChange, title, dataItem, sizePicker }) {

    const [valor, setValor] = useState()
    const cor = valor ? '#95d5b2' : '#FFF'

    return (
        <View style={{
            ...styles.container,
            backgroundColor: cor, width: sizePicker ? sizePicker : '45%',
        }}>
            <RNPickerSelect
                placeholder={title}
                style={pickerStyle}
                onValueChange={(value) => {
                    onChange(value)
                    setValor(value)
                }}
                items={dataItem}
            />
        </View>
    )
}
const pickerStyle = {
    inputAndroid: {
        color: '#000',
    },
    placeholderColor: '#FFF',
};

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        height: 45,
    }
})