import React, { useContext } from 'react';

import { AuthContext } from '../contexts/auth'

//Roles import
import Producer from '../roles/Producer'
import Dairy from '../roles/Dairy'
import Responsible from '../roles/Responsible'
import Technician from '../roles/Technician'

const AppRoutes = () => {

    const { user } = useContext(AuthContext)

    if (user.perfil === 1) {
        return (<Producer />)
    } else if (user.perfil === 2) {
        return (<Responsible />)
    } else if (user.perfil === 3) {
        return (<Dairy />)
    } else {
        return (<Technician />)
    }
}

export default AppRoutes
