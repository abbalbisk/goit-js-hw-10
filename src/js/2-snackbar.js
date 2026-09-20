import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('[type=number]');
const fieldset = document.querySelector('.stateradio');

let selectedValue = null;

fieldset.addEventListener('change', e => {
  if (e.target.name === 'state' && e.target.checked) {
    selectedValue = e.target.value;
    console.log('оновлено:', selectedValue);
  }
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const userDelay = Number(inputEl.value);

  makePromise(userDelay, selectedValue)
    .then(delay => {
      iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms` });
    })
    .catch(delay => {
      iziToast.error({ message: `❌ Rejected promise in ${delay}ms` });
    });

  formEl.reset();
});

const makePromise = (delay, selectedValue) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedValue === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};
