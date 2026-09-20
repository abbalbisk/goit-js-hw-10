import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form')
const btn = document.querySelector('.btncreate');
const inputEl = document.querySelector('[type=number]');
const fieldset = document.querySelector('.stateradio')

let userDelay = null;
let selectedValue = null;

fieldset.addEventListener('change', (e) => {
    if (e.target.name === 'state' && e.target.checked) {
        selectedValue = e.target.value;
        console.log('оновлено:', selectedValue);
    }
});


formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    userDelay = Number(inputEl.value);


    makePromise(userDelay, selectedValue)

        .then(selectedValue => iziToast.success({message: `✅ Fulfilled promise in ${userDelay}ms`}))
    .catch(error => iziToast.error({ message: `❌ Rejected promise in ${userDelay}ms` }))

    formEl.reset();
})




const makePromise = (delay, selectedValue) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedValue === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay)
    })

}