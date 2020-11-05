import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../services/api'

import Header from '../../../components/Header'
import ListaProdutores from '../ListaProdutores'
import Loader from '../../../components/Loader'

import {
	Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
	BoxIconUpdate, BoxIconDelete
} from '../styles'

export default function TelaProdutores() {

	const [isRefreshing, setIsRefreshing] = useState(false)
	const [produtor, setProdutor] = useState([])
	const [loading, setLoading] = useState(false)

	const loadProdutores = async () => {
		setLoading(true)
		const response = await api.get('produtor')
		setProdutor(response.data)
		setLoading(false)
	}

	useEffect(() => {
		loadProdutores()
	}, [])

	async function onRefreshList() {
		setIsRefreshing(true)
		await loadProdutores()
		setIsRefreshing(false)
	}

	return (
		<Container>
			<Header msg={'Lista de produtores'} />
			<List
				showsVerticalScrollIndicator={false}
				data={produtor}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
				renderItem={({ item }) => <ListaProdutores data={item} />}
				ListEmptyComponent={
					<BoxNomeAviso>
						<NomeAviso style={{ marginBottom: 70 }}>Não há registros!</NomeAviso>
						<NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
						<BoxIconAviso>
							<BoxIconUpdate>
								<Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
								<NomeAviso>Clique e arraste para atualizar a lista de produtores</NomeAviso>
							</BoxIconUpdate>
							<BoxIconDelete>
								<Icon name='gesture-tap' color='#adb5bd' size={60} />
								<NomeAviso>Clique no produtor para mais detalhes e opções</NomeAviso>
							</BoxIconDelete>
						</BoxIconAviso>
					</BoxNomeAviso>}
			/>
			{loading && !isRefreshing && <Loader />}
		</Container>
	);
}