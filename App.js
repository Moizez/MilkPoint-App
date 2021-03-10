import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';

import AuthProvider from './src/contexts/auth'
import RequestProvider from './src/contexts/request'

import Routes from './src/routes/'

console.disableYellowBox = true

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<RequestProvider>
					<StatusBar backgroundColor='#292b2c' barStyle='light-content' />
					<Routes />
				</RequestProvider>
			</AuthProvider>
		</NavigationContainer>
	);
}