document.addEventListener("DOMContentLoaded", () => {
  function fetchWeatherAndAirQuality(latitude, longitude, cityName) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
    const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5`;

    // get date for weather
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        const temperatures = data.hourly.temperature_2m;
        const times = data.hourly.time;
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        let maxTempTime = "";
        let minTempTime = "";

        for (let i = 0; i < temperatures.length; i++) {
          if (temperatures[i] > maxTemp) {
            maxTemp = temperatures[i];
            maxTempTime = times[i];
          }
          if (temperatures[i] < minTemp) {
            minTemp = temperatures[i];
            minTempTime = times[i];
          }
        }

        const cityDisplay = `<div class="city-card">
        <h3>Weather for <br>${cityName}:</h3>
        <div class="temperature">
          <p><strong>Max Temperature:</strong> ${maxTemp} °C <br> <strong>Date:</strong> ${times[0]}</p>
          <p><strong>Min Temperature:</strong> ${minTemp} °C <br> <strong>Date:</strong> ${times[0]}</p>
        </div>
      </div>`;

        document.getElementById("weather-data").innerHTML += cityDisplay;
      })
      .catch((error) =>
        console.error(`Error fetching data for ${cityName} weather:`, error)
      );

    // get airQuality Date
    fetch(airQualityUrl)
      .then((response) => response.json())
      .then((data) => {
        const pm10 = data.hourly.pm10[0];
        const pm25 = data.hourly.pm2_5[0];
        const airQualityTime = data.hourly.time[0];

        const airQualityDisplay = `<div class="city-card">
        <h3>Air Quality for <br>${cityName}:</h3>
        <div class="air-quality-details">
          <p><strong>PM10:</strong> ${pm10} µg/m³ <br> <strong>Date:</strong> ${airQualityTime}</p>
          <p><strong>PM2.5:</strong> ${pm25} µg/m³ <br> <strong>Date:</strong> ${airQualityTime}</p>
        </div>
      </div>`;

        document.getElementById("air-quality-data").innerHTML +=
          airQualityDisplay;
      })
      .catch((error) =>
        console.error(`Error fetching data for ${cityName} air quality:`, error)
      );
  }

  // displays (switching)
  document.getElementById("weather-btn").addEventListener("click", () => {
    document.getElementById("weather-data").style.display = "grid";
    document.getElementById("air-quality-data").style.display = "none";
  });

  document.getElementById("air-quality-btn").addEventListener("click", () => {
    document.getElementById("weather-data").style.display = "none";
    document.getElementById("air-quality-data").style.display = "grid";
  });

  // cities
  fetchWeatherAndAirQuality(35.68, 139.76, "Tokyo");
  fetchWeatherAndAirQuality(64.54, 40.52, "Archangelsk");
  fetchWeatherAndAirQuality(35.23, -80.84, "Charlotte NC");
});
