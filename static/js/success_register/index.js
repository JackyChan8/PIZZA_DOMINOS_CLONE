// Get field from localstorage
// const firstName = localStorage.getItem('first_name');
const lastName = localStorage.getItem('last_name');
const email = localStorage.getItem('email');
const phone = localStorage.getItem('phone');


// Add Information about account
const fullNameField = document.querySelector('#fullNameField');
const emailField = document.querySelector('#emailField');
const phoneField = document.querySelector('#phoneField');
// Get field from localstorage

if (email === 'user') {
    const emailOffersBlock = document.querySelector('.js-emailOffersContainer');
    emailOffersBlock.style.display = 'none';
    fullNameField.textContent = 'Not Authorization User';
    emailField.style.display = 'none';
    phoneField.style.display = 'none';
} else {
    fullNameField.textContent = localStorage.getItem('first_name') + ' ' + lastName
    emailField.textContent = email
    phoneField.textContent = '(297) P: ' + phone
}