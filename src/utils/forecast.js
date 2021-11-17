const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=90d98a37fc3a1245faf5e8ed0ec5255c&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.message){
            callback('Unable to find location',undefined)
        }else{
            const fore = JSON.stringify({Weather:body.weather[0].description,Temp:body.main.temp} );
            callback(undefined,fore )
        }
    })
}

module.exports = forecast