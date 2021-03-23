import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import Api from '../../../services/technician.api'

import Header from '../../../components/Header'
import ProfileList from '../ProfileList'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

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
			<FlatList
				showsVerticalScrollIndicator={false}
				data={dairies}
				keyExtractor={(item) => item.id}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
				renderItem={({ item }) => <ProfileList data={item} />}
				ListEmptyComponent={
					<EmptyListCard
					iconLeft={'gesture-swipe-down'}
					iconRight={'toggle-switch'}
					infoLeft={'Clique e arraste para atualizar a lista.'}
					infoRight={'Clique no seletor para ativar ou desativar.'}
				/>
				}
			/>
			{loading && !isRefreshing && <Loader />}
		</Container>
	);
}

export default DairiesPage

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;