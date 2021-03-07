import React, { useState } from 'react';
import { FAB } from 'react-native-paper'

const Fab = ({ bgColor, setShow, setShowDatePicker }) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const openModalDate = () => setShow(true)
    const openCalendar = () => setShowDatePicker(true)

    return (
        <FAB.Group
            open={open}
            icon={open ? 'close' : 'calendar-search'}
            color='#FFF'
            fabStyle={bgColor}
            actions={[
                {
                    icon: 'calendar',
                    label: 'Data específica',
                    onPress: () => openCalendar(),
                },
                {
                    icon: 'magnify',
                    label: 'Busca avançada',
                    onPress: () => openModalDate(),
                    small: false,
                },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
                if (open) {
                }
            }}
        />
    );
}

export default Fab