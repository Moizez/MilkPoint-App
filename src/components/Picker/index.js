import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, StyleSheet } from 'react-native'

export default function Picker({ onChange, title, dataItem }) {

    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={title}
                onValueChange={(value) => onChange(value)}
                items={dataItem}
            />
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        height: 45,
        borderRadius: 8
    }
})