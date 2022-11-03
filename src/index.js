let apiKey = "ca3bao1ae6a5d30ff038901b133ffc4t";

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temp");
  let weatherElement = document.querySelector("#weather");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let emojiIcon = document.querySelector("#emoji-icon");
  let emojiTemp = document.querySelector("#emoji-temp");

  celciusTemperature = response.data.daily[0].temperature.day;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  console.log(response);
  weatherElement.innerHTML = response.data.daily[0].condition.description;
  cityElement.innerHTML = "today in " + response.data.city;
  windElement.innerHTML =
    " wind speed: " + response.data.daily[0].wind.speed + " km/h";
  humidityElement.innerHTML =
    "humidity: " + response.data.daily[0].temperature.humidity + " %";
  // iconElement.setAttribute(
  //   "src",
  //   `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`
  // );
  emojiIcon.innerHTML = getEmojiFromIconCode(
    response.data.daily[0].condition.icon
  );
  emojiTemp.innerHTML = getEmojiFromTemp(
    response.data.daily[0].temperature.day
  );

  return response;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecastCol");

  let weatherForecfastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      weatherForecfastHTML =
        weatherForecfastHTML +
        `
      
        <div class="col-2">
          <div class="weather-forecat-date">${formatDay(forecastDay.time)}</div>
          <br/>
           <div class="emojiContainerForecast">
            <div class="emoji2" id="emoji-temp-forecast">${getEmojiFromTemp(
              forecastDay.temperature.day
            )}
            &nbsp;+&nbsp; 
            ${getEmojiFromIconCode(forecastDay.condition.icon)}
            </div>
          </div>
      <br/>
          <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temperature.maximum
            )}°C</span>
            <span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temperature.minimum
            )}°C</span>
          </div>
        </div>
    
   
    `;
    }
  });

  weatherForecfastHTML = weatherForecfastHTML + "</div>";
  forecastElement.innerHTML = weatherForecfastHTML;
}

function getEmojiFromTemp(temp) {
  if (temp <= 0) {
    return "🧤";
  }
  if (temp > 0 && temp <= 8) {
    return "🧣";
  }
  if (temp > 8 && temp <= 14) {
    return "🧥";
  }
  if (temp > 14 && temp <= 20) {
    return "👖";
  }
  if (temp > 20 && temp <= 25) {
    return "👕";
  }
  if (temp > 25 && temp <= 30) {
    return "🩳";
  } else {
    return "👙";
  }
}

function getEmojiFromIconCode(iconCode) {
  const codeMap = {
    "clear-sky-day": "🕶",
    "few-clouds-day": "🧢",
    "scattered-clouds-day": "📷",
    "broken-clouds-day": "🌂",
    "shower-rain-day": "☂️",
    "rain-day": "☔️",
    "thunderstorm-day": "🥽",
    "snow-day": "⛸",
    "mist-day": "🦺",
    "clear-sky-night": "👡",
    "few-clouds-night": "👞",
    "scattered-clouds-night": "👢",
    "broken-clouds-night": "🌂",
    "shower-rain-night": "☂️",
    "rain-night": "☔️",
    "thunderstorm-night": "🥽",
    "snow-night": "⛸",
    "mist-night": "🔦",
  };
  // let code = iconCode.replace(/[nd]/g, "");
  // console.log(code);
  // let dayOrNight = iconCode.replace(/\d/g, "");
  // console.log(dayOrNight);

  return codeMap[iconCode];
}

function updateDisplayWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&units=metric`;
  axios
    .get(`${apiUrl}&key=${apiKey}`)
    .then(displayWeather)
    .then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  updateDisplayWeather(inputCity.value);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&units=metric`;
  axios
    .get(`${apiUrl}&key=${apiKey}`)
    .then(displayWeather)
    .then(displayForecast);
}

function updateGeoLoc() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", updateGeoLoc);

updateGeoLoc();

let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = document.querySelector(".currentTime");
let day = days[currentDate.getDay()];
let hours = addZero(currentDate.getHours());
let minutes = addZero(currentDate.getMinutes());

function addZero(convert) {
  if (convert < 10) {
    return "0" + convert;
  } else {
    return convert;
  }
}
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelcius);

// displayForecast(response);
