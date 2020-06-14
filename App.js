import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, StatusBar, YellowBox } from 'react-native';

import AuthProvider from './src/contexts/auth'

import Routes from './src/routes/'

console.disableYellowBox = true

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<StatusBar backgroundColor='#292b2c' barStyle='light-content' />
				<Routes />
			</AuthProvider>
		</NavigationContainer>
	);
}