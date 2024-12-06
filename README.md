# Weather Dashboard

This is a simple weather dashboard application that allows users to search for weather information by city name or use their current location to get weather updates.

## Features

- Search for weather information by city name
- Use current location to get weather updates
- Display current weather and 5-day forecast
- Show temperature, wind speed, and humidity


## Usage

1. Open `index.html` in your web browser.
2. Enter a city name in the input field and click the "Search" button to get weather information.
3. Alternatively, click the "Use Current Location" button to get weather updates for your current location.

## Code Overview

### `index.html`

This file contains the HTML structure of the application, including the input fields and buttons for searching weather information.

### `script.js`

This file contains the JavaScript code for fetching weather data from the OpenWeatherMap API and updating the DOM with the weather information.

Key functions:
- `createWeatherCard(cityName, weatherItem, index)`: Creates HTML for weather cards.
- `getWeatherDetails(cityName, lat, lon)`: Fetches weather details from the API and updates the DOM.

### `style.css`

This file contains the CSS styles for the application.

## API Key

The application uses the OpenWeatherMap API to fetch weather data. Make sure to replace the `API_KEY` variable in `script.js` with your own API key.

## License

This project is licensed under the MIT License.