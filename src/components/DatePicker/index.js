import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, onChange }) {

    const [dateNow, setDateNow] = useState(new Date(date));

    return (
        <DateTimePicker
            value={dateNow}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
                const currentDate = selectedDate || dateNow
                setDateNow(currentDate)
                onChange(currentDate)
            }}
            style={{ backgroundColor: '#FFF' }}
        />
    );
}

