import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'

const DatePicker = ({ chosenDate, onSet, display }) => {

    const [date, setDate] = useState(new Date(chosenDate));

    return (
        <DateTimePicker
            locale='pt-BR'
            value={date}
            mode="date"
            maximumDate={new Date()}
            display={display}
            onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date
                if (event.type == "set") {
                    setDate(currentDate)
                    onSet(currentDate)
                }else {
                    onSet(null)
                }
            }}
            style={{ backgroundColor: '#FFF' }}
        />
    );
}

export default DatePicker

