window.addEventListener("load", () => {
  let lat;
  let long;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6d08320aa6173a624393b2dce980c2e1/${lat},${long}`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          const { temperature, summary, icon } = data.currently;

          console.log(data);

          // set elements
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    console.log(currentIcon)
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
