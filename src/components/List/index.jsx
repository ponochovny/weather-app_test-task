import { useContext, useEffect, useState } from "react"
import { WeatherListContext } from '../../context/ItemsList'
import useFetch from "../../hooks/useFetch"
import userGeoPromise from "../../tools/userGeoPromise"
import ListItem from "../ListItem"
import Pagination from "../Pagination"

function List() {
	const { dispatch, listOfCities } = useContext(WeatherListContext)
	const {fetchData} = useFetch()
	const [page, setPage] = useState(1)

	const askAndSetCoords = async () => {

		const localData = localStorage.getItem('userData')
		if (localData) {
			return dispatch({type: 'LOAD_FROM_LOCALSTORAGE'})
		}

		userGeoPromise
			.then(data => {
				return fetchData(data)
			})
			.then(data => {
				const obj = {
					cityName: data.name,
					temp: data.main.temp,
					humidity: data.main.humidity,
					icon: data.weather[0].icon,
					description: data.weather[0].description
				}

				dispatch({type: 'NEW_ITEM', payload: {...obj, main: true}})
			})
			.catch(_ => {
				localStorage.removeItem('currentLocationData')
			})
	}

	useEffect(() => {
		askAndSetCoords()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (listOfCities.length < (page * 5) && (page - 1 > 0)) setPage(page - 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listOfCities.length])

  return (
    <div className="List">
			{listOfCities.length > 0 ? listOfCities.map((el, i) => {

				if (
					i >= ((page-1) * 5) && 
					(i + 1) <= (page * 5)
				) {
					return (<ListItem key={Math.random()} item={el} index={i} />)
				} else {
					return ''
				}

			}) : (
				<p>Empty...</p>
			)}
			{
				listOfCities.length > 5 && (
					<Pagination
						activePage={page}
						changePage={
							value => setPage(value)
						}
						listLength={listOfCities.length}
					/>
				)
			}
		</div>
  )
}

export default List