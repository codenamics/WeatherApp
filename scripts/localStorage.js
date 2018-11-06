const LOCALSTORE = (function () {
    let savedCities = [];
    const save = (city) => {
        savedCities.push(city)
        localStorage.setItem('savedCities', JSON.stringify(savedCities))
    }
    const get = () => {
        if (localStorage.getItem('savedCities') !== null) {
            savedCities = JSON.parse(localStorage.getItem('savedCities'))
        }

    }
    const remove = (index) => {
        if (index < savedCities.length) {
            savedCities.splice(index, 1)
            localStorage.setItem('savedCities', JSON.stringify(savedCities))
        }
    }
    const getSavedCities = () => savedCities

    return {
        save,
        get,
        remove,
        getSavedCities
    }
})()


export default LOCALSTORE