
const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

const weather = {}
weather.temperature = {
    unit: 'celsius'
}

// KELVIM Temperature 
const kelTemp = 273

// API Key
const key = '9ddf8c1ee3c6181ade655786e9330ecb'


// Brower support test
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p> Your Browser dosn't support Geolocalization </p>`
}

// Set Position
function setPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    getWeather(latitude, longitude)
}

// error while using geolocalization
function showError(err) {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p> ${err.message} </p>`
}

// Weather by API call
async function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    let response = await fetch(api)
    let data = await response.json()
    console.log(data)
    weather.temperature.value = Math.floor(data.main.temp - kelTemp)
    weather.description = data.weather[0].main
    weather.country = data.sys.country
    weather.city = data.name
    
    displayWeather()
}

function displayWeather() {
    iconElement.innerHTML = `<img src="assets/icons/${weather.description}.png" />`
    tempElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}
