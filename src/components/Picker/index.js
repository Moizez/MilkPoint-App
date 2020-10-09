import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, StyleSheet } from 'react-native'

export default function Picker({ onChange, title, dataItem }) {

    const [valor, setValor] = useState()
    let cor = valor > 0 ? '#95d5b2' : '#FFF'

    return (
        <View style={{ ...styles.container, backgroundColor: `${cor}` }}>
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        width: '45%',
        height: 45,
        borderRadius: 8
    }
})