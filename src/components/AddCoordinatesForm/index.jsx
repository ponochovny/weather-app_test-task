import { useContext, useState } from 'react'
import { WeatherListContext } from '../../context/ItemsList'
import useFetch from '../../hooks/useFetch'
import './index.scss'

function AddCoordinatesForm() {
	const [formData, setFormData] = useState({ lon: 0, lat: 0 })
	const { dispatch, listOfCities } = useContext(WeatherListContext)
	const { fetchData } = useFetch()

	const handleSubmit = (e) => {
		e.preventDefault()

		fetchData(formData).then((data) => {
			const obj = {
				cityName: data.name,
				temp: data.main.temp,
				humidity: data.main.humidity,
				icon: data.weather[0].icon,
				description: data.weather[0].description,
			}

			dispatch({
				type: 'NEW_ITEM',
				payload: { ...obj, main: listOfCities.length === 0 },
			})
		})
	}

	return (
		<div className="AddCoordinatesForm">
			<h3>Add more cities</h3>
			<form onSubmit={handleSubmit}>
				<div className="fieldset">
					<label htmlFor="">
						<p>Longitude</p>
						<input
							type="text"
							value={formData.lon}
							onChange={(e) =>
								setFormData({ lat: formData.lat, lon: +e.target.value })
							}
						/>
					</label>
				</div>
				<div className="fieldset">
					<label htmlFor="">
						<p>Latitude</p>
						<input
							type="text"
							value={formData.lat}
							onChange={(e) =>
								setFormData({ lat: +e.target.value, lon: formData.lon })
							}
						/>
					</label>
				</div>
				<button>Add</button>
			</form>
		</div>
	)
}

export default AddCoordinatesForm
