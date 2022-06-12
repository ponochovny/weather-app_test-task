const askGeolocation = new Promise((resolve, reject) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const data = {
					lon: position.coords.longitude,
					lat: position.coords.latitude,
				}
				// SAVE TO LOCAL STORAGE
				localStorage.setItem('currentLocationData', JSON.stringify(data))

				resolve(data)
			},
			(error) => {
				reject(new Error(error.message))
			}
		)
	} else {
		console.log('Geolocation is not supported by this browser.')
	}
})

export default askGeolocation
