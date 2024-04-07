import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const delayEl = document.querySelector('.delay-input');
  const stateEls = document.querySelectorAll('.state-radio');
  const delay = parseInt(delayEl.value);
  let state;
  stateEls.forEach(radio => {
    if (radio.checked) {
      state = radio.value;
    }
  });
  createPromise(delay, state)
    .then(message => {
      iziToast.success({ message: message, position: 'topCenter' });
    })
    .catch(message => {
      iziToast.error({ message: message, position: 'topCenter' });
    });
  formEl.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}