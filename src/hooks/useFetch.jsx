import axios from 'axios'

const useFetch = () => {
	const MAIN_URL = 'https://fcc-weather-api.glitch.me/api/current'

	const fetchData = async (coords) => {
		try {
			const res = await axios.get(
				`${MAIN_URL}?lat=${coords.lat}&lon=${coords.lon}`
			)
			console.log(res.data)
			return res.data
		} catch (error) {
			console.log(error)
		}
	}

	return { fetchData }
}

export default useFetch
