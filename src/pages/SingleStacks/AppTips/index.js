import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import ActionButton from '../../../components/ActionButton'
import { AuthContext } from '../../../contexts/auth'

const AppTips = () => {

    const { user } = useContext(AuthContext)
    const navigation = useNavigation()

    const [isExpandFunctions, setExpandFunctions] = useState(false)
    const [isExpandHome, setExpandHome] = useState(false)
    const [isExpandSecondScreen, setExpandSecondScreen] = useState(false)
    const [isExpandThirdScreen, setExpandThirdScreen] = useState(false)
    const [isExpandFourthScreen, setExpandFourthScreen] = useState(false)
    const [observation, setExpandObservation] = useState(false)

    const changeTitleOne = () => {
        if (user.perfil === 1 || user.perfil === 2) return 'Tela de Depósitos Pendentes'
        else if (user.perfil === 3) return 'Tela de Retiradas Pendentes'
        else return 'Tela de Produtores'
    }

    const changeTitleTwo = () => {
        if (user.perfil === 1 || user.perfil === 3) return 'Tela de Histórico'
        else if (user.perfil === 2) return 'Tela de Retiradas Pendentes'
        else return 'Tela de Laticínios'
    }

    const renderDefaultFunctions = () => {
        return (
            <View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar na foto do perfil é possível ver detalhes do usuário logado;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Em cada tela é possível arrastar e soltar para atualizar as listas exibidas
                    como tanques, depósitos e retiradas pendentes, histórico e etc;
                        </Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar e segurar em cima de um tanque é possível ver detalhes como
                    características, localização, abrir o mapa para ver como chegar até o tanque e as movimentações das transações dos últimos 15 dias,
                    30 dias ou desde a criação do tanque;
                        </Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Com exceção do técnico, todos os outros usuários poderão listar as transações na tela de histórico por
                        uma data especifica, clicando no ícone do calendário que fica no canto superior direito da lista de transações;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Os depósitos e retiradas terão três tipos de status: confirmado {<Icon name='bucket' color='#2a9d8f' size={20} />}, cancelado {<Icon name='bucket' color='#da1e37' size={20} />} e
                                pendente {<Icon name='bucket' color='#6c757d' size={20} />}.</Text>
                </View>
            </View>
        )
    }

    //Informações da home de cada perfil
    const renderHome = () => {
        if (user.perfil === 1) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listados os tanques ativos e que poderão ser realizados depósitos pelo produtor;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no tanque é possível solicitar um depósito (em litros);</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar e segurar no tanque é possível ver os detalhes do tanque;</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 3) {
            return (<View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Aqui são listados os tanques ativos e que poderão ser realizadas retiradas pelo laticínio;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar no tanque é possível solicitar uma retirada com o valor total do tanque ou parcial (em litros);</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar e segurar no tanque é possível ver os detalhes do tanque;</Text>
                </View>
            </View>
            )
        } else if (user.perfil === 2) {
            return (<View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Aqui é mostrado o tanque administrado pelo responsável logado;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar no tanque é possível ver os detalhes do mesmo;</Text>
                </View>
            </View>
            )
        } else if (user.perfil === 4) {
            return (<View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Aqui são mostrados inicialmente a lista de tanques ativos, podendo também exibir os inatívos a partir da seleção de listagem;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar no tanque é possível ver sua localização no mapa;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar em cima de um tanque e arrastar para a esquerda surgirá a opção de ativar ou inativar o tanque, a opção muda dependendo de qual listagem está sendo exibida. Ex: lista de tanques ativos, ao arrastar mostrará a opção de inativar, já o inverso mostrará a opção de ativar;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar e segurar no tanque é possível ver os detalhes do tanque;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao clicar no botão flutuante com o ícone de menu (formato de linhas tracejadas), será aberto as opções de listar por tanques ativos, tanques inativos e criar um tanque;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Para a criação do tanque será obrigatório fornecer um nome, tipo do leite, capacidade, o responsável e selecionar o exato local do tanque no mapa;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Para a edição do tanque a obrigatoriedade são as mesmas dos atributos para criar o tanque, porém esses dados já virão previamente preenchidos;</Text>
                </View>
            </View>
            )
        }
    }

    const renderSecondScreen = () => {
        if (user.perfil === 1) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listadas as solicitações de depósito do produtor;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do depósito é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone do balde com o nome “pendente”, é possível realizar o cancelamento desta solicitação;</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 3) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listadas as solicitações de retiradas do laticínio;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” da retirada é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone do balde com o nome “pendente”, é possível realizar o cancelamento desta solicitação;</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 2) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listadas as solicitações de depósitos do produtor;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do depósito é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone do balde com o nome “pendente”, é possível recusar a solicitação ou confirmá-la;</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 4) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listados os produtores cadastrados;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do produtor é possível ver mais detalhes;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar para ver mais detalhes é aberta a opção de ativar ou desativar o produtor;</Text>
                    </View>
                </View>
            )
        }
    }

    const renderThirdScreen = () => {
        if (user.perfil === 1) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui é listado o histórico de solicitações, que inicialmente serão mostradas as transações do dia onde são exibidos os depósitos resolvidos (confirmados ou cancelados);</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do depósito resolvido é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no botão flutuante com o ícone de lupa, será aberto opções como listar por transações confirmadas, por transações canceladas e a opção de realizar uma busca avançada;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Na opção de busca avançada os depósitos resolvidos poderão ser filtrados pelos últimos 15 dias, 30 dias ou por uma data inicial selecionada pelo usuário até o presente dia. Ex: de 07/03/2020 até o dia atual;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ainda na opção de busca avançada é possível buscar um depósito pelo seu valor solicitado (em litros);</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 3) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui é listado o histórico de solicitações, que inicialmente serão mostradas as transações do dia onde são exibidas as retiradas resolvidas (confirmadas ou canceladas);</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” da retirada resolvida é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no botão flutuante com o ícone de lupa, será aberto opções como listar por transações confirmadas, por transações canceladas e a opção de realizar uma busca avançada;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Na opção de busca avançada as retiradas resolvidas poderão ser filtradas pelos últimos 15 dias, 30 dias ou por uma data inicial selecionada pelo usuário até o presente dia. Ex: de 07/03/2020 até o dia atual;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ainda na opção de busca avançada é possível buscar uma retirada pelo seu valor solicitado (em litros);</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 2) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listadas as solicitações de retiradas do laticínio;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” da retirada é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone do balde com o nome “pendente”, é possível recusar a solicitação ou confirma-la;</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 4) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listados os laticínios cadastrados;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do laticínio é possível ver mais detalhes;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar para ver mais detalhes é aberta a opção de ativar ou desativar o laticínio;</Text>
                    </View>
                </View>
            )
        }
    }

    const renderFourthScreen = () => {
        if (user.perfil === 2) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui é listado o histórico de solicitações, que inicialmente serão mostradas as transações de depósito do dia onde são exibidos os depósitos resolvidos (confirmados ou cancelados), mas podendo também ser exibidas as retiradas resolvidas selecionando a listagem por retirada;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do depósito resolvido ou da retirada resolvida é possível ver mais detalhes da solicitação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no botão flutuante com o ícone de lupa, será aberto opções como listar por depósitos resolvidos ou retiradas resolvidas além da opção de busca avançada;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Na opção de busca avançada o usuário deverá decidir por qual recurso ele quer buscar entre depósitos ou retiradas, ao selecionar uma das duas será ofertado os filtros de listagem por transações dos últimos 15 dias, 30 dias ou por uma data inicial selecionada pelo usuário até o presente dia. Ex: de 07/03/2020 até o dia atual;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ainda na opção de busca avançada é possível buscar um depósito pelo nome do produtor, caso a opção depósitos tenha sido a escolhida, ou buscar pelo nome do laticínio ou da sua empresa, desde que a opção de retirada tenha sido a selecionado como recurso anteriormente;</Text>
                    </View>
                </View>
            )
        } else if (user.perfil === 4) {
            return (
                <View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Aqui são listados os responsáveis cadastrados;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no ícone “+” do responsável é possível ver mais detalhes;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar liara ver mais detalhes é aberta a opção de ativar ou desativar o responsável;</Text>
                    </View>
                </View>
            )
        }
    }

    const renderObservation = () => {
        return (
            <View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Ao utilizarem o perfil do técnico e executarem a ação de desativar um tanque, antes de sair do perfil é recomendado ativar novamente, pois se todos os tanques forem desativados eles não serão vistos pelos outros usuários nos perfis de produtor, laticínio e responsável;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Para não haver problemas durante os testes a função ativar e desativar usuários não terá consequências;</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Icon name='triangle-right' color='#000' size={25} />
                    <Text style={styles.texto}>Também para não haver problemas, não é permitido editar usuários nem senhas;</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Informações Importantes</Text>
            </View>

            <ScrollView style={styles.containerInfo} showsVerticalScrollIndicator={false}>

                <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandFunctions(!isExpandFunctions)}>
                    <Text style={styles.btnText}>Funcionalidades Padrões</Text>
                    <Icon name={isExpandFunctions ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                {isExpandFunctions && renderDefaultFunctions()}

                <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandHome(!isExpandHome)}>
                    <Text style={styles.btnText}>Tela Inicial</Text>
                    <Icon name={isExpandHome ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                {isExpandHome && renderHome()}

                <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandSecondScreen(!isExpandSecondScreen)}>
                    <Text style={styles.btnText}>{changeTitleOne()}</Text>
                    <Icon name={isExpandSecondScreen ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                {isExpandSecondScreen && renderSecondScreen()}

                <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandThirdScreen(!isExpandThirdScreen)}>
                    <Text style={styles.btnText}>{changeTitleTwo()}</Text>
                    <Icon name={isExpandThirdScreen ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                {isExpandThirdScreen && renderThirdScreen()}

                {user.perfil === 2 &&
                    <>
                        <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandFourthScreen(!isExpandFourthScreen)}>
                            <Text style={styles.btnText}>Tela de Histórico</Text>
                            <Icon name={isExpandFourthScreen ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                        </TouchableOpacity>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                    </>
                }

                {user.perfil === 4 &&
                    <>
                        <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandFourthScreen(!isExpandFourthScreen)}>
                            <Text style={styles.btnText}>Tela de Responsáveis</Text>
                            <Icon name={isExpandFourthScreen ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                        </TouchableOpacity>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                    </>
                }

                {isExpandFourthScreen && renderFourthScreen()}

                <TouchableOpacity style={styles.btnStyle} activeOpacity={0.7} onPress={() => setExpandObservation(!observation)}>
                    <Text style={styles.btnText}>Observações</Text>
                    <Icon name={observation ? 'triangle-down' : 'triangle-right'} size={30} color='#000' />
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                {observation && renderObservation()}

            </ScrollView>

            <ActionButton
                onAction={() => navigation.goBack()}
                btnColor='#292b2c'
                title='Fechar'
                btnSize='100%'
                btnAlign='center'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',
        borderRadius: 5,
        marginBottom: 3
    },
    containerInfo: {
        flex: 1,
        width: 358,
        backgroundColor: '#FFF',
        borderRadius: 3
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        marginHorizontal: 10,
        backgroundColor: '#ececec',
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    titulo: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center'
    },
    texto: {
        fontSize: 16,
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 3
    },
    btnStyle: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 55
    }
})

export default AppTips