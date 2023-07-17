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

// Close Modal when clicking anywhere outside
document.addEventListener('click', (e) => {
  if (
    modal.classList.contains('show') &&
    !e.target.closest('.modal-popup') &&
    !e.target.classList.contains('change-location-btn')
  ) {
    closeModal();
  }
});

changeLocationBtn.addEventListener('click', openModal);
saveBtn.addEventListener('click', submit);
cancelBtn.addEventListener('click', closeModal);

// Submit and close modal keyboard events
document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('show') && e.key == 'Escape') {
    closeModal();
  }

  if (modal.classList.contains('show') && e.key == 'Enter') {
    submit();
  }
});

function openModal() {
  modal.classList.add('show');
  cityInput.focus();
  changeLocationBtn.classList.add('noHover');
}

function submit() {
  const city = cityInput.value;

  if (city === '') return;
  if (!onlyLetters(city)) return;

  weather.changeLocation(city);
  storage.setStorageData(city);
  renderWeather();
  modal.classList.remove('show');
  changeLocationBtn.classList.remove('noHover');
  cityInput.value = '';
}

function closeModal() {
  modal.classList.remove('show');
  changeLocationBtn.classList.remove('noHover');
  cityInput.value = '';
}

function renderWeather() {
  weather.getWeather().then((res) => {
    try {
      ui.render(res);
    } catch {
      Swal.fire({ text: 'City not found', confirmButtonColor: '#00008B' });
      modal.style.display = 'flex';
      // Set default city
      weather.changeLocation('Los Angeles');
      renderWeather();
      storage.setStorageData('Los Angeles');
    }
  });
}

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
