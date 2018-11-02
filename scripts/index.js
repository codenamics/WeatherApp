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
    //Button menu toogle
    document.querySelector('#open-menu-btn').addEventListener('click', _showMenu)
    document.querySelector('#close-menu-btn').addEventListener('click', _hideMenu)
    document.querySelector('#toggle-hourly-weather').addEventListener('click', _toogleHourlyWeather)
    return {
        showApp,
        loadApp
    }
})()

//Load app
window.onload = function () {
    UI.showApp()
}