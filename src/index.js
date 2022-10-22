let apiKey = "7059cb165caa3316bff682d263a01b1e";

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temp");
  let weatherElement = document.querySelector("#weather");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let emojiIcon = document.querySelector("#emoji-icon");
  let emojiTemp = document.querySelector("#emoji-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
  weatherElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = "today in " + response.data.name;
  windElement.innerHTML = " wind speed: " + response.data.wind.speed + " km/h";
  humidityElement.innerHTML = "humidity: " + response.data.main.humidity + " %";
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiIcon.innerHTML = getEmojiFromIconCode(response.data.weather[0].icon);
  emojiTemp.innerHTML = getEmojiFromTemp(response.data.main.temp);
}

function getEmojiFromTemp(temp) {
  if (temp <= 0) {
    return "🧤";
  }
  if (temp > 0 && temp <= 10) {
    return "🧥";
  }
  if (temp > 10 && temp <= 18) {
    return "👖";
  }
  if (temp > 18 && temp <= 25) {
    return "👕";
  }
  if (temp > 25 && temp <= 32) {
    return "🩳";
  } else {
    return "👙";
  }
}

function getEmojiFromIconCode(iconCode) {
  const codeMap = {
    "01d": "🕶",
    "02d": "🧢",
    "03d": "🌂",
    "04d": "🌂",
    "09d": "☂️",
    "10d": "☔️",
    "11d": "🥽",
    "13d": "⛸",
    "50d": "🦺",
    "01n": "👡",
    "02n": "👠",
    "03n": "🌂",
    "04n": "🌂",
    "09n": "☂️",
    "10n": "☔️",
    "11n": "🥽",
    "13n": "⛸",
    "50n": "🔦",
  };
  // let code = iconCode.replace(/[nd]/g, "");
  // console.log(code);
  // let dayOrNight = iconCode.replace(/\d/g, "");
  // console.log(dayOrNight);

  return codeMap[iconCode];
}

function updateDisplayWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
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

let currentTime = document.querySelector("currentTime");
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

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

// function degreesToFahrenheit(event) {
//   event.preventDefault();
//   let h4 = document.querySelector("#current-temp");
//   currentTemp.innerHTML = 84;
// }
// let tempF = document.querySelector("#fahrenheit");
// tempF.addEventListener("click", degreesToFahrenheit);

// function degreesToCelcius(event) {
//   event.preventDefault();
//   let h4 = document.querySelector("#current-temp");
//   currentTemp.innerHTML = 29;
// }
// let tempC = document.querySelector("#celcius");
// tempC.addEventListener("click", degreesToCelcius);
