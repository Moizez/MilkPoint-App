import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper';

import Api from '../../services/producer.api'
import { AuthContext } from '../../contexts/auth'

import { sumLitersByDate, sumValuesByDate } from '../../components/Helpers'
import Loader from '../../components/Loader'

import {
    Container, Title, HeaderMovements, MilkMovements, CashMovements, TextMoviments,
    PeriodTitle, PeriodBox, PeriodItem, PeriodText, MilkMovementsBottom, CashMovementsBottom
} from '../../pages/TankDetails/Movements/styles'

const ProducerMovements = ({ data }) => {

    const { user } = useContext(AuthContext)

    const [allConfirmed, setAllConfirmed] = useState([])
    const [userConfirmed, setUserConfirmed] = useState([])
    const [loading, setLoading] = useState(false)

    const userData = user.perfil === 1 ? userConfirmed : allConfirmed

    const getAllConfirmed = async () => {
        setLoading(true)
        const response = await Api.getAllDepositsConfirmedOrCanceled('confirmados')
        const result = response.filter(i => i.tanque.responsavel.id === user.id)
        setAllConfirmed(result)
        setLoading(false)
    }

    const getUserConfirmedWithdrawals = async () => {
        setLoading(true)
        const response = await Api.getAllDepositsConfirmedOrCanceledUser('confirmados')
        const result = response.filter(i => i.tanque.id === data.id)
        setUserConfirmed(result)
        setLoading(false)
    }

    useEffect(() => {
        getAllConfirmed()
        getUserConfirmedWithdrawals()
    }, [data])

    return (
        <Container>
            <Title>Dados dos Depósitos</Title>
            <Divider style={styles.divider} />

            <HeaderMovements>

                <MilkMovements>
                    <TextMoviments>Depósitos</TextMoviments>
                    <Icon name='basket-fill' size={25} color='#FFF' />
                </MilkMovements>

                <CashMovements>
                    <TextMoviments>Receita</TextMoviments>
                    <Icon name='currency-usd' size={25} color='#FFF' />
                </CashMovements>

            </HeaderMovements>

            <PeriodTitle>Hoje</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 1, 'days')} litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 1, 'days')}</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Últimos 5 dias</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 5, 'days')} litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 5, 'days')}</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Últimos 15 dias</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 15, 'days')} litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 15, 'days')}</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Últimos 30 dias</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 1, 'month')} litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 1, 'month')}</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Total de depósitos deste ano</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 1, 'year')} litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 1, 'year')}</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <HeaderMovements>
                <MilkMovementsBottom>
                </MilkMovementsBottom>
                <CashMovementsBottom>
                </CashMovementsBottom>
            </HeaderMovements>
            <Divider style={{marginTop: 12}}/>
            {loading && <Loader />}
        </Container>
    );
}

const styles = StyleSheet.create({
    divider: {
        marginVertical: 5, height: 2
    },
    dividerV: {
        width: 0.5, height: '100%'
    },
    periodDivider: {
        marginVertical: 5,
    }
})

export default ProducerMovements