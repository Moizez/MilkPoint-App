import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

export default function ModalCreateTanque({onClose}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Cadastro de Tanque</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.titleInput}>Nome:</Text>
                <TextInput style={styles.input}
                    placeholder="Ex: T-1000"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={null}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titleInput}>Capacidade</Text>
                    <Text style={styles.titleInput}>Vol. Atual</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Em litros"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Em litros"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={onClose}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',
    },
    inputContainer: {
        padding: 8,
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.20)',
        fontSize: 16,
        width: '90%',
        color: '#000',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF'
    },
    titleInput: {
        fontSize: 16,
        textAlign: 'left'
    }
})