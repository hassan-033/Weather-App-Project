const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const locationBtn = document.querySelector(".location-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");
const currentWeatherDiv = document.querySelector(".current-weather");
const API_KEY = "e95e04eb1937f581d6582fd13e68d452 ";

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    // HTML for main weather card
    return `<div class="details">
                <h3>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
                <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(
                  2
                )}*C</h4>
              <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
              <h4>Humidity: ${weatherItem.main.humidity}%</h4>
              </div>
              <div class="icon">
              <img
                src="https://openweathermap.org/img/wn/${
                  weatherItem.weather[0].icon
                }@4x.png"
                alt="weather-icon"
              />
              <h4> ${weatherItem.weather[0].description} </h4>
              </div>
              `;
  } else {
    // HTML for other five day forecast card
    return `
      <li class="card">
              <h3>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
              <img
              src="https://openweathermap.org/img/wn/${
                weatherItem.weather[0].icon
              }@2x.png"
              alt="weather-icon"
              />
              <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(
                2
              )}*C</h4>
              <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
              <h4>Humidity: ${weatherItem.main.humidity}%</h4>
              </li>
              `;
  }
};

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(WEATHER_API_URL)
    .then((res) =>
      res.json().then((data) => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter((forecast) => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
          if (index === 0) {
            currentWeatherDiv.insertAdjacentHTML(
              "beforeend",
              createWeatherCard(cityName, weatherItem, index)
            );
          } else {
            weatherCardsDiv.insertAdjacentHTML(
              "beforeend",
              createWeatherCard(cityName, weatherItem, index)
            );
          }
        });
      })
    )
    .catch(() => {
      alert("An error occured while fetching the weather forecast");
    });
};

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (!cityName) return;

  const GEOCODING_AP_IURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_AP_IURL)
    .then((res) =>
      res.json().then((data) => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
      })
    )
    .catch(() => {
      alert("An error occured while fetching the coordinates");
    });
};

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords; // Get coordintes of user location
      const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

      // Get city name from coordinates using reverse geocoding API
      fetch(REVERSE_GEOCODING_URL)
        .then((res) => res.json())
        .then((data) => {
          const { name } = data[0];
          getWeatherDetails(name, latitude, longitude);
        })

        .catch(() => {
          alert("An error occured while fetching the city!");
        });
    },
    (error) => {
      // show alert if user denied location permission
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Goelocation request failed. Please reset location permission to grant access again"
        );
      }
    }
  );
};

locationBtn.addEventListener("click", getUserCoordinates);
searchBtn.addEventListener("click", getCityCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates())
