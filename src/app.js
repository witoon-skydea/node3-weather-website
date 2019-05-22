const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


//weather
    const request = require('request')
    const geocode = require('./utils/geocode.js')
    const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectorypath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather app yeah',
        name: 'witoon'
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: req.query.search,
    })
})




app.get('/about', (req, res) => {
    res.render('about',{
        title: 'about app',
        name: 'witoon'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help by ironman',
        name: 'witoon'
    })
})


// app.get('/weather', (req, res) => {
//     if(!req.query.location){
//         return res.send({
//             error : 'you have to input location term'
//         })
//     }
//     res.send({
//         forecast: 'No Rain',
//         location: 'Bangkok'
//     })
// })

app.get('/weather', (req, res) => {
    //weather
    if(!req.query.location){
        return res.send({
            error: 'You have to input location term'
        })
    }
    const address = req.query.location
    console.log('address req = '+address)
    geocode (address,(error,{latitude, longtitude, place} = {})=> {
        if(error){
            res.send(error)
        }else{
            forecast(latitude, longtitude, (error, forcastmessage)=>{
                if(error){
                    res.send(error)
                }else{
                    const output = [{forcastmessage,location:place}]
                    res.send(output)
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help not found')
})

app.get('*', (req, res) => {
    res.send('Oops 404 Pages งงสิมึง')
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})