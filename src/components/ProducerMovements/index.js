import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    filterToday, filterTodayByValue, sumLitersByDate, sumValuesByDate
} from '../../components/Helpers'

import {
    Container, Title, HeaderMovements, MilkMovements, CashMovements,
    TextMoviments, PeriodTitle, PeriodBox, PeriodItem, PeriodText,
    MilkMovementsBottom, CashMovementsBottom, DividerH, DividerV
} from '../../pages/TankDetails/Movements/styles'

const ProducerMovements = ({ userData }) => {

    return (
        <Container>
            <Title>Dados dos Depósitos</Title>
            <DividerH />

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
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>
                        {
                            filterToday(userData) === 1 ?
                                filterToday(userData) + ' litro' :
                                filterToday(userData) + ' litros'
                        }
                    </PeriodText>
                </PeriodItem>
                <DividerV />
                <PeriodItem>
                    <PeriodText>{filterTodayByValue(userData)}</PeriodText>
                </PeriodItem>
            </PeriodBox>

            <PeriodTitle>Últimos 5 dias</PeriodTitle>
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 5, 'days')} litros</PeriodText>
                </PeriodItem>
                <DividerV />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 5, 'days')}</PeriodText>
                </PeriodItem>
            </PeriodBox>

            <PeriodTitle>Últimos 15 dias</PeriodTitle>
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 15, 'days')} litros</PeriodText>
                </PeriodItem>
                <DividerV />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 15, 'days')}</PeriodText>
                </PeriodItem>
            </PeriodBox>

            <PeriodTitle>Últimos 30 dias</PeriodTitle>
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 1, 'month')} litros</PeriodText>
                </PeriodItem>
                <DividerV />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 1, 'month')}</PeriodText>
                </PeriodItem>
            </PeriodBox>

            <PeriodTitle>Total de depósitos deste ano</PeriodTitle>
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>{sumLitersByDate(userData, 1, 'year')} litros</PeriodText>
                </PeriodItem>
                <DividerV />
                <PeriodItem>
                    <PeriodText>{sumValuesByDate(userData, 1, 'year')}</PeriodText>
                </PeriodItem>
            </PeriodBox>

            <HeaderMovements>
                <MilkMovementsBottom>
                </MilkMovementsBottom>
                <CashMovementsBottom>
                </CashMovementsBottom>
            </HeaderMovements>
        </Container>
    );
}

export default ProducerMovements