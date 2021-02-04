const request = require('request')
 
const forecast = (lat, lon, callback) => {
 
const url = 'http://api.weatherstack.com/current?access_key=1265ab2ee5abb63d3b4f05d261ff9396&query=' + lat + ',' + lon +  '&units=f'
 
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const celsius = ((body.current.temperature - 32) * 5) / 9;
            const celsiusRound = Math.round(celsius);
             callback(
                undefined,
                "Weather News🌦 " + body.current.weather_descriptions[0] + ". It is currently " + 
           body.current.temperature + " °F. " + 'It is currently ' + celsiusRound + ' °C. '  + " It feels like " + body.current.feelslike + "% chance of rain." + ' The  humidity is ' + body.current.humidity + '%')
        }
    })
}
module.exports = forecast
