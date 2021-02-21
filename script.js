const email = "admin@yopmail.com";
const password = "adminyopmail";

function showWeather() {
    const xhrObj = new XMLHttpRequest();

    const url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=KGVMhb1HTYOEl28HUkA0sCcGstJBWrK6&metric=true";

    xhrObj.open("GET", url);

    xhrObj.onload = displayWeather;
    xhrObj.onerror = errMessage;

    xhrObj.send();
}
// my weather app

function displayWeather(resp) {
    const userEmail = document.getElementById("user-email");
    const userEmailValue = userEmail.value;

    const userPassword = document.getElementById("user-password");
    const userPasswordValue = userPassword.value;

    const parsedData = JSON.parse(resp.target.response);

    const dailyForecast = parsedData.DailyForecasts;
    // console.log(parsedData);

    if (userEmailValue === email && userPasswordValue === password) {
        for (let i = 0; i < dailyForecast.length; i++) {

            const date = dailyForecast[i].Date;
            const maxTemp = dailyForecast[i].Temperature.Maximum.Value;
            const minTemp = dailyForecast[i].Temperature.Minimum.Value;
            const day = dailyForecast[i].Day.IconPhrase;
            const night = dailyForecast[i].Night.IconPhrase;

            const onDisplay = `${date}
    Max: ${maxTemp}C Min: ${minTemp}C
    Day: ${day} Night: ${night}`;

            let weatherContainer = document.getElementById("weather-container");
            let newDivEl = document.createElement("div");

            newDivEl.innerText = onDisplay;
            weatherContainer.appendChild(newDivEl);
        }
    } else {
        const errMessage = `Error! Please complete the 
        form!
        * Email address must be filled in!
        * Password length must be at
        least 6 characters!`;

        let weatherContainer = document.getElementById("weather-container");
        let newDivErrEl = document.createElement("div");

        newDivErrEl.style.color = "red";
        newDivErrEl.innerText = errMessage;
        weatherContainer.appendChild(newErrDivEl);
    }
}

function errMessage() {


}







// const dateObj = new Date();

// const days = dateObj.getDay();
// const month = dateObj.getMonth();
// const date = dateObj.getDate();




//  document.getElementById("message-date-time-container").innerHTML 