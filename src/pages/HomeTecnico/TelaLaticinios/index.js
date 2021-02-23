import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../services/api'

import Header from '../../../components/Header'
import ListaLaticinios from '../ListaLaticinios'
import Loader from '../../../components/Loader'

import {
	Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
	BoxIconUpdate, BoxIconDelete
} from '../styles'

export default function TelaLaticinios() {

	const [laticinio, setLaticinio] = useState([])
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [loading, setLoading] = useState(false)

	const loadLaticinios = async () => {
		setLoading(true)
		const response = await api.get('laticinio')
		setLaticinio(response.data)
		setLoading(false)
	}

	useEffect(() => {
		loadLaticinios()
	}, [])

	async function onRefreshList() {
		setIsRefreshing(true)
		await loadLaticinios()
		setIsRefreshing(false)
	}

	return (
		<Container>
			<Header msg={'Lista de laticínios'} />
			<List
				showsVerticalScrollIndicator={false}
				data={laticinio}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
				renderItem={({ item }) => <ListaLaticinios data={item} />}
				ListEmptyComponent={
					<BoxNomeAviso>
						<NomeAviso style={{ marginBottom: 70 }}>Não há registros!</NomeAviso>
						<NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
						<BoxIconAviso>
							<BoxIconUpdate>
								<Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
								<NomeAviso>Clique e arraste para atualizar a lista de laticínios</NomeAviso>
							</BoxIconUpdate>
							<BoxIconDelete>
								<Icon name='gesture-tap' color='#adb5bd' size={60} />
								<NomeAviso>Clique no laticínio para mais detalhes e opções</NomeAviso>
							</BoxIconDelete>
						</BoxIconAviso>
					</BoxNomeAviso>}
			/>
			{loading && !isRefreshing && <Loader />}
		</Container>
	);
}