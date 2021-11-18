const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Anand Singh Yadav'
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Anand Singh Yadav'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is some helpful text',
        name:'Anand Singh Yadav'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a valid address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anand',
        errorMessage:'Help article not Found'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anand',
        errorMessage:'Page not Found'
    });
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})