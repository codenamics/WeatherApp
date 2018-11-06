import imageUrl from '../assets/images/bg-images/*.jpg'
import sumIconsWhite from '../assets/images/summary-icons/*-white.png'
import sumIconsGrey from '../assets/images/summary-icons/*-grey.png'
import WEATHER from '../scripts/weather'
import LOCATION from '../scripts/loaction'
import LOCALSTORE from './localStorage';

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

        if (visible === 'false') {
            hourlyWeather.setAttribute('visible', 'true')
            hourlyWeather.style.bottom = 0
            arrow.style.transform = 'rotate(180deg)'
            dailyWeather.style.opacity = 0
        } else if (visible === 'true') {
            hourlyWeather.setAttribute('visible', 'false')
            hourlyWeather.style.bottom = '-100%'
            arrow.style.transform = 'rotate(0deg)'
            dailyWeather.style.opacity = 1
        } else {
            console.log('Unknown state on lower panel')
        }

    }
    const displayWeatherData = (data, location) => {
        let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let output = ''
        let outputHourly = ''
        let {
            icon,
            summary,
            humidity,
            temperature,
            windSpeed
        } = data.currently
        const {
            hourly,
            daily
        } = data
        document.querySelectorAll(".location-label").forEach(el =>
            el.innerHTML = location
        )

        document.querySelector('main').style.backgroundImage = `url("${imageUrl[icon]}")`
        document.querySelector("#currentlyIcon").setAttribute('src', `${sumIconsWhite[icon]}`)
        document.querySelector("#summary-label").innerHTML = summary
        document.querySelector("#humidity").innerHTML = Math.round(humidity * 100) + '%';
        document.querySelector("#degrees-label").innerHTML = Math.round((temperature - 32) * 5 / 9) + '&#176;'
        document.querySelector("#wind-speed-label").innerHTML = (windSpeed * 1.6093).toFixed(1) + ' kph';

        daily.data.forEach((day) => {
            let days = weekDays[new Date(day.time * 1000).getDay()]
            let temp = Math.round((day.temperatureMax - 32) * 5 / 9) + '&#176;' + '/' + Math.round((day.temperatureMin - 32) * 5 / 9) + '&#176;';
            output += `
                <li class='list-daily-item'>
                <div id="daily-row" class="flex-container">
                    <div>
                        <h1 class="daily-heading">${days}</h1>
                    </div>
                    <div class="flex-container">
                        <div class="right">
                            <p>${temp}</p>
                        </div>
                        <div class="right">
                            <img id='sumIcon' class="icon-sm-30" src='${sumIconsWhite[day.icon]}' alt="">
                        </div>
                    </div>
                </div>
            </li>
        `
        })
        document.querySelector('#list-daily').innerHTML = output

        hourly.data.splice(0, 24).forEach((hour) => {
            let date = new Date(hour.time * 1000).getHours() + ":00";
            let temp = Math.round((hour.temperature - 32) * 5 / 9) + '&#176;';
            outputHourly +=
                `
           <li class='list-daily-item'>

           <div class="flex-container weather-box">
           <div>
               <h1>${date}</h1>
           </div>
           <div class="flex-container">
               <div>
                   <p>${temp}</p>
               </div>
               <div>
                   <img class="icon-sm-30" src='${sumIconsGrey[hour.icon]}' alt="">
               </div>
           </div>
       </div>
            </li>
           `
        })
        document.querySelector('#list-hourly').innerHTML = outputHourly

        _hideMenu()
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

export default UI


//Load app
window.onload = function () {
    LOCALSTORE.get()
    let cities = LOCALSTORE.getSavedCities()
    if (cities.length !== 0) {
        WEATHER.getWeather(cities[cities.length - 1])
    } else {
        UI.showApp()
    }


}