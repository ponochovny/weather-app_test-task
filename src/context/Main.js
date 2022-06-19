import { createContext, useReducer } from 'react'
import { actions } from '../helper/mainContext'

const INITIAL_STATE = {
	listOfCities: [],
	askForDelete: {
		isActive: false,
		item: null,
	},
	options: {
		isLoading: false,
		error: null,
	},
}

export const MainContext = createContext(INITIAL_STATE)

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
				optionValue: 'City is already in the list',
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

const closeModal = (state) => {
	return {
		...state,
		askForDelete: {
			isActive: false,
			item: null,
		},
	}
}

const askForRemove = (state, action) => {
	return {
		...state,
		askForDelete: {
			isActive: true,
			item: action.payload,
		},
	}
}

const removeItem = (state) => {
	const newListofcities = [...state.listOfCities]
	const index = newListofcities.findIndex(
		(el) => el.cityName === state.askForDelete.item.cityName
	)

	newListofcities.splice(index, 1)

	// reapply main flag to first el
	if (state.askForDelete.item.main && newListofcities.length > 0) {
		newListofcities[0].main = true
	}

	const newData = {
		...state,
		options: {
			...state.options,
			error: null,
		},
		askForDelete: {
			isActive: false,
			item: null,
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
		case actions.NEW_ITEM:
			return addNewItem(state, action)
		case actions.DELETE_ITEM:
			return removeItem(state)
		case actions.LOAD_FROM_LOCALSTORAGE:
			const data = localStorage.getItem('userData')
			return { ...state, ...JSON.parse(data) }
		case actions.EDIT_OPTIONS:
			return editOptions(state, action)
		case actions.ASK_FOR_REMOVE:
			return askForRemove(state, action)
		case actions.CLOSE_MODAL:
			return closeModal(state)
		case actions.RESET_LIST:
			return INITIAL_STATE
		default:
			return state
	}
}

export const MainContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE)

	return (
		<MainContext.Provider
			value={{
				listOfCities: state.listOfCities,
				options: state.options,
				askForDelete: state.askForDelete,
				dispatch,
			}}
		>
			{children}
		</MainContext.Provider>
	)
}
