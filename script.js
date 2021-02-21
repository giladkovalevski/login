const email = "admin@yopmail.com";
const password = "adminyopmail";

const message = document.getElementById("message-date-time-container");
message.innerHTML = moment().format('LL');;

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

    const parsedData = JSON.parse(resp.target.response);

    const dailyForecast = parsedData.DailyForecasts;
    // console.log(parsedData);

    if (userEmailValue === email && userPasswordValue === password) {
        for (let i = 0; i < dailyForecast.length; i++) {

            const date = dailyForecast[i].Date;
            const dateDiv = document.createElement("span");
            dateDiv.innerHTML = `\n${date}`;
            dateDiv.style.color = "blue";
            dateDiv.style.textDecoration = "underline";
            console.log(dateDiv);
            const maxTemp = dailyForecast[i].Temperature.Maximum.Value;
            const minTemp = dailyForecast[i].Temperature.Minimum.Value;
            const day = dailyForecast[i].Day.IconPhrase;
            const night = dailyForecast[i].Night.IconPhrase;

            const onDisplay = `Max: ${maxTemp}C Min: ${minTemp}C
    Day: ${day} Night: ${night}`;

            let weatherContainer = document.getElementById("weather-container");
            let newDivEl = document.createElement("p");
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
        // newDivErrEl.style.color = "red";
        // newDivErrEl.innerText = `* Email address must be filled in!`;

        // weatherContainer.appendChild(newDivErrEl);

    } else if (userEmailValue === "" && userPasswordValue.length >= 6) {
        let errorsContainer = document.getElementById("errors");
        let newDivErrEl = document.createElement("div");
        const errMessage = `Error! Please complete the 
        form!
        * Email address must be filled in!
        `;

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
    }
    else {
        let errorsContainer = document.getElementById("errors");
        errorsContainer.style.display = "none";
        showWeather();
    }

    console.log(userEmailValue + userPasswordValue);
}







// const dateObj = new Date();

// const days = dateObj.getDay();
// const month = dateObj.getMonth();
// const date = dateObj.getDate();




//  document.getElementById("message-date-time-container").innerHTML 