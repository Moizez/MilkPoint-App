import React, { useState } from 'react';
import { FAB } from 'react-native-paper'

const Fab = ({ bgColor, openModal, setShowDatePicker }) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

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
                    onPress: () => openModal(),
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

const FabGroup = ({ bgColor, openModal, setShowDatePicker, changeStatus }) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const openCalendar = () => setShowDatePicker(true)

    return (
        <FAB.Group
            open={open}
            icon={open ? 'close' : 'calendar-search'}
            color='#FFF'
            fabStyle={bgColor}
            actions={[
                {
                    icon: 'delete',
                    label: 'Recusados',
                    onPress: () => changeStatus('cancelados'),
                },
                {
                    icon: 'check-circle',
                    label: 'Confirmados',
                    onPress: () => changeStatus('confirmados'),
                },
                {
                    icon: 'calendar',
                    label: 'Data específica',
                    onPress: () => openCalendar(),
                },
                {
                    icon: 'magnify',
                    label: 'Busca avançada',
                    onPress: () => openModal(),
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

export { Fab, FabGroup }

