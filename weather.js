class Weather {
  constructor(city) {
    this.apiKey = '2c606002f51db32d3f99a31924db4c44';
    this.city = city;
  }

  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`
    );
    const responseData = await response.json();
    return responseData;
  }

  changeLocation(city) {
    this.city = city;
  }
}
