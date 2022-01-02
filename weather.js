class Weather {
  constructor(city) {
    this.apiKey = '2c606002f51db32d3f99a31924db4c44';
    this.city = city;
  }

  async getWeather() {
    document.getElementById('content-div').style.display = 'none';
    document.querySelector('.spinner').style.display = 'block';
    await this.timeout(300);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`
    );
    const responseData = await response.json();
    document.getElementById('content-div').style.display = 'flex';
    document.querySelector('.spinner').style.display = 'none';
    return responseData;
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  changeLocation(city) {
    this.city = city;
  }
}
