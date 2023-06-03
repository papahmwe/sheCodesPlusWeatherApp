function formatDate(data) {
  let date = new Date(data);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return day;
}

function formatDay(data) {
  let date = new Date(data * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="week-box">
                <div class="week-date">
                    <div class="days">${formatDay(forecastDay.time)}</div>
                </div>
                <div class="week-temperature">
                    <img src="${
                      forecastDay.condition.icon_url
                    }" alt="sunnyImage" class="sunny-image"/>
                    <div class="temp">${Math.round(
                      forecastDay.temperature.maximum
                    )}°C</div>
                    <div class="temp-weather">${
                      forecastDay.condition.description
                    }</div>
                </div>
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ab9600dft6o18af2333fb1043a3d0e94";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let celsiusTemperature;
let cityInputElement = "yangon";

function displayTemperature(response) {
  let cityElement = document.querySelector(".city");
  let dayElement = document.querySelector(".day");
  let temperatureValue = document.querySelector("#value");
  let weatherElement = document.querySelector(".weather");
  let windElement = document.querySelector(".wind");
  let humidityElement = document.querySelector(".humidity");
  let iconElement = document.querySelector(".sun-image");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureValue.innerHTML = Math.round(celsiusTemperature);
  weatherElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind:${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;
  humidityElement.innerHTML = `Humidity:${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(cityElement) {
  let apiKey = "9764adca81e73abc4c440c7b3573baa2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSumbit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector("#inputBox").value;
  searchCity(cityInputElement);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#value");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureValue.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperatureValue = document.querySelector("#value");

  temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

let button = document.querySelector("#form");
button.addEventListener("click", handleSumbit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

searchCity(cityInputElement);
