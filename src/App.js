import { useContext } from 'react'
import './App.scss'
import AddCoordinatesForm from './components/AddCoordinatesForm'
import List from './components/List'
import Loader from './components/Loader'
import { WeatherListContext } from './context/ItemsList'

const App = () => {
	const { options } = useContext(WeatherListContext)
	return (
		<div className="App">
			<Loader active={options?.isLoading} />
			<div className="App__wrapper">
				<div className="App__title">Weather App</div>
				<AddCoordinatesForm />
				<List />
			</div>
		</div>
	)
}

export default App
