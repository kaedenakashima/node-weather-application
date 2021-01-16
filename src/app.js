const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup hbs engines & location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Katie'
    })
})

app.get('/profile', (req, res) => {
    res.render('about', {
        title: 'PROFILE',
        name: 'Katie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        paragraph: 'Ask me any questions!',
        name: 'Katie'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('/weatherpage', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, { lat, lon, location } = {} ) => {
//         if (error) {
//             return res.send({ error })
//         }
//         forecast(req.query.location, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }
//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })


app.get('/weatherpage', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
        
    })
        // res.send({
        //     forecasy: 'It is snowing',
        //     location: 'Houston',
        //     address: req.query.address
        // })
    })
    
//     geocode(req.query.address, (error, {lat, lon, location})=> {
//         if (error) {
//             return res.send({error})
//         }
        
//         forecast(req.query.location, (error, forecastData)=> {
//             if(error) {
//                 return res.send({error})
//             }
//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Houston',
//         address: req.query.address
//     })
// })

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Katie',
//         errorMsg: 'You question is not found.'
//     }
    
//     )
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404 Page not found.',
//         name: 'Katie',
//         errorMsg: 'We do not have the page you are looking for. '
//     }
    
//     )
// })
app.listen(2000, () => {
    console.log('Server is up on port 2000.')
})

