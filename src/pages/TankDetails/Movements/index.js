import React, { useContext } from 'react';

import ProducerMovements from '../../../components/ProducerMovements'
import DairyMovements from '../../../components/DairyMovements'
import { AuthContext } from '../../../contexts/auth'

import { MainContainer } from './styles'

const Movements = ({ userDepositData, userWithdrawalData }) => {

    const { user } = useContext(AuthContext)

    if (user.perfil === 1) {
        return (<ProducerMovements userData={userDepositData} />)
    } else if (user.perfil === 3) {
        return (<DairyMovements userData={userWithdrawalData} />)
    } else return (
        <MainContainer showsVerticalScrollIndicator={false}>
            <ProducerMovements userData={userDepositData} />
            <DairyMovements userData={userWithdrawalData} />
        </MainContainer>
    )
}

export default Movements