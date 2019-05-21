const request = require('request')

const geocode = (searchtext='bangkok',callback) => {
    console.log(searchtext)
    const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+searchtext+'.json?access_token=pk.eyJ1Ijoid2l0b29ucCIsImEiOiJjanZoamtnc2QwMng0NDluOWY5NWRzdWZxIn0.W8LKz-L08YdSUasl9Tbecw&limit=1'
    request({ url: mapurl, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect geo api',undefined)
        }else if(!body.features[0]){
            callback({error:'No Match place'}, undefined)
        }else{
            callback(undefined, {
                place:body.features[0].place_name, 
                latitude:body.features[0].center[0],
                longtitude:body.features[0].center[1]
            })
        }
    })
}
module.exports = geocode

