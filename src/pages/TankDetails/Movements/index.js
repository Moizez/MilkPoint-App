import React, { useContext } from 'react';

import ProducerMovements from '../../../components/ProducerMovements'
import DairyMovements from '../../../components/DairyMovements'
import { AuthContext } from '../../../contexts/auth'

import { MainContainer } from './styles'

const Movements = ({ data }) => {

    const { user } = useContext(AuthContext)

    if (user.perfil === 1) {
        return (<ProducerMovements data={data} />)
    } else if (user.perfil === 3) {
        return (<DairyMovements data={data} />)
    } else return (
        <MainContainer showsVerticalScrollIndicator={false}>
            <ProducerMovements data={data} />
            <DairyMovements data={data} />
        </MainContainer>
    )
}

export default Movements