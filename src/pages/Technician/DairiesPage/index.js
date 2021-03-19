import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/technician.api'

import Header from '../../../components/Header'
import ProfileList from '../ProfileList'
import Loader from '../../../components/Loader'

import {
	Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
	BoxIconUpdate, BoxIconDelete
} from '../TechnicianHome/styles'

const DairiesPage = () => {

	const [dairies, setDairies] = useState([])
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [loading, setLoading] = useState(false)

	const loadDairies = async () => {
		setLoading(true)
		const response = await Api.getDairies()
		setDairies(response)
		setLoading(false)
	}

	useEffect(() => {
		loadDairies()
	}, [])

	const onRefreshList = () => {
		setIsRefreshing(true)
		loadDairies()
		setIsRefreshing(false)
	}

	return (
		<Container>
			<Header msg={'Lista de laticínios'} showNameList={false} />
			<List
				showsVerticalScrollIndicator={false}
				data={dairies}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
				renderItem={({ item }) => <ProfileList data={item} />}
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

export default DairiesPage