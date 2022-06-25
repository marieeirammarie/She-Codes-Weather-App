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
  let location = response.data.name;
  let cityName = document.querySelector("#destination");
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  //let rainElement = document.querySelector("#current-rain");
  //let rain = response.data.precipitation.mode;
  let humidityElement = document.querySelector("#current-humidity");
  let humidity = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#current-wind");
  let wind = Math.round(response.data.wind.speed);
  cityName.innerHTML = `${location}`;
  currentTemperature.innerHTML = `${temperature}`;
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

//Alert Function 2 & 3: Load current location via the form button
let showHome = document.querySelector("#submit-home");
searchCity.addEventListener("submit", showCurrentStatus);

//Function 6: Connect destination with API
function showSearchedTemperature(response) {
  let location = response.data.name;
  let cityName = document.querySelector("#destination");
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  //let rainElement = document.querySelector("#current-rain");
  //let rain = response.data.precipitation.mode;
  let humidityElement = document.querySelector("#current-humidity");
  let humidity = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#current-wind");
  let wind = Math.round(response.data.wind.speed);
  cityName.innerHTML = `${location}`;
  currentTemperature.innerHTML = `${temperature}`;
  //rainElement.innerHTML = `${rain}`;
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
}
//Function 5: Connect destination with API
function search(city) {
  let apiKey = "3b0dd576d30fcc1cc16ccaf31a91c33f";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${userCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchedTemperature);
}

//Function 4: User types destination
function submitSearchLocation(event) {
  event.preventDefault;
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
}

let temperature = null;

search("Vienna");

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature.innerHTML * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

//Alert function 4, 5 & 6: Connect typed location with API + Show weather
let form = document.querySelector("location-search");
form.addEventListener("submit", submitSearchLocation);

//Alert function to convert temperature units
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);
