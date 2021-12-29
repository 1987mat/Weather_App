class UI {
  constructor() {
    this.location = document.getElementById('location');
    this.temp = document.getElementById('temp');
    this.icon = document.getElementById('icon');
    this.description = document.getElementById('description');
    this.feelsLike = document.getElementById('feels-like');
    this.humidity = document.getElementById('humidity');
  }

  render(weather) {
    this.location.textContent = weather.name;
    this.temp.textContent = `${kelvinToFah(weather.main.temp)}\U2109;`;
    this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
    this.description.textContent = `${weather.weather[0].description}`;
    this.feelsLike.textContent = `Feels Like: ${kelvinToFah(
      weather.main.feels_like
    )}`;
    this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
  }
}

function kelvinToFah(temp) {
  let f = Math.round((temp * 9) / 5 - 459.67);
  return f;
}

// const openModalBtn = document.querySelector('.modal-btn');
// const modal = document.querySelector('.modal-popup');
// const cityInput = document.getElementById('city');
// const saveBtn = document.querySelector('.save-btn');
// const cancelBtn = document.querySelector('.cancel-btn');

// openModalBtn.addEventListener('click', () => {
//   modal.style.display = 'block';
// });

// cancelBtn.addEventListener('click', () => {
//   modal.style.display = 'none';
//   cityInput.value = '';
//   stateInput.value = '';
// });

// saveBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const city = cityInput.value;
// });
