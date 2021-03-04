import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/technician.api'

import Header from '../../../components/Header'
import ResponsiblesList from '../ResponsiblesList'
import Loader from '../../../components/Loader'

import {
	Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
	BoxIconUpdate, BoxIconDelete
} from '../TechnicianHome/styles'

const ResponsiblesPage = () => {

	const [isRefreshing, setIsRefreshing] = useState(false)
	const [responsibles, setResponsibles] = useState([])
	const [loading, setLoading] = useState(false)

	const loadResponsibles = async () => {
		setLoading(true)
		const response = await Api.getResponsibles()
		setResponsibles(response)
		setLoading(false)
	}

	useEffect(() => {
		loadResponsibles()
	}, [])

	const onRefreshList = () => {
		setIsRefreshing(true)
		loadResponsibles()
		setIsRefreshing(false)
	}

	return (
		<Container>
			<Header msg={'Lista de responsáveis'} showNameList={false} />
			<List
				showsVerticalScrollIndicator={false}
				data={responsibles}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
				renderItem={({ item }) => <ResponsiblesList data={item} />}
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

export default ResponsiblesPage