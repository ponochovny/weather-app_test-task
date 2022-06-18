const useFetch = () => {
	const MAIN_URL = 'https://fcc-weather-api.glitch.me/api/current'

	const fetchData = async (coords) => {
		try {
			const res = await fetch(`${MAIN_URL}?lat=${coords.lat}&lon=${coords.lon}`)
			return res.json()
		} catch (error) {
			console.log(error)
		}
	}

	return { fetchData }
}

export default useFetch
