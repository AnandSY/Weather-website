
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

window.onload = function() {
    document.getElementById('input_field').value = '';
    }

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    messageThree.textContent=''

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
           // messageOne.textContent=''
            messageTwo.textContent=''
            messageThree.textContent=''
        }else{
            const currentWeather = JSON.parse(data.forecast);
            messageOne.textContent=data.location
            messageTwo.textContent='Temperature: '+currentWeather.Temp+' degree Celsius'
            messageThree.textContent='Weather Description: '+currentWeather.Weather
        }
    })
})
})