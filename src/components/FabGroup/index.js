import React, { useState, Fragment } from 'react'
import FAB from 'react-native-paper/lib/module/components/FAB/FABGroup'
import { Modal } from 'react-native'

import DateModal from '../Modals/DateModal'

const FabGroup = ({
    setShowDatePicker, changeStatus, filterByName, filterByLast15Days,
    filterByLast30Days, filterByTwoDates, openWarning, type, iconColor
}) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [dateModal, setDateModal] = useState(false)

    const openCalendar = () => setShowDatePicker(true)
    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    return (
        <Fragment>
            <FAB
                open={open}
                icon={open ? 'close' : 'magnify'}
                color='#FFF'
                fabStyle={{ backgroundColor: iconColor}}
                actions={[
                    {
                        icon: 'delete-circle',
                        label: `Recusad${type ? 'os' : 'as'}`,
                        onPress: () => {
                            changeStatus('cancelados')
                        }
                    },
                    {
                        icon: 'check-circle',
                        label: `Confirmad${type ? 'os' : 'as'}`,
                        onPress: () => {
                            changeStatus('confirmados')
                        }
                    },
                    {
                        icon: 'calendar',
                        label: 'Data específica',
                        onPress: () => {
                            openCalendar()
                        }
                    },
                    {
                        icon: 'calendar-search',
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
                    openWarning={openWarning}
                />
            </Modal>
        </Fragment>
    );
}

export default FabGroup