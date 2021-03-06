// DOM Elements
const changeLocationBtn = document.querySelector('.change-location-btn');
const modal = document.querySelector('.modal-popup');
const cityInput = document.getElementById('city');
const saveBtn = document.querySelector('.save-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// Init storage object
const storage = new Storage();

// Get city from LS
const savedLocation = storage.getStorageData();

// Init weather object
const weather = new Weather(savedLocation.city);

// Init ui object
const ui = new UI();

// EVENTS
document.addEventListener('DOMContentLoaded', renderWeather);

function renderWeather() {
  weather.getWeather().then((res) => {
    try {
      ui.render(res);
    } catch {
      Swal.fire({ text: 'City not found', confirmButtonColor: '#00008B' });

      modal.style.display = 'flex';
      weather.changeLocation('Los Angeles');
      renderWeather();
      storage.setStorageData('Los Angeles');
    }
  });
}

changeLocationBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  cityInput.focus();
  changeLocationBtn.classList.add('noHover');
});

saveBtn.addEventListener('click', () => {
  const city = cityInput.value;

  if (city === '') return;
  if (!onlyLetters(city)) return;

  weather.changeLocation(city);
  storage.setStorageData(city);
  renderWeather();
  modal.style.display = 'none';
  changeLocationBtn.classList.remove('noHover');
  cityInput.value = '';
});

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  changeLocationBtn.classList.remove('noHover');
  cityInput.value = '';
});

// Input validation
function onlyLetters(input) {
  const letters = /^[A-Za-z\s]+$/;
  if (letters.test(input)) {
    return true;
  } else {
    Swal.fire({
      text: 'Please enter a valid city',
      confirmButtonColor: '#00008B',
    });

    cityInput.value = '';
    storage.setStorageData('Los Angeles');
    return false;
  }
}
