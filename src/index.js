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

  celsiusTemperature = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);

  let icon = document.querySelector("#current-icon");

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
  if (response.data.weather[0].description === "clear sky") {
    icon.setAttribute("src", "img/01d.svg");
    icon.setAttribute("alt", "sunny");
  } else if (
    response.data.weather[0].description === "few clouds" ||
    "scattered clouds"
  ) {
    icon.setAttribute("src", "img/02d.svg");
    icon.setAttribute("alt", "cloudy");
  } else if (
    response.data.weather[0].description === "broken clouds" ||
    "overcast clouds"
  ) {
    icon.setAttribute("src", "img/03d.svg");
    icon.setAttribute("alt", "broken-clouds");
  } else if (response.data.weather[0].description === "mist") {
    icon.setAttribute("src", "img/04d.svg");
    icon.setAttribute("alt", "mist");
  } else if (response.data.weather[0].description === "shower rain") {
    icon.setAttribute("src", "img/09d.svg");
    icon.setAttribute("alt", "shower-rain");
  } else if (response.data.weather[0].description === "rain") {
    icon.setAttribute("src", "img/10d.svg");
    icon.setAttribute("alt", "rainy");
  } else if (response.data.weather[0].description === "thunderstorm") {
    icon.setAttribute("src", "img/11d.svg");
    icon.setAttribute("alt", "thunderstorms");
  } else if (response.data.weather[0].description === "snow") {
    icon.setAttribute("src", "img/13d.svg");
    icon.setAttribute("alt", "snowy");
  }
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
  let temperatureElement = document.querySelector("#current-temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

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
