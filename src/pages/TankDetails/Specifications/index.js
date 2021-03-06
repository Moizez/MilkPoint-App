import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import moment from 'moment'
import 'moment/locale/pt-br'

import ActionButton from '../../../components/ActionButton'

import { Container, TechnicalBox, LocalizationBox, Title, BoldText, Text } from './styles'

const Specifications = ({ data }) => {

    const navigation = useNavigation()

    let capacidade = data.qtdAtual + data.qtdRestante
    let tipo = data.tipo == 'BOVINO' ? 'Bovino' : 'Caprino'
    let criacao = moment(data.dataCriacao).locale('pt-br').format('L')

    return (
        <Container>

            <TechnicalBox>

                <Title>Informações Técnicas</Title>

                <Divider style={styles.divider} />

                <BoldText>Capacidade: <Text>{capacidade} litros</Text></BoldText>
                <BoldText>Volume atual: <Text>{data.qtdAtual} litros</Text></BoldText>
                <BoldText>Cabem: <Text>{data.qtdRestante} litros</Text></BoldText>
                <BoldText>Tipo do leite: <Text>{tipo}</Text></BoldText>
                <BoldText>Data da instalação: <Text>{criacao}</Text></BoldText>
                <BoldText>Atual responsável: <Text>{data.responsavel.nome}</Text></BoldText>
                {data.status ? <BoldText>Situação: <Text>Ativo</Text></BoldText> :
                    <BoldText>Situação: <Text>Inativo ({data.observacao})</Text></BoldText>
                }

            </TechnicalBox>

            <LocalizationBox>

                <Title>Localização</Title>

                <Divider style={styles.divider} />

                <BoldText>Estado: <Text>{data.uf}</Text></BoldText>
                <BoldText>Cidade: <Text>{data.localidade}</Text></BoldText>
                <BoldText>CEP: <Text>{data.cep}</Text></BoldText>
                <BoldText>Bairro/Comunidade: <Text>{data.bairro}</Text></BoldText>
                <BoldText>Rua: <Text>{data.logradouro}</Text></BoldText>
                {data.complemento ? <BoldText>Complemento: <Text>{data.complemento}</Text></BoldText> :
                    <BoldText>Complemento: <Text>Não informou</Text></BoldText>
                }
                {data.complemento != '' && <BoldText>Complemento: <Text>{data.complemento}</Text></BoldText>}

            </LocalizationBox>

            <ActionButton
                onAction={() => navigation.navigate('RouteMap')}
                btnColor='#292b2c'
                nameIcon='google-maps'
                btnSize={'100%'}
                btnAlign={'center'}
                title='Como chegar?'
                marginRight={30}
            />

        </Container>
    );
}

const styles = StyleSheet.create({
    divider: {
        marginVertical: 5, height: 2
    }
})

export default Specifications