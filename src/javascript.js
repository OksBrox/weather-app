let currentDate = document.querySelector(".current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[new Date().getDay()];
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
let month = months[new Date().getMonth()];
let todayDate = new Date().getDate();
let year = new Date().getFullYear();

currentDate.innerHTML = `${today}<br>${month} ${todayDate}, ${year}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTMl = "";
  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastDays.forEach(function (day) {
    forecastHTMl =
      forecastHTMl +
      `      
    <div class="col future-weather-details">
      <p class="future-date">${day}</p>
      <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" id="icon" width="47"/>
      <p class="future-reading">
        <span class="future-reading-max">22</span> /
        <span class="future-reading-min">20</span>
      </p>
    </div>
  `;
  });

  forecastElement.innerHTML = forecastHTMl;
}

function getForecast(coordinates) {
  let apiKey = "b2d6f6a9f3da8414aade5b1c466f79b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mps`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", `${response.data.weather[0].main}`);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b2d6f6a9f3da8414aade5b1c466f79b1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "b2d6f6a9f3da8414aade5b1c466f79b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature-now").innerHTML = Math.round(
    (parseInt(celsiusTemperature) * 9) / 5 + 32
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature-now").innerHTML =
    Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#current-Fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#current-Celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature;

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
