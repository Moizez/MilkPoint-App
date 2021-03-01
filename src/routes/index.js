import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth'

import AuthRoutes from './AuthRoutes'
import AppRoutes from './AppRoutes'
import LoadScreen from '../components/LoadScreen'

const Routes = () => {

    const { signed, loading } = useContext(AuthContext)
    const [time, setTime] = useState(true)

    setTimeout(() => {
        setTime(loading)
    }, 2500)

    if (time) {
        return (<LoadScreen msg='ABRINDO' />)
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}


export default Routes