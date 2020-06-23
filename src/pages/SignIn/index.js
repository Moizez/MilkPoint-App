import React, { useState, useEffect, useContext } from 'react'
import { Animated, StyleSheet, Keyboard, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'

import { Container, BoxImage, Input, SubmitButton, SubmitText, Link, LinkText } from './styles'

export default function SignIn() {
    const navigation = useNavigation()

    //Dados p/ Login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, loadingAuth } = useContext(AuthContext)

    async function handleLogin() {
        await signIn(email, password)
    }

    //Animação da tela de login
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 225, y: 225 }))

    //Ciclo da animação da tela de login
    useEffect(() => {

        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
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
        <Container>
            <BoxImage>
                <Animated.Image style={{
                    width: logo.x,
                    height: logo.y,
                }}
                    source={require('../../assets/mkLogo.png')} />
            </BoxImage>

            <Animated.View
                style={[
                    st.boxInput,
                    {
                        opacity: opacity,
                        transform: [
                            { translateY: offset.y }
                        ]
                    }
                ]}>
                <Input
                    placeholder='E-mail'
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder='Senha'
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <SubmitButton onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                                <SubmitText>Entrar</SubmitText>
                            )
                    }
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Cadastrar-se</LinkText>
                </Link>

            </Animated.View>
        </Container>
    );
}

const st = StyleSheet.create({
    boxInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 30
    }
})