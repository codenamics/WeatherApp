import axios from 'axios'
import UI from './index'

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

export default WEATHER;