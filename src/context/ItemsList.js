import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
	listOfCities: [],
	options: {
		isLoading: false,
		error: null,
	},
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
	) {
		newListofcities.push({ ...action.payload })
	} else {
		return editOptions(state, {
			payload: {
				optionName: 'error',
				optionValue: 'City is already exists',
			},
		})
	}
	const newData = {
		...state,
		options: {
			...state.options,
			error: null,
		},
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
		...state,
		options: {
			...state.options,
			error: null,
		},
		listOfCities: [...newListofcities],
	}

	if (newListofcities.length === 0) {
		localStorage.removeItem('userData')
	} else {
		localStorage.setItem('userData', JSON.stringify(newData))
	}

	return newData
}

const editOptions = (state, action) => {
	return {
		...state,
		options: {
			...state.options,
			[action.payload.optionName]: action.payload.optionValue,
		},
	}
}

const ListReducer = (state, action) => {
	switch (action.type) {
		case 'NEW_ITEM':
			return addNewItem(state, action)
		case 'DELETE_ITEM':
			return removeItem(state, action)
		case 'LOAD_FROM_LOCALSTORAGE':
			const data = localStorage.getItem('userData')
			return { ...state, ...JSON.parse(data) }
		case 'EDIT_OPTIONS':
			return editOptions(state, action)
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
				options: state.options,
				dispatch,
			}}
		>
			{children}
		</WeatherListContext.Provider>
	)
}
