import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, PermissionsAndroid, Image, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Modal } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import moment from 'moment'
import 'moment/locale/pt-br'

import PickerView from '../Picker'
import DatePicker from '../DatePicker'
import { AuthContext } from '../../contexts/auth'
import AlertErrorSuccess from '../AlertErrorSuccess'

export default function ModalCreateTanque({
    onCloseModal, showAlertErroSuccess, onRefreshList
}) {

    let pinCow = require('../../assets/images/pin-cow.png')
    let pinGoat = require('../../assets/images/pin-goat.png')

    const { baseUrl, cepUrl, loadListResponsaveis, responsavel } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [nome, setNome] = useState('')
    const [capacidade, setCapacidade] = useState(null)
    const [qtdAtual, setQtdAtual] = useState(0)
    const [dataCriacao, setDataCriacao] = useState(new Date())
    const [tipo, setTipo] = useState(0)
    const [responsavelId, setResponsavelId] = useState()
    const [status, setStatus] = useState()
    const [isEnabled, setIsEnabled] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [valorCap, setValorCap] = useState(0)
    const [respList, setRespList] = useState([])

    //Endereço
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [uf, setUf] = useState('')
    const [findCep, setFindCep] = useState('')
    const [dataLocal, setDataLocal] = useState([])

    //Map
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        error: null
    })

    const buscaCep = async () => {
        const response = await fetch(`${cepUrl}${findCep}/json/`)
        const data = await response.json()
        setDataLocal(data)
        setCep(data.cep)
        setLogradouro(data.logradouro)
        setBairro(data.bairro)
        setLocalidade(data.localidade)
        setUf(data.uf)
    }

    const getLocal = (event) => {
        setLat(event.nativeEvent.coordinate.latitude)
        setLong(event.nativeEvent.coordinate.longitude)
    }

    async function verifyLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasLocationPermission(true)
            } else {
                setHasLocationPermission(false)
            }
        } catch (err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        verifyLocationPermission()
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                position => {
                    setInitialRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null
                    })
                }, error => setInitialRegion({ error: error.message }), {
                enableHighAccuracy: true, timeout: 2000, maximumAge: 1000
            })
        }
    }, [hasLocationPermission])

    const onChangeCapacidade = (value) => {
        if (value == 1) { setCapacidade('MIL'), setValorCap(1000) }
        else if (value == 2) { setCapacidade('DOISMIL'), setValorCap(2000) }
        else if (value == 3) { setCapacidade('TRESMIL'), setValorCap(3000) }
        else if (value == 4) { setCapacidade('QUATROMIL'), setValorCap(4000) }
        else if (value == 5) { setCapacidade('QUATROMILEQUINHENTOS', setValorCap(4500)) }
    }

    const onChangeTipo = (value) => {
        if (value == '1') { setTipo('BOVINO') }
        else if (value == '2') { setTipo('CAPRINO') }
    }

    useEffect(() => {
        loadListResponsaveis()
        getResponsavel()
        setLat(initialRegion.latitude)
        setLong(initialRegion.longitude)
    }, [])

    const getResponsavel = async () => {
        let responsaveis = await responsavel.map(item => ({
            label: item.nome,
            value: item.id,
            color: '#0077b6'
        }))
        setRespList(responsaveis)
    }

    function onChangeDatePicker(value) {
        setShow(Platform.OS === 'ios')
        setDataCriacao(value)
    }

    const handleCloseModal = () => {
        setLat(0)
        setLong(0)
        setModalVisible(false)
    }

    const onChangeResponsavel = value => setResponsavelId(value)
    const closeAlertErroSuccess = () => setAlertVisible(false)
    const onChangeStaus = () => {
        setIsEnabled(!isEnabled)
        let enabled = isEnabled ? 'INATIVO' : 'ATIVO'
        setStatus(enabled)
    }

    //Criação do tanque
    const createTanque = async (
        nome, capacidade, qtdAtual, dataCriacao, tipo, responsavelId,
        status, lat, long, cep, bairro, logradouro, localidade, uf
    ) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = {
            nome: nome,
            capacidade: capacidade,
            qtdAtual: qtdAtual,
            dataCriacao: dataCriacao,
            tipo: tipo,
            status: status,
            latitude: lat,
            longitude: long,
            cep: cep,
            bairro: bairro,
            logradouro: logradouro,
            localidade: localidade,
            uf: uf,
            responsavel: {
                id: responsavelId,
            },
        }

        await fetch(`${baseUrl}tanque`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
    }

    const handleCreate = async () => {
        if (nome == '') {
            setTypeMessage('Preencha o nome do tanque!')
            setAlertVisible(true)
        } else if (!tipo) {
            setTypeMessage('Selecione o tipo do leite!')
            setAlertVisible(true)
        } else if (!capacidade) {
            setTypeMessage('Selecione a capacidade do tanque!')
            setAlertVisible(true)
        } else if (qtdAtual > valorCap) {
            setTypeMessage('Quantidade atual excede a capacidade máxima!')
            setAlertVisible(true)
        } else if (isNaN(qtdAtual) || qtdAtual < 0) {
            setTypeMessage('Digite um valor válido para a quantidade atual!')
            setAlertVisible(true)
        } else if (!responsavelId) {
            setTypeMessage('Selecione um responsável!')
            setAlertVisible(true)
        } else if (lat == 0 || long == 0) {
            setTypeMessage('Abra o mapa e clique no local onde o tanque foi instalado!')
            setAlertVisible(true)
        }
        else {
            await createTanque(
                nome, capacidade, qtdAtual, dataCriacao, tipo, responsavelId,
                status, lat, long, cep, bairro, logradouro, localidade, uf
            )
            await onRefreshList()
            onCloseModal()
            showAlertErroSuccess()
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Cadastro de Tanque</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Características</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Nome</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Ex: T-1000"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.titleInput }}>Tipo do Leite</Text>
                    <Text style={{ ...styles.titleInput }}>Capacidade</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5 }}>
                    <PickerView
                        onChange={onChangeTipo}
                        title={{ label: 'Tipo?', value: null, color: '#000' }}
                        dataItem={[
                            { label: 'Bovino', value: 1, color: '#da1e37' },
                            { label: 'Caprino', value: 2, color: '#0077b6' },
                        ]}
                    />
                    <PickerView
                        onChange={onChangeCapacidade}
                        title={{ label: 'Capacidade?', value: null, color: '#000' }}
                        dataItem={[
                            { label: '1000 litros', value: 1, color: '#da1e37' },
                            { label: '2000 litros', value: 2, color: '#0077b6' },
                            { label: '3000 litros', value: 3, color: '#da1e37' },
                            { label: '4000 litros', value: 4, color: '#0077b6' },
                            { label: '4500 litros', value: 5, color: '#da1e37' },
                        ]}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={{ ...styles.titleInput }}>Volume Atual</Text>
                    <Text style={{ ...styles.titleInput }}>Data de Criação</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Em litros"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={qtdAtual}
                        keyboardType='phone-pad'
                        onChangeText={(text) => setQtdAtual(text)}
                    />
                    <TouchableOpacity onPress={() => setShow(true)} style={{ ...styles.input, width: '45%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.titleInput, marginRight: 5 }}>{moment(dataCriacao).locale('pt-br').format('L')}</Text>
                        <Icon name='calendar' size={25} color={'#000'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.titleInput }}>Responsável</Text>
                    <Text style={{ ...styles.titleInput }}>Status</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <PickerView
                        onChange={onChangeResponsavel}
                        title={{ label: 'Responsável?', value: null, color: '#000' }}
                        dataItem={respList}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 0.5,
                        width: '45%',
                        height: 45,
                        borderRadius: 8
                    }}>
                        <Switch
                            value={isEnabled}
                            trackColor={{ false: "#767577", true: "#b7e4c7" }}
                            thumbColor={isEnabled ? "#2a9d8f" : "#f4f3f4"}
                            onValueChange={onChangeStaus}
                        />
                        <Text style={{ ...styles.textInfo, fontWeight: 'normal' }}>{isEnabled ? 'ATIVO' : 'INATIVO'}</Text>
                    </View>
                </View>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Endereço</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>CEP</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput style={{ ...styles.input, width: '70%' }}
                        placeholder="Ex: 55555-555"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType='phone-pad'
                        value={findCep}
                        onChangeText={(text) => setFindCep(text)}
                    />
                    <TouchableOpacity onPress={() => buscaCep()} style={{ ...styles.btnMap, width: '20%', borderRadius: 5 }}>
                        <Icon name='magnify' size={35} color={'#FFF'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Cidade</Text>
                    <Text style={{ ...styles.titleInput, marginLeft: 125 }}>Estado</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Nome da cidade"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={dataLocal.localidade ? dataLocal.localidade : localidade}
                        onChangeText={(text) => setLocalidade(text)}
                    />
                    <TextInput style={{ ...styles.input, width: '45%' }}
                        placeholder="Ex: CE"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={dataLocal.uf ? dataLocal.uf : uf}
                        onChangeText={(text) => setUf(text)}
                    />
                </View>
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Bairro</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Nome do bairro"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={dataLocal.bairro ? dataLocal.bairro : bairro}
                        onChangeText={(text) => setBairro(text)}
                    />
                </View>
                <Text style={{ ...styles.titleInput, marginLeft: 12 }}>Rua/Comunidade</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder="Nome da rua ou comunidade"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={dataLocal.logradouro ? dataLocal.logradouro : logradouro}
                        onChangeText={(text) => setLogradouro(text)}
                    />
                </View>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Marcar Local do Tanque</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnOpenMap}>
                    <Text style={{ ...styles.fontLocal, color: '#FFF', fontSize: 16 }}>{lat == 0 ? 'Abrir Mapa' : 'Tanque já Marcado'}</Text>
                    {lat != 0 &&
                        <View style={styles.icon}>
                            <Icon name='checkbox-marked-circle' size={35} color={'#FFF'} />
                        </View>}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }}>
                <TouchableOpacity onPress={onCloseModal} style={{ ...styles.buttonStyle, backgroundColor: '#da1e37' }}>
                    <Text style={styles.btnMapText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCreate()} style={styles.buttonStyle}>
                    <Text style={styles.btnMapText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            {
                show && (
                    <DatePicker
                        date={dataCriacao}
                        onChange={onChangeDatePicker}
                        display={'spinner'}
                    />)
            }

            <Modal
                animationType='fade'
                transparent={false}
                visible={modalVisible}
            >
                <View style={{ ...styles.container, padding: 5 }}>
                    <MapView
                        style={styles.mapa}
                        mapType='hybrid'
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        loadingEnabled={true}
                        minZoomLevel={17}
                        onPress={getLocal}
                        region={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                            latitudeDelta: 0.0150,
                            longitudeDelta: 0.0100
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: lat, longitude: long }}
                            title={'Tanque: ' + nome}
                        >
                            <Image source={tipo == 'BOVINO' ? pinCow : pinGoat}
                                style={{ height: 55, width: 55 }}
                            />

                            <Callout>
                                <View style={{ width: 200 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Informações do Tanque</Text>
                                        <Icon name='information' color='#000' size={22} />
                                    </View>
                                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#DDD', marginVertical: 3 }}></View>
                                    <Text style={styles.titleCard}>Tanque: <Text style={styles.textSimple}>{nome}</Text></Text>
                                    <Text style={styles.titleCard}>Vol. atual: <Text style={styles.textSimple}>{qtdAtual} litros</Text></Text>
                                    <Text style={styles.titleCard}>Status: <Text style={styles.textSimple}>{status}</Text></Text>
                                    <Text style={styles.titleCard}>Responsável: <Text style={styles.textSimple}>Leandro Rêgo</Text></Text>
                                </View>
                            </Callout>

                        </Marker>

                    </MapView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ ...styles.btnMap, backgroundColor: '#da1e37' }} onPress={() => handleCloseModal()}>
                            <Text style={styles.btnMapText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnMap, backgroundColor: '#2a9d8f' }} onPress={() => setModalVisible(false)}>
                            <Text style={styles.btnMapText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {alertVisible &&
                    <AlertErrorSuccess
                        onClose={closeAlertErroSuccess}
                        title='Aviso'
                        message={typeMessage}
                        titleButton='Ok'
                        jsonPath={require('../../assets/lottie/error-icon.json')}
                        buttonColor={'#292b2c'}
                    />
                }
            </Modal>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#d3d3d3',
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
    mapa: {
        width: '100%',
        height: '92%',
        marginBottom: 5
    },
    btnMap: {
        width: '48%',
        height: 45,
        backgroundColor: '#292b2c',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnMapText: {
        fontSize: 18,
        color: '#FFF',
    },
    btnOpenMap: {
        backgroundColor: '#292b2c',
        width: '95%',
        marginTop: 3,
        flexDirection: 'row',
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginLeft: 9
    },
    icon: {
        position: 'absolute',
        right: 0.5,
        backgroundColor: '#2a9d8f',
        width: 55, height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }

})