// DOM Elements
const changeLocationBtn = document.querySelector('.change-location-btn');
const modal = document.querySelector('.modal-popup');
const cityInput = document.getElementById('city');
const saveBtn = document.querySelector('.save-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// Init storage object
const storage = new Storage();

const savedLocation = storage.getStorageData();

// Init weather object
const weather = new Weather(savedLocation.city);

// Init ui object
const ui = new UI();

document.addEventListener('DOMContentLoaded', renderWeather);

function renderWeather() {
  weather.getWeather().then((res) => {
    try {
      ui.render(res);
    } catch {
      Swal.fire('City not found');
    }
  });
}

function onlyLetters(input) {
  const letters = /^[A-Za-z]+$/;
  if (letters.test(input)) {
    return true;
  } else {
    Swal.fire('Please enter a valid city');
    return false;
  }
}

changeLocationBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

saveBtn.addEventListener('click', () => {
  const city = cityInput.value;

  if (city === '') return;
  if (!onlyLetters(city)) return;

  weather.changeLocation(city);
  storage.setStorageData(city);
  renderWeather();
  modal.style.display = 'none';
  cityInput.value = '';
});

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  cityInput.value = '';
});
