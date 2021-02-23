const email = "admin@yopmail.com";
const password = "adminyopmail";

const message = document.getElementById("message-date-time-container");
const messageDiv = document.createElement("span");
const messageDivGreen = document.createElement("span");

function autoRefresh() {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var d = date.toDateString();
    document.getElementById('message-date-time-container').innerHTML = `Today's message: "in init" <br> Today's date: ${d} <br>Time now: ${time}`;
}
setInterval(autoRefresh, 1000);

function showWeather() {

    const xhrObj = new XMLHttpRequest();

    const url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=KGVMhb1HTYOEl28HUkA0sCcGstJBWrK6&metric=true";

    xhrObj.open("GET", url);

    xhrObj.onload = displayWeather;

    xhrObj.send();
}

function displayWeather(resp) {

    const userEmail = document.getElementById("user-email");
    const userEmailValue = userEmail.value;

    const userPassword = document.getElementById("user-password");
    const userPasswordValue = userPassword.value;

    userEmail.value = "";
    userPassword.value = "";

    const parsedData = JSON.parse(resp.target.response);

    const dailyForecast = parsedData.DailyForecasts;

    if (userEmailValue === email && userPasswordValue === password) {

        const weatherContainer = document.getElementById("weather-container");
        weatherContainer.innerHTML = "";
        
        for (let i = 0; i < dailyForecast.length; i++) {

            const date = dailyForecast[i].Date;
            const dateDiv = document.createElement("span");
            dateDiv.innerHTML = `\n${date}`;// look over again!!!!
            dateDiv.style.color = "blue";
            dateDiv.style.textDecoration = "underline";

            const maxTemp = dailyForecast[i].Temperature.Maximum.Value;
            const minTemp = dailyForecast[i].Temperature.Minimum.Value;
            const day = dailyForecast[i].Day.IconPhrase;
            const night = dailyForecast[i].Night.IconPhrase;

            const onDisplay = `Max: ${maxTemp}C Min: ${minTemp}C
    Day: ${day} Night: ${night}`;

            const newDivEl = document.createElement("p");
            newDivEl.style.margin = "0";
            weatherContainer.appendChild(dateDiv);
            newDivEl.innerText = onDisplay;
            weatherContainer.appendChild(newDivEl);
        }
    }
}

function submitHandler(event) {
    event.preventDefault();
    const userEmail = document.getElementById("user-email");
    const userEmailValue = userEmail.value;


    const userPassword = document.getElementById("user-password");
    const userPasswordValue = userPassword.value;

    if (userEmailValue === "" && userPasswordValue.length < 6) {
        let errorsContainer = document.getElementById("errors");
        let newDivErrEl = document.createElement("div");
        const errMessage = `Error! Please complete the 
        form!
        * Email address must be filled in!
        * Password length must be at
        least 6 characters!`;

        newDivErrEl.style.color = "red";
        newDivErrEl.innerText = errMessage;
        errorsContainer.appendChild(newDivErrEl);

    } else if (userEmailValue === "" && userPasswordValue.length >= 6) {
        let errorsContainer = document.getElementById("errors");
        let newDivErrEl = document.createElement("div");
        const errMessage = `Error! Please complete the 
        form!
        * Email address must be filled in!`;

        newDivErrEl.style.color = "red";
        newDivErrEl.innerText = errMessage;
        errorsContainer.appendChild(newDivErrEl);

    } else if (userEmailValue !== "" && userPasswordValue.length < 6) {
        let errorsContainer = document.getElementById("errors");
        let newDivErrEl = document.createElement("div");
        const errMessage = `Error! Please complete the 
        form!
        * Password length must be at
        least 6 characters!`;

        newDivErrEl.style.color = "red";
        newDivErrEl.innerText = errMessage;
        errorsContainer.appendChild(newDivErrEl);
    } else if (userEmailValue !== email && userPasswordValue !== password) {
        let errorsContainer = document.getElementById("errors");
        let newDivErrEl = document.createElement("div");
        const errMessage = `Error! Please complete the 
        form!
        * Wrong email or password`;

        newDivErrEl.style.color = "red";
        newDivErrEl.innerText = errMessage;
        errorsContainer.appendChild(newDivErrEl);
    } else {
        let errorsContainer = document.getElementById("errors");
        errorsContainer.style.display = "none";
        showWeather();
    }
}