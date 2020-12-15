import React, { useState, useContext, useEffect } from 'react'
import {
    View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Modal, TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import api from '../../../services/api'

import ActionButton from '../../../components/ActionButton'
import { AuthContext } from '../../../contexts/auth'
import Loader from '../../../components/Loader'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'

export default function TelaPerfilLaticinio() {

    const { user, cepUrl, baseUrl } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [userNow, setUserNow] = useState([])
    const [idUser] = useState(user.id)
    const [modalVisible, setModalVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [nomeFantasia, setNomeFantasia] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    //Endereço
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [uf, setUf] = useState('')
    const [complemento, setComplemento] = useState('')
    const [dataLocal, setDataLocal] = useState([])

    let nascimento = moment(user.dataNascimento).locale('pt-br').format('L')
    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    const loadUser = async () => {
        const response = await api.get(`laticinio/${user.id}`)
        const data = response.data
        setNome(data.nome)
        setEmail(data.email)
        setNomeFantasia(data.nomeFantasia)
        setCep(data.cep)
        setBairro(data.bairro)
        setLocalidade(data.localidade)
        setLogradouro(data.logradouro)
        setUf(data.uf)
        setComplemento(data.complemento)
        setUserNow(data)
    }

    useEffect(() => {
        loadUser()
    }, [])

    const buscaCep = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${cepUrl}${cep}/json/`)
            const data = await response.json()
            if (data.erro) {
                setLoading(false)
                setJsonIcon('error')
                setTypeMessage('CEP não encontrado!')
                setAlertVisible(true)
            } else {
                setDataLocal(data)
                setCep(data.cep)
                setLogradouro(data.logradouro)
                setBairro(data.bairro)
                setLocalidade(data.localidade)
                setComplemento(data.complemento)
                setUf(data.uf)
            }
        } catch (_) {
            setLoading(false)
            setJsonIcon('error')
            setTypeMessage('CEP inválido!')
            setAlertVisible(true)
        }
        setLoading(false)
    }

    const updateUser = async (idUser, nome, nomeFantasia, email, cep, localidade, uf, bairro, logradouro, complemento) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = {
            id: idUser,
            nome: nome,
            nomeFantasia: nomeFantasia,
            email: email,
            cep: cep,
            localidade: localidade,
            uf: uf,
            bairro: bairro,
            logradouro: logradouro,
            complemento: complemento
        }

        await fetch(`${baseUrl}laticinio/` + parseInt(idUser),
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
    }

    const handleUpdate = async () => {
        if (nome == '') {
            setJsonIcon('error')
            setTypeMessage('Preencha o nome corretamente!')
            setAlertVisible(true)
        } else {
            setLoading(true)
            await updateUser(
                idUser, nome, nomeFantasia, email, cep, localidade, uf, bairro, logradouro, complemento
            )
            loadUser()
            setModalVisible(false)
            setLoading(false)
        }
    }

    const closeAlertErroSuccess = () => setAlertVisible(false)

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.containerPerfil}
                source={require('../../../assets/images/cover3.png')}
                resizeMode='cover'
            >
                <View style={styles.containerImage}>
                    <ImageBackground
                        style={styles.image}
                        imageStyle={{ borderRadius: 20 }}
                        source={require('../../../assets/images/avatar.jpg')}
                    >
                        <TouchableOpacity style={styles.editPhoto}>
                            <Icon name='camera' color='#FFF' size={18} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </ImageBackground>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Minha Conta</Text>
            </View>
            <ScrollView style={styles.containerCard}>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>DADOS CADASTRAIS</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Nome completo: <Text style={styles.text}>{userNow.nome}</Text></Text>
                    <Text style={styles.textItem}>Nome da empresa: <Text style={styles.text}>{userNow.nomeFantasia}</Text></Text>
                    <Text style={styles.textItem}>E-mail: <Text style={styles.text}>{userNow.email}</Text></Text>
                    <Text style={styles.textItem}>CNPJ: <Text style={styles.text}>{userNow.cnpj}</Text></Text>
                    <Text style={styles.textItem}>Data da fundação: <Text style={styles.text}>{nascimento}</Text></Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>ENDEREÇO</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Estado: <Text style={styles.text}>{userNow.uf}</Text></Text>
                    <Text style={styles.textItem}>Cidade: <Text style={styles.text}>{userNow.localidade}</Text></Text>
                    <Text style={styles.textItem}>CEP: <Text style={styles.text}>{userNow.cep}</Text></Text>
                    <Text style={styles.textItem}>Bairro: <Text style={styles.text}>{userNow.bairro}</Text></Text>
                    <Text style={styles.textItem}>Rua/Comunidade: <Text style={styles.text}>{userNow.logradouro}</Text></Text>
                    <Text style={styles.textItem}>Complemento: <Text style={styles.text}>{userNow.complemento}</Text></Text>
                </View>

                <View style={{ ...styles.cardItem, flexDirection: 'row', justifyContent: 'space-between', marginTop:20 }}>
                    <ActionButton
                        onAction={() => setModalVisible(true)}
                        btnColor='#292b2c'
                        title='Editar Perfil'
                        nameIcon='account-edit'
                        btnSize='100%'
                        btnAlign='center'
                        marginRight={25}
                    />
                </View>
            </ScrollView>

            <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={false}
            >
                <ScrollView style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Editar Laticínio</Text>
                    </View>
                    <View style={styles.body}>

                        <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Dados Cadastrais</Text>
                        <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />

                        <Text style={styles.titleInput}>Proprietário</Text>
                        <View style={styles.boxBody}>
                            <TextInput style={styles.input}
                                placeholder="Ex: T-1000"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                            />
                        </View>

                        <Text style={styles.titleInput}>Empresa/Cooperativa</Text>
                        <View style={styles.boxBody}>
                            <TextInput style={styles.input}
                                placeholder="Nome da empresa ou cooperativa?"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={nomeFantasia}
                                onChangeText={(text) => setNomeFantasia(text)}
                            />
                        </View>

                        <Text style={styles.titleInput}>E-mail</Text>
                        <View style={styles.boxBody}>
                            <TextInput style={{ ...styles.input, color: '#6c757d' }}
                                placeholder="Ex: nome@email.com"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                editable={false}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}> Dados de Endereço</Text>
                        <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />

                        <View style={styles.boxBody}>
                            <Text style={styles.titleInput}>CEP</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput style={{ ...styles.input, width: '80%' }}
                                    placeholder="Ex: 55555-555"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType='phone-pad'
                                    value={cep}
                                    onChangeText={(text) => setCep(text)}
                                />

                                <ActionButton
                                    onAction={() => buscaCep()}
                                    btnColor='#000'
                                    nameIcon='magnify'
                                    colorIcon={'#FFF'}
                                    btnSize={50}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.boxBody, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center', width: '100%' }}>
                                <Text style={{ ...styles.titleInput }}>Cidade</Text>
                                <TextInput style={{ ...styles.input, width: '48%' }}
                                    placeholder="Nome da cidade"
                                    autoCorrect={false}
                                    autoCapitalize="sentences"
                                    value={localidade}
                                    onChangeText={(text) => setLocalidade(text)}
                                />
                            </View>
                            <View style={{ alignItems: 'center', width: '100%', marginLeft: 10 }}>
                                <Text style={{ ...styles.titleInput }}>Estado</Text>
                                <TextInput style={{ ...styles.input, width: '48%' }}
                                    placeholder="Ex: CE"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={dataLocal.uf ? dataLocal.uf : uf}
                                    onChangeText={(text) => setUf(text)}
                                />
                            </View>
                        </View>

                        <Text style={styles.titleInput}>Bairro</Text>
                        <View style={styles.boxBody}>
                            <TextInput style={styles.input}
                                placeholder="Nome do bairro"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={dataLocal.bairro ? dataLocal.bairro : bairro}
                                onChangeText={(text) => setBairro(text)}
                            />
                        </View>

                        <Text style={styles.titleInput}>Rua/Comunidade</Text>
                        <View style={styles.boxBody}>
                            <TextInput style={styles.input}
                                placeholder="Nome da rua"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={dataLocal.logradouro ? dataLocal.logradouro : logradouro}
                                onChangeText={(text) => setLogradouro(text)}
                            />
                        </View>

                        <Text style={styles.titleInput}>Complemento</Text>
                        <View style={styles.boxBody}>
                            <TextInput style={styles.input}
                                placeholder="Alguma referência?"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={dataLocal.complemento ? dataLocal.complemento : complemento}
                                onChangeText={(text) => setComplemento(text)}
                            />
                        </View>

                        <View style={{ ...styles.cardItem, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ActionButton
                                onAction={() => setModalVisible(false)}
                                btnColor='#da1e37'
                                title='Fechar'
                                nameIcon='close-circle'
                            />
                            <ActionButton
                                onAction={() => handleUpdate()}
                                btnColor='#2a9d8f'
                                title='Salvar'
                                nameIcon='content-save'
                            />
                        </View>
                    </View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={alertVisible}
                    >
                        {alertVisible &&
                            <AlertErrorSuccess
                                onClose={closeAlertErroSuccess}
                                message={typeMessage}
                                jsonPath={require('../../../assets/lottie/error-icon.json')}
                                buttonColor={'#292b2c'}
                            />
                        }
                    </Modal>
                    {loading && <Loader />}
                </ScrollView>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    containerPerfil: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitulo: {
        height: 45,
        backgroundColor: '#292b2c',
        justifyContent: 'center'
    },
    containerCard: {
        flex: 1,
        marginHorizontal: 12,
        padding: 8
    },
    containerImage: {
        marginRight: 6,
    },
    image: {
        width: 80,
        height: 80,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    tituloPerfil: {
        color: '#FFF',
        fontStyle: 'italic',
        fontSize: 13
    },
    editPhoto: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 12,
        margin: 4
    },
    titulo: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF'
    },
    tituloItem: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textItem: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    cardItem: {
        flex: 1,
        marginVertical: 5,
    },
    modal: {
        flex: 1
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',
    },
    body: {
        marginVertical: 10,
        paddingHorizontal: 12
    },
    boxBody: {
        marginBottom: 10
    },
    input: {
        backgroundColor: '#d3d3d3',
        fontSize: 16,
        width: '100%',
        height: 45,
        color: '#000',
        padding: 10,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF'
    },
    titleInput: {
        fontSize: 16,
    },
})