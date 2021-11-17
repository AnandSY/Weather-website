const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5hbmQtc3kiLCJhIjoiY2t2cDkwYzd3MXBmODJxa2xmMzJkdDlwMyJ9.osXN_gYva2mgv54-sb19dw'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Location Services',undefined)
        }else if(body.message){
            callback('Location not Found',undefined)
        }else if(!body.features[0]){
            callback('Location not Found',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode