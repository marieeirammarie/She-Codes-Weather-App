// Function 1: Load current Date & Time
function loadDate(now) {
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} –  ${date} ${month} –  ${hours} : ${minutes}`;
}

// Alert Function 1: Load current Date & Time
let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = loadDate(now);

// Function 2: Show current Status (Position & Weather)
function showCurrentStatus(response) {
  let cityName = document.querySelector("#destination");
  let currentTemperature = document.querySelector("#current-temperature");
  //let rainElement = document.querySelector("#current-rain");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");

  let location = response.data.name;
  //let rain = Math.round(response.data.precipitation.mode);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  let celsiusTemperature = Math.round(response.data.main.temp);

  cityName.innerHTML = `${location}`;
  currentTemperature.innerHTML = `${celsiusTemperature}`;
  //rainElement.innerHTML = `${rain}`;
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
}

// Function 3: Load current Position & Weather
function loadCurrentStatus(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3b0dd576d30fcc1cc16ccaf31a91c33f";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentStatus);
}

// Alert Function 2 & 3: Load current location by re-loading the page
navigator.geolocation.getCurrentPosition(loadCurrentStatus);

//Function 6:
function showSearchedTemperature(response) {
  let cityName = document.querySelector("#destination");
  let currentTemperature = document.querySelector("#current-temperature");
  //let rainElement = document.querySelector("#current-rain");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");

  let location = response.data.name;
  //let rain = Math.round(response.data.precipitation.mode);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  let celsiusTemperature = Math.round(response.data.main.temp);

  cityName.innerHTML = `${location}`;
  currentTemperature.innerHTML = `${celsiusTemperature}`;
  //rainElement.innerHTML = `${rain}`;
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
}

//Function 5: Connect destination with API
function search(city) {
  let apiKey = "3b0dd576d30fcc1cc16ccaf31a91c33f";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchedTemperature);
}

//Alert function 4, 5 & 6: Connect typed location with API + Show weather
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiustemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("location-search");
form.addEventListener("submit", handleSubmit);

//Alert function to convert temperature units
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);

search("Vienna");
