import React, { useState, createContext } from 'react';

import ProducerApi from '../services/producer.api'
import DairyApi from '../services/dairy.api'
import ResponsibleApi from '../services/responsable.api'
import TechnicianApi from '../services/technician.api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [pendingDepositsList, setPendingDepositsList] = useState([])
    const [pendingWithdrawalsList, setPendingWithdrawalsList] = useState([])
    const [responsibleTank, setResponsibleTank] = useState([])
    const [activeTanks, setActiveTanks] = useState([])
    const [inactiveTanks, setInactiveTanks] = useState([])

    const loadActiveTanks = async () => {
        setLoading(true)
        const response = await TechnicianApi.getActiveTanks()
        setActiveTanks(response)
        setLoading(false)
    }

    const loadInactiveTanks = async () => {
        setLoading(true)
        const response = await TechnicianApi.getInactiveTanks()
        setInactiveTanks(response)
        setLoading(false)
    }

    const loadResponsibleTank = async () => {
        const response = await ResponsibleApi.getResponsibleTanks()
        setResponsibleTank(response)
    }

    const loadPendingDepositsProducer = async () => {
        const response = await ProducerApi.getPendingDepositsProducer()
        setPendingDepositsList(response)
    }

    const loadPendingWithdrawalsDairy = async () => {
        const response = await DairyApi.getPendingWithdrawalsDairy()
        setPendingWithdrawalsList(response)
    }

    return (
        <RequestContext.Provider value={{
            loading, setLoading,
            pendingDepositsList, loadPendingDepositsProducer,
            pendingWithdrawalsList, loadPendingWithdrawalsDairy,
            responsibleTank, loadResponsibleTank,
            activeTanks, loadActiveTanks,
            inactiveTanks, loadInactiveTanks
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

