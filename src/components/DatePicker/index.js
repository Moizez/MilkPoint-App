import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'

const DatePicker = ({ chosenDate, onChange, display }) => {

    const [date, setDate] = useState(new Date(chosenDate));

    return (
        <DateTimePicker
            locale='pt-BR'
            value={date}
            mode="date"
            maximumDate={new Date()}
            display={display}
            onChange={(_, selectedDate) => {
                const currentDate = selectedDate || date
                setDate(currentDate)
                onChange(currentDate)
            }}
            style={{ backgroundColor: '#FFF' }}
        />
    );
}

export default DatePicker

