import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native'

import { AuthContext } from '../../../contexts/auth'

export default function ListaLaticinios({ data }) {

    const { baseUrl } = useContext(AuthContext)
    const [isExpand, setExpand] = useState(false)
    const [isAtivo, setAtivo] = useState()
    const [idLat, setIdLat] = useState()

    //Solicitação de retirada pelo laticinio
    const requestStatus = async (status, idLat) => {
        await fetch(`${baseUrl}laticinio` + '/' + parseInt(idLat), {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                status: status,
            })
        })
    }

    const handleStatus = async (value) => {
        setIdLat(data.id)
        await requestStatus(value, idLat)
    }

    const renderInfo = () => {
        return (
            <View style={{ ...styles.infoCard, backgroundColor: '#FFF' }}>
                <Text style={{ ...styles.textInfo, textAlign: 'center', marginBottom: 3 }}>Endereço</Text>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>
                <View style={{ ...styles.infoCard, backgroundColor: '#FFF' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>Rua</Text>
                            <Text style={styles.text}>{data.logradouro}</Text>
                        </View>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>Bairro</Text>
                            <Text style={styles.text}>{data.bairro}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>Cidade</Text>
                            <Text style={styles.text}>{data.localidade}</Text>
                        </View>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>CEP</Text>
                            <Text style={styles.text}>{data.cep}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flex: 0.3, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>Estado</Text>
                            <Text style={styles.text}>{data.uf}</Text>
                        </View>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>Complemento</Text>
                            <Text style={styles.text}>{data.complemento}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textInfo}>Situação do laticínio: </Text>
                        <Switch
                            value={isAtivo}
                            thumbColor={isAtivo ? "#2a9d8f" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#b7e4c7" }}
                            onValueChange={value => {
                                setAtivo(value)
                                handleStatus(value)
                            }}
                        />
                        <Text style={{ ...styles.textInfo, marginLeft: 8, fontWeight: 'normal' }}>{isAtivo ? 'ATIVO' : 'INATIVO'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={() => setExpand(!isExpand)} activeOpacity={1} style={styles.infoCard}>
                    <Text style={styles.textInfo}>Nome: <Text style={styles.text}>{data.nome}</Text></Text>
                    <Text style={styles.textInfo}>Empresa: <Text style={styles.text}>{data.nomeFantasia}</Text></Text>
                    <Text style={styles.textInfo}>E-mail: <Text style={styles.text}>{data.email}</Text></Text>
                </TouchableOpacity>
                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar}
                        source={require('../../../assets/images/avatar.jpg')}
                        resizeMode='cover'
                    ></Image>
                </View>
            </View>

            <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

            {isExpand && renderInfo()}
            {isExpand && <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>}

            <TouchableOpacity style={styles.buttonColapse} onPress={() => setExpand(!isExpand)}>
                <Text style={styles.textColapse}>{isExpand ? '-' : '+'}</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        margin: 12,
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
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    infoCard: {
        flex: 1.5,
        backgroundColor: '#faf9f9',
        justifyContent: 'center',
        padding: 6,
    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 14.5,
    },
    text: {
        fontWeight: 'normal'
    },
    avatarContainer: {
        flex: 0.4,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 5,
    },
    buttonColapse: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f3ee',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    textColapse: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
})