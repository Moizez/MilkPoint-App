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
        const response = await TechnicianApi.getInactiveTanks()
        setInactiveTanks(response)
    }

    const loadResponsibleTank = async () => {
        setLoading(true)
        const response = await ResponsibleApi.getResponsibleTanks()
        setResponsibleTank(response)
        setLoading(false)
    }

    const loadPendingDepositsProducer = async () => {
        setLoading(true)
        const response = await ProducerApi.getPendingDepositsProducer()
        setPendingDepositsList(response)
        setLoading(false)
    }

    const loadPendingWithdrawalsDairy = async () => {
        setLoading(true)
        const response = await DairyApi.getPendingWithdrawalsDairy()
        setPendingWithdrawalsList(response)
        setLoading(false)
    }

    return (
        <RequestContext.Provider value={{
            loading,
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

