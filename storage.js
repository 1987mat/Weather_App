class Storage {
  constructor() {
    this.city;
    this.defaultCity = 'Los Angeles';
  }

  getStorageData() {
    if (localStorage.getItem('city') === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem('city');
    }

    return {
      city: this.city,
    };
  }

  setStorageData(city) {
    localStorage.setItem('city', city);
  }
}
