import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerView } from './styles';

export default function Picker({ onChange }) {
    return (
        <PickerView>
            <RNPickerSelect
                style={{
                    inputIOS: {
                        height: 50,
                        padding: 5,
                        backgroundColor: '#FFF',
                        fontSize: 16
                    }
                }}
                placeholder={{
                    label: 'Listar por?',
                    color: '#222',
                    value: true,
                }}
                onValueChange={(value) => onChange(value)}
                items={[
                    { label: 'Depositos', value: true, color: 'green' },
                    { label: 'Retiradas', value: false, color: 'red' },
                ]}
            />
        </PickerView>
    )
}