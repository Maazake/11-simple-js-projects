const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=3ba5973241ff171d1bb257de7ee9a9eb'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'London'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			console.log(res.data)
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const wthr = res.data.weather[0].main
			const weatherStatus = res.data.weather[0].id

			cityName.textContent = res.data.name
			weather.textContent = wthr
			temperature.textContent = Math.floor(temp) + '°C'
			humidity.textContent = `${hum}%`

			if (weatherStatus >= 200 && weatherStatus < 300) {
				photo.setAttribute('src', './img/thunderstorm.png')
			} else if (weatherStatus >= 300 && weatherStatus < 400) {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (weatherStatus >= 500 && weatherStatus < 600) {
				photo.setAttribute('src', './img/rain.png')
			} else if (weatherStatus >= 600 && weatherStatus < 700) {
				photo.setAttribute('src', './img/ice.png')
			} else if (weatherStatus >= 700 && weatherStatus < 800) {
				photo.setAttribute('src', './img/fog.png')
			} else if (weatherStatus === 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (weatherStatus >= 800 && weatherStatus < 900) {
				photo.setAttribute('src', './img/cloud.png')
			} else {
				photo.setAttribute('src', './img/unknown.png')
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))

	input.value = ''
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

getWeather()

input.addEventListener('keyup', enterKeyCheck)
button.addEventListener('click', getWeather)
