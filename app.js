// Init weather object
const weather = new Weather('Seattle');

// Init ui object
const ui = new UI();

document.addEventListener('DOMContentLoaded', renderWeather);

function renderWeather() {
  weather
    .getWeather()
    .then((res) => {
      console.log(res);
      console.log(res.weather[0].icon);
      ui.render(res);
    })
    .catch((err) => console.log(err));
}
