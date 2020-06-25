import React, { useState } from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ dataPicker }) {

    const [diaItem, mesItem, anoItem] = dataPicker.split('/');
    const dateNow = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    return (
        <DateTimePicker
            value={dateNow}
            mode="date"
            display="default"
            onChange={(e, d) => {
                const currentDate = d || dateNow;
                setDateNow(currentDate);
            }}
            style={{ backgroundColor: '#FFF' }}
        />
    );
}