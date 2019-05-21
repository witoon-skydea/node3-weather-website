const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


//weather
    const request = require('request')
    const geocode = require('./utils/geocode.js')
    const forecast = require('./utils/forecast.js')



const app = express()
const publicDirectorypath = path.join(__dirname, '../public')

app.use(express.static(publicDirectorypath))


//app.com
//app.com/help
//app.com/about
// app.get('', (req, res) => {
//     res.send('<h1>Hello World</h1>')
// })

app.get('/help', (req, res) => {

    res.send([{
        name: 'Toon',
        age: 18
    },{
        name: 'Phon',
        age: 18
    },{
        x: 'test',
        y: true
    }])
})

app.get('/about', (req, res) => {
    res.send('ABOUT')
})

app.get('/weather', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather_toon', (req, res) => {
    //weather
    const address = 'bangkok'

    geocode (address,(error,{latitude, longtitude, place} = {})=> {
        if(error){
            res.send(error)
        }else{
            forecast(latitude, longtitude, (error, forcastmessage)=>{
                if(error){
                    res.send(error)
                }else{
                    const output = [{forcastmessage},{location:place}]
                    res.send(output[0].forcastmessage)
                }
            })
        }
    })
    //

    // res.send('Weather')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})