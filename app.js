window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span ");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=eae7e74b6ee3f257f347c4c286437a6e";

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const temp = (data.main.temp - 273.15).toFixed(2);

          const summary = data.weather[0].description;

          const icon = "PARTLY_CLOUDY_DAY";

          //Formula for Celcius
          let f = temp * (9 / 5) + 32;

          //Set DOM Elements from the API

          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.name + "/" + data.sys.country;

          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = f;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
