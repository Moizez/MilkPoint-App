import React, { useState, useEffect, useContext } from 'react'
import { Animated, StyleSheet, Keyboard, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../../contexts/auth'

import {
    Container, BoxImage, Text, InputBox, Input, IconBox, IconButton, EnterButton,
    EnterText, Link, LinkText
} from './styles'

const SignIn = () => {

    const navigation = useNavigation()

    //Dados p/ Login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, loadingAuth } = useContext(AuthContext)
    const [eye, setEye] = useState(false)

    async function handleLogin() {
        await signIn(email.trim(), password.trim())
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
                useNativeDriver: false
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            })
        ]).start()
    }, [])

    //Função para verificar se o teclado está aberto e começar a animação da logo
    function keyboardDidShow() {
        Animated.parallel([

            Animated.timing(logo.x, {
                toValue: 100,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 100,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start()
    }

    //Função para verificar se o teclado está fechado e retornar o tamanho da logo
    function keyboardDidHide() {
        Animated.parallel([

            Animated.timing(logo.x, {
                toValue: 225,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 225,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start()
    }

    return (
        <Container behavior='padding'>
            <BoxImage>
                <Animated.Image style={{
                    width: logo.x,
                    height: logo.y,
                }}
                    source={require('../../assets/images/mkLogo.png')} />
            </BoxImage>
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
                <Text>Realize sua autenticação</Text>
                <InputBox>
                    <Input
                        placeholder='E-mail'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <IconBox>
                        <Icon name='email' size={28} color='#000' />
                    </IconBox>
                </InputBox>

                <InputBox>
                    <Input
                        placeholder='Senha'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={password}
                        secureTextEntry={eye ? true : false}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {password ?
                        <IconButton onPress={() => setEye(!eye)} activeOpacity={1}>
                            <Icon name={eye ? 'eye' : 'eye-off'} size={28} color='#000' />
                        </IconButton>
                        :
                        <IconBox>
                            <Icon name='lock' size={28} color='#000' />
                        </IconBox>
                    }
                </InputBox>

                <EnterButton onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                            <EnterText>Entrar</EnterText>
                        )
                    }
                </EnterButton>
                <Link onPress={() => navigation.navigate('ForgotPassword')}>
                    <LinkText>Esqueceu sua senha?</LinkText>
                </Link>
            </Animated.View>
        </Container>
    );
}

const styles = StyleSheet.create({
    boxInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        paddingBottom: 30
    }
})

export default SignIn