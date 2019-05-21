const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a158487dd484ffafe1e12d32afd93854/'+longtitude+','+latitude+'?units=si'
    request({ url: url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('2: Unable to connect forecast api server',undefined)
        }else if(body.error){
            callback('2: '+body.error, undefined)
        }else{
            const {temperature, precipProbability} = body.currently
            callback(undefined, ' is currently '+temperature+' degrees out. There is a '+precipProbability+'% chance of rain')
        }
    })
}

module.exports = forecast