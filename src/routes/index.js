import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth'
import LottieView from 'lottie-react-native'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

export default function Routes() {

    const { signed, loading } = useContext(AuthContext)
    const [time, setTime] = useState(true)

    setTimeout(() => {
        setTime(loading)
    }, 2500)

    if (time) {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/mkLogo.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>CARREGANDO</Text>
                <LottieView style={{ height: 125 }} source={require('../assets/lottie/loading.json')} autoPlay loop />
            </View>
        )
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { height: 300, width: 300, marginBottom: 10},
    text: { fontSize: 15, letterSpacing: 2, marginBottom: -45}

})