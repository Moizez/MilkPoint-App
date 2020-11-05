import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, PermissionsAndroid, Image, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Modal } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import moment from 'moment'
import 'moment/locale/pt-br'
import api from '../../services/api'

import PickerView from '../Picker'
import DatePicker from '../DatePicker'
import { AuthContext } from '../../contexts/auth'
import AlertErrorSuccess from '../AlertErrorSuccess'
import ActionButton from '../ActionButton'
import Loader from '../Loader'

export default function ModalCreateTanque({
    onCloseModal, showAlertErroSuccess, onRefresh, onLoad
}) {

    const { baseUrl, cepUrl, user } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [nome, setNome] = useState('')
    const [capacidade, setCapacidade] = useState(null)
    const [qtdAtual, setQtdAtual] = useState(0)
    const [dataCriacao, setDataCriacao] = useState(new Date())
    const [tipo, setTipo] = useState(0)
    const [responsavelId, setResponsavelId] = useState()
    const [tecnicoId, setTecnicoId] = useState()
    const [status, setStatus] = useState(true)
    const [isEnabled, setIsEnabled] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [valorCap, setValorCap] = useState(0)
    const [respList, setRespList] = useState([])
    const [isExpand, setExpand] = useState(false)
    const [jsonIcon, setJsonIcon] = useState('error')

    //Endereço
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [uf, setUf] = useState('')
    const [findCep, setFindCep] = useState('')
    const [responsavel, setResponsavel] = useState([])

    //Map
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        error: null
    })

    let pinCow = require('../../assets/images/pin-cow.png')
    let pinGoat = require('../../assets/images/pin-goat.png')

    let error = require('../../assets/lottie/error-icon.json')
    let success = require('../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    const loadPerfis = async () => {
        const responseRes = await api.get('responsavel')
        setResponsavel(responseRes.data)
    }

    useEffect(() => {
        getResponsavel()
    }, [responsavel])

    useEffect(() => {
        loadPerfis()
        setTecnicoId(user?.id)
        setLat(initialRegion.latitude)
        setLong(initialRegion.longitude)
    }, [])

    const buscaCep = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${cepUrl}${findCep}/json/`)
            const data = await response.json()
            if (data.erro) {
                setLoading(false)
                setJsonIcon('error')
                setTypeMessage('CEP não encontrado!')
                setAlertVisible(true)
            } else {
                setExpand(true)
                setCep(data.cep)
                setLogradouro(data.logradouro)
                setBairro(data.bairro)
                setLocalidade(data.localidade)
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

    const getResponsavel = () => {
        let responsaveis = responsavel.map(item => ({
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
        let enabled = isEnabled ? false : true
        setStatus(enabled)
    }

    //Criação do tanque
    const createTanque = async (
        nome, capacidade, qtdAtual, dataCriacao, tipo, responsavelId, tecnicoId,
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
            tecnico: {
                id: tecnicoId,
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
        if (!nome) {
            setJsonIcon('error')
            setTypeMessage('Preencha o nome do tanque!')
            setAlertVisible(true)
        } else if (!tipo) {
            setJsonIcon('error')
            setTypeMessage('Selecione o tipo do leite!')
            setAlertVisible(true)
        } else if (!capacidade) {
            setJsonIcon('error')
            setTypeMessage('Selecione a capacidade do tanque!')
            setAlertVisible(true)
        } else if (qtdAtual > valorCap) {
            setJsonIcon('error')
            setTypeMessage('Quantidade atual excede a capacidade máxima!')
            setAlertVisible(true)
        } else if (isNaN(qtdAtual) || qtdAtual < 0) {
            setJsonIcon('error')
            setTypeMessage('Digite um valor válido para a quantidade atual!')
            setAlertVisible(true)
        } else if (!tecnicoId) {
            setJsonIcon('error')
            setTypeMessage('Selecione um técnico!')
            setAlertVisible(true)
        } else if (!responsavelId) {
            setJsonIcon('error')
            setTypeMessage('Selecione um responsável!')
            setAlertVisible(true)
        } else if (lat == 0 || long == 0) {
            setJsonIcon('error')
            setTypeMessage('Abra o mapa selecionar o local do tanque!')
            setAlertVisible(true)
        }
        else {
            onLoad(true)
            onCloseModal()
            setJsonIcon('success')
            await createTanque(
                nome, capacidade, qtdAtual, dataCriacao, tipo, responsavelId, tecnicoId,
                status, lat, long, cep, bairro, logradouro, localidade, uf
            )
            await onRefresh()
            onLoad(false)
            showAlertErroSuccess()
        }
    }

    const renderLocation = () => {
        return (
            <>
                <View style={{ ...styles.boxBody, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={styles.titleInput}>Cidade</Text>
                        <TextInput style={{ ...styles.input, width: '48%' }}
                            placeholder="Nome da cidade"
                            autoCorrect={false}
                            autoCapitalize="sentences"
                            value={localidade}
                            onChangeText={(text) => setLocalidade(text)}
                        />
                    </View>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={styles.titleInput}>Estado</Text>
                        <TextInput style={{ ...styles.input, width: '48%' }}
                            placeholder="Ex: CE"
                            autoCorrect={false}
                            autoCapitalize="sentences"
                            value={uf}
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
                        value={bairro}
                        onChangeText={(text) => setBairro(text)}
                    />
                </View>

                <Text style={styles.titleInput}>Rua/Comunidade</Text>
                <View style={styles.boxBody}>
                    <TextInput style={styles.input}
                        placeholder="Nome da rua ou comunidade"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={logradouro}
                        onChangeText={(text) => setLogradouro(text)}
                    />
                </View>
            </>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Cadastro de Tanque</Text>
            </View>
            <View style={styles.body}>
                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Características</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />
                <Text style={styles.titleInput}>Nome</Text>
                <View style={styles.boxBody}>
                    <TextInput style={styles.input}
                        placeholder="Ex: T-1000"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </View>

                <View style={{ ...styles.boxBody, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ ...styles.titleInput }}>Tipo do Leite</Text>
                        <PickerView
                            onChange={onChangeTipo}
                            title={{ label: 'Tipo?', value: null, color: '#000' }}
                            dataItem={[
                                { label: 'Bovino', value: 1, color: '#da1e37' },
                                { label: 'Caprino', value: 2, color: '#0077b6' },
                            ]}
                            sizePicker={'48%'}
                        />
                    </View>

                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ ...styles.titleInput }}>Capacidade</Text>
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
                            sizePicker={'48%'}
                        />
                    </View>
                </View>

                <View style={{ ...styles.boxBody, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ ...styles.titleInput }}>Volume Atual</Text>
                        <TextInput style={{ ...styles.input, width: '48%' }}
                            placeholder="Em litros"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={qtdAtual}
                            keyboardType='phone-pad'
                            onChangeText={(text) => setQtdAtual(text)}
                        />
                    </View>

                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ ...styles.titleInput }}>Data de Criação</Text>
                        <TouchableOpacity onPress={() => setShow(true)} style={{ ...styles.input, width: '48%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...styles.titleInput, marginRight: 5 }}>{moment(dataCriacao).locale('pt-br').format('L')}</Text>
                            <Icon name='calendar' size={25} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ ...styles.boxBody, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ ...styles.titleInput }}>Responsável</Text>
                        <PickerView
                            onChange={onChangeResponsavel}
                            title={{ label: 'Responsável?', value: null, color: '#000' }}
                            dataItem={respList}
                            sizePicker={'48%'}
                        />
                    </View>

                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ ...styles.titleInput }}>Status</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 0.5,
                            width: '48%',
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
                </View>

                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Endereço</Text>
                <View style={{ backgroundColor: '#DDD', width: '100%', height: 0.5, marginVertical: 3 }} />


                <View style={styles.boxBody}>
                    <Text style={styles.titleInput}>CEP</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput style={{ ...styles.input, width: '80%' }}
                            placeholder="Ex: 55555-555"
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType='phone-pad'
                            value={findCep}
                            onChangeText={(text) => setFindCep(text)}
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

                {isExpand && renderLocation()}

                <Text style={{ ...styles.titleInput, textAlign: 'center', fontWeight: 'bold' }}>Marcar Local do Tanque</Text>

                <ActionButton
                    onAction={() => setModalVisible(true)}
                    title={lat == 0 ? 'Abrir Mapa' : 'Tanque Marcado!'}
                    btnColor={lat === 0 ? '#292b2c' : '#2a9d8f'}
                    nameIcon={lat === 0 ? 'map-search' : 'checkbox-marked-circle'}
                    colorIcon={'#FFF'}
                    btnSize={'100%'}
                    btnAlign={'center'}
                    marginRight={20}
                />
            </View>

            <View style={{ ...styles.body, marginTop: -5, flexDirection: 'row', justifyContent: 'space-between' }}>

                <ActionButton
                    onAction={onCloseModal}
                    btnColor='#da1e37'
                    title='Fechar'
                    nameIcon='close-circle'
                />
                <ActionButton
                    onAction={() => handleCreate()}
                    btnColor='#2a9d8f'
                    title='Salvar'
                    nameIcon='content-save'
                />

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
                <View style={styles.headerMap}>
                    <Text style={styles.headerMapText}>Clique em um ponto do mapa que representa o local exato do tanque para marca-lo.</Text>
                </View>
                <View style={{ ...styles.container, padding: 5 }}>
                    <MapView
                        style={styles.mapa}
                        mapType='hybrid'
                        rotateEnabled={false}
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        loadingEnabled={true}
                        minZoomLevel={18}
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

                        <ActionButton
                            onAction={() => handleCloseModal()}
                            btnColor='#da1e37'
                            title='Fechar'
                            nameIcon='close-circle'
                        />
                        <ActionButton
                            onAction={() => setModalVisible(false)}
                            btnColor='#2a9d8f'
                            title='Salvar'
                            nameIcon='content-save'
                        />
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
                        message={typeMessage}
                        jsonPath={msgType}
                        buttonColor={'#292b2c'}
                    />
                }
            </Modal>
            {loading && <Loader />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    mapa: {
        width: '100%',
        height: '92%',
        marginBottom: 5
    },
    mapa: {
        width: '100%',
        height: '88%',
        marginBottom: 5
    },
    headerMapText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF',
    },
    headerMap: {
        width: '100%',
        height: 65,
        backgroundColor: '#292b2c',
        marginBottom: 5,
        justifyContent: 'center'
    }
})