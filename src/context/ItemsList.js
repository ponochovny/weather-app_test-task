import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
	listOfCities: [],
}

export const WeatherListContext = createContext(INITIAL_STATE)

const addNewItem = (state, action) => {
	const newListofcities = [...state.listOfCities]
	const index = newListofcities.findIndex(
		(el) => el.cityName === action.payload.cityName
	)
	if (
		(index === -1 && state.listOfCities.length > 0) ||
		(action.payload.cityName !== 'Shuzenji' && state.listOfCities.length === 0)
	)
		newListofcities.push({ ...action.payload })
	const newData = {
		listOfCities: [...newListofcities],
	}

	localStorage.setItem('userData', JSON.stringify(newData))

	return newData
}
const removeItem = (state, action) => {
	const newListofcities = [...state.listOfCities]
	const index = newListofcities.findIndex(
		(el) => el.cityName === action.payload.cityName
	)
	newListofcities.splice(index, 1)
	const newData = {
		listOfCities: [...newListofcities],
	}

	if (newListofcities.length === 0) {
		localStorage.removeItem('userData')
	} else {
		localStorage.setItem('userData', JSON.stringify(newData))
	}

	return newData
}

const ListReducer = (state, action) => {
	switch (action.type) {
		case 'NEW_ITEM':
			return addNewItem(state, action)
		case 'DELETE_ITEM':
			return removeItem(state, action)
		case 'LOAD_FROM_LOCALSTORAGE':
			const data = localStorage.getItem('userData')
			return JSON.parse(data)
		case 'RESET_LIST':
			return INITIAL_STATE
		default:
			return state
	}
}

export const WeatherListContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE)

	return (
		<WeatherListContext.Provider
			value={{
				listOfCities: state.listOfCities,
				dispatch,
			}}
		>
			{children}
		</WeatherListContext.Provider>
	)
}
