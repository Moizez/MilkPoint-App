import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

export default function ModalCreateTanque({ onClose }) {

    const latitude = '-6.0083867'
    const longitude = '-38.3784437'

    const showLatLon = () => {

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.titleInput }}>Latitude</Text>
                    <Text style={{ ...styles.titleInput }}>Longitude</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ backgroundColor: '#DDD', height: 30, width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.fontLocal}>{latitude}</Text>
                    </View>
                    <View style={{ backgroundColor: '#DDD', height: 30, width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.fontLocal}>{longitude}</Text>
                    </View>
                </View>
            </View>
        )

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Cadastro de Tanque</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Características</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Nome:</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Ex: T-1000"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.titleInput }}>Capacidade</Text>
                    <Text style={{ ...styles.titleInput }}>Vol. Atual</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.titleInput }}>Data de Criação</Text>
                    <Text style={{ ...styles.titleInput }}>Tipo do Leite</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="10/03/2019"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Caprino"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Responsável:</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Leandro Rêgo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Localização</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.titleInput }}>CEP</Text>
                    <Text style={{ ...styles.titleInput }}>Estado</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Ex: 55555-555"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType='phone-pad'
                        value={null}
                    />
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Ex: CE"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Cidade:</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Nome da cidade"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Bairro:</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Nome do bairro"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Rua/Comunidade:</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Nome da rua ou comunidade"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={null}
                    />
                </View>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Marcar a Localização</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ ...styles.buttonStyle, backgroundColor: '#292b2c', width: '95%', marginTop: 3 }}>
                        <Text style={{ ...styles.fontLocal, color: '#FFF' }}>Abrir o Mapa</Text>
                    </TouchableOpacity>
                </View>

                {showLatLon()}

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }}>
                <TouchableOpacity onPress={onClose} style={{ ...styles.buttonStyle, backgroundColor: '#da1e37' }}>
                    <Text style={styles.fontLocal}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.fontLocal}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 80,
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
        width: '95%',
        height: 45,
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
        textAlign: 'left',
    },
    buttonStyle: {
        backgroundColor: '#2a9d8f',
        height: 45,
        width: '45%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    fontLocal: {
        fontSize: 16,
        color: '#000'
    }
})