import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components'

import AuthProvider from './src/contexts/auth'
import RequestProvider from './src/contexts/request'

import Routes from './src/routes/'

console.disableYellowBox = true

const colors = {
	producer: '#2a9d8f',
	dairy: '#dd2c2f',
	responsible: '#e7b705',
	Technician: '#00b4d8',
	bg: '#292b2c'
}

const App = () => {
	return (
		<ThemeProvider theme={colors}>
			<NavigationContainer>
				<AuthProvider>
					<RequestProvider>
						<StatusBar backgroundColor='#292b2c' barStyle='light-content' />
						<Routes />
					</RequestProvider>
				</AuthProvider>
			</NavigationContainer>
		</ThemeProvider>
	);
}

export default App