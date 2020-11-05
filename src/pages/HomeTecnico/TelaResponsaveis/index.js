import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../services/api'

import Header from '../../../components/Header'
import ListaResponsaveis from '../ListaResponsaveis'
import Loader from '../../../components/Loader'

import {
	Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
	BoxIconUpdate, BoxIconDelete
} from '../styles'

export default function TelaResponsaveis() {

	const [isRefreshing, setIsRefreshing] = useState(false)
	const [responsavel, setResponsavel] = useState([])
	const [loading, setLoading] = useState(false)

	const loadResponsaveis = async () => {
		setLoading(true)
		const response = await api.get('responsavel')
		setResponsavel(response.data)
		setLoading(false)
	}

	useEffect(() => {
		loadResponsaveis()
	}, [])

	async function onRefreshList() {
		setIsRefreshing(true)
		await loadResponsaveis()
		setIsRefreshing(false)
	}

	return (
		<Container>
			<Header msg={'Lista de responsáveis'} />
			<List
				showsVerticalScrollIndicator={false}
				data={responsavel}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
				renderItem={({ item }) => <ListaResponsaveis data={item} />}
				ListEmptyComponent={
					<BoxNomeAviso>
						<NomeAviso style={{ marginBottom: 70 }}>Não há registros!</NomeAviso>
						<NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
						<BoxIconAviso>
							<BoxIconUpdate>
								<Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
								<NomeAviso>Clique e arraste para atualizar a lista de responsáveis</NomeAviso>
							</BoxIconUpdate>
							<BoxIconDelete>
								<Icon name='gesture-tap' color='#adb5bd' size={60} />
								<NomeAviso>Clique no responsável para mais detalhes e opções</NomeAviso>
							</BoxIconDelete>
						</BoxIconAviso>
					</BoxNomeAviso>}
			/>
			{loading && !isRefreshing && <Loader />}
		</Container>
	);
}