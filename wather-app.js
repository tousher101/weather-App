import {config} from './config.js'
const inputElm = document.querySelector('.input-box');
const btnElm  = document.querySelector('.scr-btn');
const APIkey = config.APIKey;
const displayEml  = document.querySelector('.display-section');
const displaySun = document.querySelector('.forecast-display');


setInterval(()=>{
    const now = new Date();
    document.querySelector('.local-Clock').innerHTML = `Time: ${now.toLocaleTimeString()}`;
}, 1000);


btnElm.addEventListener('click', ()=>{
    
    const city = inputElm.value;
    fetch(`${config.baseURL}/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
    .then (response=> response.json())
    .then(data =>{ console.log(data)
        displayEml.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature : ${ data.main.temp}°C <p/> 
        <p> <img class="temp"> Weather : ${data.weather[0].main}</p> 
        <p>Wind Speed : ${data.wind.speed} mil/s<p/>
        <p> Feels Like : ${data.main.feels_like}°C</p>
        <p> Humidity: ${data.main.humidity}%`;
    const iconCode = data.weather[0].icon;
    const iconeurl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    document.querySelector('.temp').src= iconeurl;
    
    })

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`)
        .then(res=>res.json())
        .then(data=>{ 
            const dailyForecast = [];
            data.list.forEach((item)=>{
                if(item.dt_txt.includes('12:00:00')){dailyForecast.push(item);}
               
            });
            
            dailyForecast.forEach((day)=>{
               
                const temp = day.main.temp;
                const discription = day.weather[0].description;
                const date = new Date(day.dt_txt).toDateString();
            
                 displaySun.innerHTML += `<p>${date} - ${temp}°C - ${discription}</p>`
            });
        })
.catch(error => {displayEml.innerHTML = '<p>City Not Found!</p>'} );

});

document.querySelector('.reset-btn').addEventListener('click',()=>{
    displaySun.innerHTML= '';
    displayEml.innerHTML = '';
    inputElm.value = '';


});



/*  function convertUnixToTimezone(unix, timezoneOffset){
            const date = new date((unix+timezoneOffset)*1000);
            return date.toUTCString().match(/(\d{2}:\d{2})/)[0];
        }
      
        const sunRise = convertUnixToTimezone(data.sys.sunrise, data.timezone);
        const sunSet = convertUnixToTimezone(data.sys.sunset, data.timezone);
        displaySun.innerHTML = `<p>Sunrise: ${sunRise}</p>`;
        console.log(data);*/

