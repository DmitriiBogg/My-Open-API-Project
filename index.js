document.addEventListener("DOMContentLoaded", () => {
  function fetchWeatherAndAirQuality(latitude, longitude, cityName) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
    const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5`;

    // Get and work Temperatures API
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

        const cityDisplay = `<div class="city-card"><h3>Weather for ${cityName}:</h3></div>`;
        const weatherDetails = `
          <div class="temperature">
            <p><strong>Max:</strong> ${maxTemp} °C <strong>Data:</strong> ${maxTempTime}</p>
            <p><strong>Min:</strong> ${minTemp} °C <strong>Data:</strong> ${minTempTime}</p>
          </div>`;

        document.getElementById("weather-data").innerHTML +=
          cityDisplay + weatherDetails;
      })
      .catch((error) =>
        console.error(`Error fetching data for ${cityName} weather:`, error)
      );

    // Get and work Quality API
    fetch(airQualityUrl)
      .then((response) => response.json())
      .then((data) => {
        const pm10 = data.hourly.pm10[0];
        const pm25 = data.hourly.pm2_5[0];
        const airQualityTime = data.hourly.time[0];

        const airQualityDisplay = `<div class="city-card"><h3>Air Quality for ${cityName}:</h3></div>`;
        const pm10Display = `<p><strong>PM10:</strong> ${pm10} µg/m³ <strong>Data:</strong> ${airQualityTime}</p>`;
        const pm25Display = `<p><strong>PM2.5:</strong> ${pm25} µg/m³ <strong>Data:</strong> ${airQualityTime}</p>`;

        document.getElementById("air-quality-data").innerHTML +=
          airQualityDisplay + pm10Display + pm25Display;
      })
      .catch((error) =>
        console.error(`Error fetching data for ${cityName} air quality:`, error)
      );
  }

  // displays (switching)
  document.getElementById("weather-btn").addEventListener("click", () => {
    document.getElementById("weather-data").style.display = "block";
    document.getElementById("air-quality-data").style.display = "none";
  });

  document.getElementById("air-quality-btn").addEventListener("click", () => {
    document.getElementById("weather-data").style.display = "none";
    document.getElementById("air-quality-data").style.display = "block";
  });

  // cities
  fetchWeatherAndAirQuality(52.52, 13.41, "Berlin");
  fetchWeatherAndAirQuality(55.75, 37.62, "Moscow");
  fetchWeatherAndAirQuality(35.23, -80.84, "Charlotte NC");
});
