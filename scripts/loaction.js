import WEATHER from '../scripts/weather'

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

export default GETLOCATION