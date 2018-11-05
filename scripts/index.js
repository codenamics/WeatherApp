// UI module
const UI = (function () {
    let menu = document.querySelector('#menu-container')
    //Showing app
    const showApp = () => {
        document.querySelector('#app-loader').classList.add('display-none');
        document.querySelector('main').removeAttribute('hidden')
    }
    //Showing Loader
    const loadApp = () => {
        document.querySelector('#app-loader').classList.remove('display-none');
        document.querySelector('main').setAttribute('hidden', true)
    }
    //Menu
    const _showMenu = () => {
        menu.style.right = 0
    }
    const _hideMenu = () => {
        menu.style.right = '-65%'
    }
    const _toogleHourlyWeather = () => {
        let hourlyWeather = document.querySelector('#hourly-weather-wrapper'),
            arrow = document.querySelector('#toggle-hourly-weather').children[0],
            visible = hourlyWeather.getAttribute('visible'),
            dailyWeather = document.querySelector('#daily-weather-wrapper')

        if (visible == 'false') {
            hourlyWeather.setAttribute('visible', 'true')
            hourlyWeather.style.bottom = 0
            arrow.style.transform = 'rotate(180deg)'
            dailyWeather.style.opacity = 0
        } else if (visible == 'true') {
            hourlyWeather.setAttribute('visible', 'false')
            hourlyWeather.style.bottom = '-100%'
            arrow.style.transform = 'rotate(0deg)'
            dailyWeather.style.opacity = 1
        } else {
            console.log('Unknown state on lower panel')
        }
    }
    const displayWeatherData = (data, location) => {
        let {
            icon,
            summary
        } = data.currently
        document.querySelectorAll(".location-label").forEach(el =>
            el.innerHTML = location
        )
        document.querySelector('main').style.backgroundImage = `url("./assets/images/bg-images/${icon}.jpg")`
        document.querySelector("#currentlyIcon").setAttribute('src', `./assets/images/summary-icons/${icon}-white.png`)
        document.querySelector("#summary-label").innerHTML = summary

        showApp()
    }
    //Button menu toogle
    document.querySelector('#open-menu-btn').addEventListener('click', _showMenu)
    document.querySelector('#close-menu-btn').addEventListener('click', _hideMenu)
    document.querySelector('#toggle-hourly-weather').addEventListener('click', _toogleHourlyWeather)
    return {
        showApp,
        loadApp,
        displayWeatherData
    }
})()

const GETLOCATION = (function () {
    let location;
    const loactionInput = document.querySelector('#location-input'),
        addCityBtn = document.querySelector('#add-city-btn')

    const _addCity = () => {
        location = loactionInput.value;
        loactionInput.value = ''
        addCityBtn.setAttribute('disabled', 'true')
        addCityBtn.classList.add('disabled')

        WEATHER.getWeather(location)
    }

    loactionInput.addEventListener('input', function () {
        let inputText = this.value.trim()

        if (inputText != '') {
            addCityBtn.removeAttribute('disabled')
            addCityBtn.classList.remove('disabled')
        } else {
            addCityBtn.setAttribute('disabled', 'true')
            addCityBtn.classList.add('disabled')
        }
    })
    addCityBtn.addEventListener('click', _addCity)
})()

const WEATHER = (function () {
    const darkSkyKey = '3e5d5d1a313d18f0363f3e036105a2cf',
        geoCodeKey = '9b95c77edff94cbda08fc3e2a1688059'
    const _getGeoCodeURL = (location) =>
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geoCodeKey}`


    const _getDarkSkyURL = (lat, lng) =>
        `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`

    const _fetchWeatherData = (url, location) => {
        axios.get(url)
            .then(res => {
                UI.displayWeatherData(res.data, location)
            })
            .catch(err => console.log(err))
    }

    const getWeather = (location) => {
        UI.loadApp()

        let geocodeURL = _getGeoCodeURL(location)

        axios.get(geocodeURL)
            .then((res) => {
                    const {
                        lat,
                        lng
                    } = res.data.results[0].geometry
                    let darkskyURL = _getDarkSkyURL(lat, lng)
                    _fetchWeatherData(darkskyURL, location)
                }

            ).catch(err => console.log(err))
    }
    return {
        getWeather
    }
})()

//Load app
window.onload = function () {
    UI.showApp()
}