import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

const ModalInfo = ({ onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerModal}>
                <View style={styles.headerModal}>
                    <Text style={styles.titulo}>Informações Importantes</Text>
                </View>
                <ScrollView style={styles.containerInfo}>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Ao clicar no card do tanque, abrirá uma nova tela com detalhes
                                sobre ele e a opção de realizar um depósito ou retirada;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Nas telas dos tanques, dos depósitos e retiradas pendentes
                        e no histórico, basta clicar no topo da lista e arrastar para
                                baixo para atualizar;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>O ícone do calendário permite filtrar a exibição de depósitos
                                e retiradas a partir da data em que foi realizada a ação;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Para cancelar um depósito ou retirada, basta clicar por alguns segundos
                                sobre o ícone na tela de dependentes e confirmar o cancelamento;</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Icon name='triangle-right' color='#000' size={25} />
                        <Text style={styles.texto}>Os depósitos e retiradas terão três tipos de status: confirmado {<Icon name='bucket' color='#2a9d8f' size={20} />}, cancelado {<Icon name='bucket' color='#da1e37' size={20} />} e
                                pendente {<Icon name='bucket' color='#6c757d' size={20} />}.</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.titulo}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerModal: {
        height: '90%',
        width: '90%',
    },
    headerModal: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    containerInfo: {
        flex: 1,
        backgroundColor: '#FFF',
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
    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#292b2c',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center'
    },
    texto: {
        fontSize: 16,
    }
})

export default ModalInfo