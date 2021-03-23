import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import Api from '../../../services/technician.api'

import Header from '../../../components/Header'
import ProfileList from '../ProfileList'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

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
			<FlatList
				showsVerticalScrollIndicator={false}
				data={responsibles}
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

export default ResponsiblesPage

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;