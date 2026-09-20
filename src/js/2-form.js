let formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

document.addEventListener('DOMContentLoaded', () => {
  let lsData = getFromLS('feedback-form-state');
  if (lsData) {
    formData.email = typeof lsData.email === 'string' ? lsData.email : '';
    formData.message = typeof lsData.message === 'string' ? lsData.message : '';

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  }
});

formEl.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  formData.email = email;
  formData.message = message;

  saveToLS('feedback-form-state', formData);
});

formEl.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();
  if (email == '' || message == '') {
    alert('Fill please all fields');
    return;
  }
  formData.email = email;
  formData.message = message;
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  formEl.reset();
  formData = { email: '', message: '' };
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}
