
function getWeatherIcon(code){

    if(code == 0){
        return "☀️ Clear Sky";
    }

    else if(code == 1 || code == 2){
        return "🌤️ Partly Cloudy";
    }

    else if(code == 3){
        return "☁️ Cloudy";
    }

    else if(code >= 51 && code <= 67){
        return "🌧️ Rain";
    }

    else if(code >= 71 && code <= 77){
        return "❄️ Snow";
    }

    else if(code >= 80 && code <= 82){
        return "🌦️ Rain Showers";
    }

    else if(code >= 95){
        return "⛈️ Thunderstorm";
    }

    else{
        return "🌍 Unknown";
    }

}



async function getWeather(city) {


    let geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );


    let geoData = await geoResponse.json();



    if(!geoData.results){

        alert("City not found");

        return;

    }



    let lat = geoData.results[0].latitude;

    let lon = geoData.results[0].longitude;



    let weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );



    let weatherData = await weatherResponse.json();



    // display city

    document.getElementById("cityName").innerHTML = city;



    // temperature

    document.getElementById("temp").innerHTML =
    weatherData.current.temperature_2m;



    // wind

    document.getElementById("wind").innerHTML =
    weatherData.current.wind_speed_10m;



    // humidity

    document.getElementById("humidity").innerHTML =
    weatherData.current.relative_humidity_2m;



    // weather icon

    let code = weatherData.current.weather_code;


    document.getElementById("code").innerHTML =
    getWeatherIcon(code);


}





function searchWeather(event){

    event.preventDefault();


    let city = document.getElementById("cityInput").value;


    getWeather(city);

}




// default city

getWeather("Delhi");