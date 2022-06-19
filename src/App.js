import { useContext } from 'react'
import './App.scss'
import AddCoordinatesForm from './components/AddCoordinatesForm'
import List from './components/List'
import Loader from './components/Loader'
import Modal from './components/Modal'
import { MainContext } from './context/Main'

const App = () => {
	const { options, askForDelete } = useContext(MainContext)
	return (
		<div className="App">
			<Loader active={options?.isLoading} />
			<Modal active={askForDelete?.isActive} />
			<div className="App__wrapper">
				<div className="App__title">Weather App</div>
				<AddCoordinatesForm />
				<List />
			</div>
		</div>
	)
}

export default App
