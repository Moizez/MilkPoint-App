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

    const [resolvedDeposits, setResolvedDeposits] = useState([])
    const [resolvedWithdrawals, setResolvedWithdrawals] = useState([])

    const [confirmedDeposits, setConfirmedDeposits] = useState([])
    const [canceledDeposits, setCanceledDeposits] = useState([])

    const [confirmedWithdrawals, setConfirmedWithdrawals] = useState([])
    const [canceledWithdrawals, setCanceledWithdrawals] = useState([])

    // Request Técnico
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

    // Request responsável
    const loadResponsibleTank = async () => {
        setLoading(true)
        const response = await ResponsibleApi.getResponsibleTanks()
        setResponsibleTank(response)
        setLoading(false)
    }

    const loadResolvedDeposits = async () => {
        setLoading(true)
        const response = await ResponsibleApi.getAllDepositsOrWithdrawalsResolved('deposito')
        setResolvedDeposits(response)
        setLoading(false)
    }

    const loadResolvedWithdrawals = async () => {
        setLoading(true)
        const response = await ResponsibleApi.getAllDepositsOrWithdrawalsResolved('retirada')
        setResolvedWithdrawals(response)
        setLoading(false)
    }

    // Request produtor
    const loadPendingDepositsProducer = async () => {
        setLoading(true)
        const response = await ProducerApi.getPendingDepositsProducer()
        setPendingDepositsList(response)
        setLoading(false)
    }

    const loadConfirmedDeposits = async () => {
        setLoading(true)
        const response = await ProducerApi.getAllDepositsConfirmedOrCanceledUser('confirmados')
        setConfirmedDeposits(response)
        setLoading(false)
    }

    const loadCanceledDeposits = async () => {
        const response = await ProducerApi.getAllDepositsConfirmedOrCanceledUser('cancelados')
        setCanceledDeposits(response)
    }

    // Request laticínio
    const loadPendingWithdrawalsDairy = async () => {
        setLoading(true)
        const response = await DairyApi.getPendingWithdrawalsDairy()
        setPendingWithdrawalsList(response)
        setLoading(false)
    }

    const loadConfirmedWithdrawals = async () => {
        setLoading(true)
        const response = await DairyApi.getAllWithdrawalsConfirmedOrCanceledUser('confirmados')
        setConfirmedWithdrawals(response)
        setLoading(false)
    }

    const loadCanceledWithdrawals = async () => {
        const response = await DairyApi.getAllWithdrawalsConfirmedOrCanceledUser('cancelados')
        setCanceledWithdrawals(response)
    }

    return (
        <RequestContext.Provider value={{
            loading, setLoading,
            pendingDepositsList, loadPendingDepositsProducer,
            pendingWithdrawalsList, loadPendingWithdrawalsDairy,
            responsibleTank, loadResponsibleTank,
            activeTanks, loadActiveTanks,
            inactiveTanks, loadInactiveTanks,
            resolvedDeposits, loadResolvedDeposits,
            resolvedWithdrawals, loadResolvedWithdrawals,
            confirmedDeposits, loadConfirmedDeposits,
            canceledDeposits, loadCanceledDeposits,
            confirmedWithdrawals, loadConfirmedWithdrawals,
            canceledWithdrawals, loadCanceledWithdrawals
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

