import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper';

import {
    Container, Title, HeaderMovements, MilkMovements, CashMovements, TextMoviments,
    PeriodTitle, PeriodBox, PeriodItem, PeriodText, MilkMovementsBottom, CashMovementsBottom
} from '../../pages/TankDetails/Movements/styles'

const DairyMovements = ({ data }) => {

    return (
        <Container>
            <Title>Dados das Retiradas</Title>
            <Divider style={styles.divider} />

            <HeaderMovements>

                <MilkMovements style={{ backgroundColor: '#da1e37' }}>
                    <TextMoviments>Retiradas</TextMoviments>
                    <Icon name='basket-unfill' size={25} color='#FFF' />
                </MilkMovements>

                <CashMovements>
                    <TextMoviments>Receta</TextMoviments>
                    <Icon name='currency-usd' size={25} color='#FFF' />
                </CashMovements>

            </HeaderMovements>

            <PeriodTitle>Total dos últimos 5 dias</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>30 litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>R$ 450</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Total dos últimos 15 dias</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>30 litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>R$ 450</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Total dos últimos 30 dias</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>30 litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>R$ 450</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <PeriodTitle>Total geral do laticínio</PeriodTitle>
            <Divider style={styles.periodDivider} />
            <PeriodBox>
                <PeriodItem>
                    <PeriodText>30 litros</PeriodText>
                </PeriodItem>
                <Divider style={styles.dividerV} />
                <PeriodItem>
                    <PeriodText>R$ 450</PeriodText>
                </PeriodItem>
            </PeriodBox>
            <Divider style={styles.periodDivider} />

            <HeaderMovements>
                <MilkMovementsBottom style={{ backgroundColor: '#da1e37' }}>
                </MilkMovementsBottom>
                <CashMovementsBottom>
                </CashMovementsBottom>
            </HeaderMovements>
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

export default DairyMovements