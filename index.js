document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error response");
      }
      return response.json();
    })
    .then((data) => {
      // make const from data
      const temperatures = data.hourly.temperature_2m;
      const times = data.hourly.time;

      // find max-min temperatures and time
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

      // make <p> from  data information
      const maxTempDisplay = `<p>Max Temperature: ${maxTemp} °C at ${maxTempTime}</p>`;
      const minTempDisplay = `<p>Min Temperature: ${minTemp} °C at ${minTempTime}</p>`;

      // load maxTempDisplay and minTempDisplay to page
      document.getElementById("max-min-data").innerHTML =
        maxTempDisplay + minTempDisplay;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
