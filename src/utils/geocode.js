const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2F0aWU4NzgiLCJhIjoiY2tpdmtxbm1mMXNsbTJ0bHJxdWh3cnNkeSJ9.6m_Ylr2HrLjdRH3Awk56Bg&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Inable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('Undable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
