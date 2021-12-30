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

function onlyLetters(input) {
  let letters = /^[A-Za-z]+$/;
  if (letters.test(input)) {
    return true;
  } else {
    alert('Please enter a valid city');
    return false;
  }
}
