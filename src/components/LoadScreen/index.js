import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LottieView from 'lottie-react-native'

export default function LoadScreen({ msg }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/mkLogo.png')}
                style={styles.image}
            />
            <Text style={styles.text}>{msg}</Text>
            <LottieView style={{ height: 125 }} source={require('../../assets/lottie/loading.json')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute' },
    image: { height: 225, width: 225, marginBottom: 10 },
    text: { fontSize: 15, letterSpacing: 2, marginBottom: -45 }

})