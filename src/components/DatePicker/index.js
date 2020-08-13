import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, onChange, display }) {

    const [dateNow, setDateNow] = useState(new Date(date));

    return (
        <DateTimePicker
            value={dateNow}
            mode="date"
            display={display}
            onChange={(_, selectedDate) => {
                const currentDate = selectedDate || dateNow
                setDateNow(currentDate)
                onChange(currentDate)
            }}
            style={{ backgroundColor: '#FFF' }}
        />
    );
}

