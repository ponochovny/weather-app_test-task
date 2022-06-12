import './App.scss'
import AddCoordinatesForm from './components/AddCoordinatesForm'
import List from './components/List'

const App = () => {
	return (
		<div className='App'>
			<div className='App__wrapper'>
				<div className='App__title'>Weather App</div>
				<AddCoordinatesForm />
				<List />
			</div>
		</div>
	)
}

export default App
