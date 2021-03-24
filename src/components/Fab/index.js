import React, { useState, Fragment } from 'react';
import { Modal } from 'react-native'
import { FAB } from 'react-native-paper'

import DateModal from '../Modals/DateModal'

const Fab = ({
    setShowDatePicker, filterByQuantityLiters, filterByLast15Days,
    filterByLast30Days, filterByTwoDates, setLoading, openWarning, type
}) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [iconType, setIconType] = useState('calendar-search')
    const [iconColor, setIconColor] = useState(type ? '#2a9d8f' : '#dd2c2f')
    const [dateModal, setDateModal] = useState(false)

    const openCalendar = () => setShowDatePicker(true)
    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    const changeIconStyles = (icon, color) => {
        setIconType(icon)
        setIconColor(color)
    }

    return (
        <Fragment>
            <FAB.Group
                open={open}
                icon={open ? 'close' : iconType}
                color='#FFF'
                fabStyle={{ backgroundColor: iconColor }}
                actions={[
                    {
                        icon: 'calendar-check',
                        label: 'Data específica',
                        onPress: () => {
                            openCalendar()
                            changeIconStyles('calendar-check', '#2a9d8f')
                        },
                    },
                    {
                        icon: 'magnify',
                        label: 'Busca avançada',
                        onPress: () => openDateModal(),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    }
                }}
            />

            <Modal
                transparent={true}
                visible={dateModal}
                animationType='slide'
            >
                <DateModal
                    closeModal={closeDateModal}
                    filterByQuantityLiters={filterByQuantityLiters}
                    filterByLast15Days={filterByLast15Days}
                    filterByLast30Days={filterByLast30Days}
                    filterByTwoDates={filterByTwoDates}
                    isLoading={setLoading}
                    openWarning={openWarning}
                    changeIconStyles={changeIconStyles}
                />
            </Modal>
        </Fragment>
    );
}

const FabGroup = ({
    setShowDatePicker, changeStatus, filterByName, filterByLast15Days, filterByLast30Days,
    filterByTwoDates, setLoading, openWarning, type
}) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [iconType, setIconType] = useState('calendar-search')
    const [iconColor, setIconColor] = useState('#e7b705')
    const [dateModal, setDateModal] = useState(false)

    const openCalendar = () => setShowDatePicker(true)
    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    const changeIconStyles = (icon, color) => {
        setIconType(icon)
        setIconColor(color)
    }

    return (
        <Fragment>
            <FAB.Group
                open={open}
                icon={open ? 'close' : iconType}
                color='#FFF'
                fabStyle={{ backgroundColor: iconColor }}
                actions={[
                    {
                        icon: 'delete-circle',
                        label: `Recusad${type ? 'os' : 'as'}`,
                        onPress: () => {
                            changeStatus('cancelados')
                            changeIconStyles('delete-circle', '#cc444b')
                        }
                    },
                    {
                        icon: 'check-circle',
                        label: `Confirmad${type ? 'os' : 'as'}`,
                        onPress: () => {
                            changeStatus('confirmados')
                            changeIconStyles('check-circle', '#2a9d8f')
                        }
                    },
                    {
                        icon: 'calendar-check',
                        label: 'Data específica',
                        onPress: () => {
                            openCalendar()
                            changeIconStyles('calendar-check', '#14213d')
                        }
                    },
                    {
                        icon: 'magnify',
                        label: 'Busca avançada',
                        onPress: () => openDateModal(),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    }
                }}
            />

            <Modal
                transparent={true}
                visible={dateModal}
                animationType='slide'
            >
                <DateModal
                    closeModal={closeDateModal}
                    filterByName={filterByName}
                    filterByLast15Days={filterByLast15Days}
                    filterByLast30Days={filterByLast30Days}
                    filterByTwoDates={filterByTwoDates}
                    isLoading={setLoading}
                    openWarning={openWarning}
                    changeIconStyles={changeIconStyles}
                />
            </Modal>
        </Fragment>
    );

}

export { Fab, FabGroup }

