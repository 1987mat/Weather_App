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
    this.temp.textContent = `${kelvinToFah(weather.main.temp)}\u{02109}
    `;
    this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
    this.description.textContent = `${
      weather.weather[0].description.charAt(0).toUpperCase() +
      weather.weather[0].description.slice(1)
    }`;
    this.feelsLike.innerHTML =
      'Feels like <strong style="color:whitesmoke">' +
      kelvinToFah(weather.main.feels_like) +
      '\u{02109}</strong>';
    this.humidity.innerHTML =
      'Humidity: <strong style="color:whitesmoke">' +
      weather.main.humidity +
      '%</strong>';
  }
}

// Convert Kelvin to F
function kelvinToFah(temp) {
  let f = Math.round((temp * 9) / 5 - 459.67);
  return f;
}
