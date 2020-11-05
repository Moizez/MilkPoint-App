import React, { useState, useEffect, useContext } from 'react'
import { Animated, TouchableOpacity, StyleSheet, View, Text, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../../contexts/auth'
import ActionButton from '../../components/ActionButton'

import { BoxImage, Input, SubmitButton, SubmitText, Link, LinkText } from './styles'

export default function SignIn() {
    const navigation = useNavigation()

    //Dados p/ Login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, loadingAuth } = useContext(AuthContext)
    const [eye, setEye] = useState(false)

    async function handleLogin() {
        await signIn(email, password)
    }

    //Animação da tela de login
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 220, y: 220 }))

    //Ciclo da animação da tela de login
    useEffect(() => {
        setEye(true)
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 12,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
            })

        ]).start()

    }, [])

    //Função para verificar se o teclado está aberto e começar a animação da logo
    function keyboardDidShow() {

        Animated.parallel([

            Animated.timing(logo.x, {
                toValue: 100,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 100,
                duration: 100,
            }),

        ]).start()

    }

    //Função para verificar se o teclado está fechado e retornar o tamanho da logo
    function keyboardDidHide() {

        Animated.parallel([

            Animated.timing(logo.x, {
                toValue: 225,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 225,
                duration: 100,
            }),

        ]).start()

    }

    return (
        <>
            <KeyboardAvoidingView style={styles.containerBody} behavior='padding'>
                <BoxImage>
                    <Animated.Image style={{
                        width: logo.x,
                        height: logo.y,
                    }}
                        source={require('../../assets/images/mkLogo.png')} />
                </BoxImage>
                <Text style={styles.text}>Realize sua autenticação</Text>
                <Animated.View
                    style={[
                        styles.boxInput,
                        {
                            opacity: opacity,
                            transform: [
                                { translateY: offset.y }
                            ]
                        }
                    ]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Input style={styles.input}
                            placeholder='E-mail'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <View style={styles.icon}>
                            <Icon name='email' size={28} color='#000' />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Input
                            placeholder='Senha'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={password}
                            secureTextEntry={eye ? true : false}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {password ?
                            <TouchableOpacity onPress={() => setEye(!eye)} style={styles.icon} activeOpacity={1}>
                                <Icon name={eye ? 'eye' : 'eye-off'} size={28} color='#000' />
                            </TouchableOpacity>
                            :
                            <View style={styles.icon}>
                                <Icon name='lock' size={28} color='#000' />
                            </View>
                        }
                    </View>

                    <SubmitButton onPress={handleLogin}>
                        {
                            loadingAuth ? (
                                <ActivityIndicator size={20} color="#FFF" />
                            ) : (
                                    <SubmitText>Entrar</SubmitText>
                                )
                        }
                    </SubmitButton>
                    <Link onPress={() => navigation.navigate('ForgotPassword')}>
                        <LinkText>Esqueceu sua senha?</LinkText>
                    </Link>
                </Animated.View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    containerBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        paddingBottom: 30
    },
    icon: {
        backgroundColor: '#d3d3d3',
        height: 50,
        width: 45,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
    }
})