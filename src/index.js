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
  let currentTemperature = document.querySelector("#current-temperature");
  let cityName = document.querySelector("#destination");
  let currentDescription = document.querySelector("#current-description");
  //let rainElement = document.querySelector("#current-rain");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#current-icon");

  let celsiusTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${celsiusTemperature}`;

  let location = response.data.name;
  let description = response.data.weather[0].description;
  //let rain = Math.round(response.data.precipitation.mode);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  cityName.innerHTML = `${location}`;
  currentDescription.innerHTML = `${description}`;
  //rainElement.innerHTML = `${rain}`;
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Function 3: Load current geographical Position & Weather of user by re-loading and opening the side
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

function search(city) {
  let apiKey = "3b0dd576d30fcc1cc16ccaf31a91c33f";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentStatus);
}

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
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//Make a global temperature Variable to convert celisius to fahrenheit & back
let celsiusTemperature = null;

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

//Alert function to convert temperature units
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Vienna");
