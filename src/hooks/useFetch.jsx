import { useContext } from 'react'
import { MainContext } from '../context/Main'
import { actions } from '../helper/mainContext'

const useFetch = () => {
	const MAIN_URL = 'https://fcc-weather-api.glitch.me/api/current'
	const { dispatch } = useContext(MainContext)

	const fetchData = async (coords) => {
		dispatch({
			type: actions.EDIT_OPTIONS,
			payload: {
				optionName: 'isLoading',
				optionValue: true,
			},
		})
		try {
			const res = await fetch(`${MAIN_URL}?lat=${coords.lat}&lon=${coords.lon}`)
			dispatch({
				type: actions.EDIT_OPTIONS,
				payload: {
					optionName: 'isLoading',
					optionValue: false,
				},
			})
			return res.json()
		} catch (error) {
			console.log('Fetch error:', error)

			dispatch({
				type: actions.EDIT_OPTIONS,
				payload: {
					optionName: 'error',
					optionValue: error.message,
				},
			})
		}

		dispatch({
			type: actions.EDIT_OPTIONS,
			payload: {
				optionName: 'isLoading',
				optionValue: false,
			},
		})
	}

	return { fetchData }
}

export default useFetch
