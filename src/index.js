import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { WeatherListContextProvider } from './context/ItemsList'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<WeatherListContextProvider>
			<App />
		</WeatherListContextProvider>
	</React.StrictMode>
)
