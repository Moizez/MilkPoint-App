import React, { useContext } from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

import { AuthContext } from '../../contexts/auth'

export default function Loader() {

    const { user } = useContext(AuthContext)

    const changeColor = () => {
        if (user.perfil === 1) return '#2a9d8f'
        if (user.perfil === 2) return '#fca311'
        if (user.perfil === 3) return '#da1e37'
        if (user.perfil === 4) return '#0077b6'
    }

    return (
        <View style={styles.container}>
            <View style={styles.indicator}>
                <ActivityIndicator
                    style={{ marginVertical: 5 }}
                    color={changeColor()}
                    size="large"
                />
                <Text style={styles.text}>Carregando...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 200,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
    }
})

