const WEATHER = (function () {
    const darkSkyKey = '3e5d5d1a313d18f0363f3e036105a2cf',
        geoCodeKey = '9b95c77edff94cbda08fc3e2a1688059'
    const _getGeoCodeURL = (location) => {
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geoCodeKey}`
    }
    const _getDarkSkyURL = (lat, lng) => {
        `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`
    }
})()