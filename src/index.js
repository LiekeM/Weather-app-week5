let apiKey = "7059cb165caa3316bff682d263a01b1e";

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temp");
  let weatherElement = document.querySelector("#weather");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + " °C";
  console.log(response);
  weatherElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = " wind speed: " + response.data.wind.speed;
  humidityElement.innerHTML = "humidity: " + response.data.main.humidity;
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

let h3 = document.querySelector("h3");
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
h3.innerHTML = `${day}, ${hours}:${minutes}`;
