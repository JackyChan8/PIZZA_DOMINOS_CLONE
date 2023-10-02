const btnCreate = document.querySelector('#btn-create-profile');
const formCreate = document.querySelector('#form-create');

// Inputs
const firstNameInput = document.querySelector('#First_Name');
const lastNameInput = document.querySelector('#Last_Name');
const emailInput2 = document.querySelector('#EmailInput');
const confirmEmailInput = document.querySelector('#Confirm_Email');
const phoneInput = document.querySelector('#Phone');
const passwordInput = document.querySelector('#Create_Password');
const confirmPasswordInput = document.querySelector('#Confirm_Password');

// Labels
const firstNameLabel = document.querySelector('#firstNameLabel');
const lastNameLabel = document.querySelector('#lastNameLabel');
const EmailLabel = document.querySelector('#EmailLabel');
const ConfirmEmailLabel = document.querySelector('#ConfirmEmailLabel');
const PhoneLabel = document.querySelector('#PhoneLabel');
const PasswordLabel = document.querySelector('#PasswordLabel');
const ConfirmPasswordLabel = document.querySelector('#ConfirmPasswordLabel');

let fields = formCreate.querySelectorAll('.fieldFormCreate')

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

mistakes = [];


function checkBlankFields() {
    for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
        if (i === 0) {
            firstNameLabel.style.color = 'red';
            mistakes.push(1);
        } else if (i === 1) {
            lastNameLabel.style.color = 'red';
            mistakes.push(1);
        } else if (i === 2) {
            EmailLabel.style.color = 'red';
            mistakes.push(1);
        } else if (i === 3) {
            ConfirmEmailLabel.style.color = 'red';
            mistakes.push(1);
        } else if (i === 4) {
            PhoneLabel.style.color = 'red';
            mistakes.push(1);
        } else if (i === 5) {
            PasswordLabel.style.color = 'red';
            mistakes.push(1);
        } else if (i === 6) {
            ConfirmPasswordLabel.style.color = 'red';
            mistakes.push(1);
        }
    }
  }
}

function checkEmail() {
    if (!validateEmail(emailInput2.value)) {
           EmailLabel.style.color = 'red';
           mistakes.push(1);
    }
    if (!validateEmail(confirmEmailInput.value)) {
        ConfirmEmailLabel.style.color = 'red';
        mistakes.push(1);
    }
}

function checkSames() {
    if (emailInput2.value !== confirmEmailInput.value) {
        EmailLabel.style.color = 'red';
        ConfirmEmailLabel.style.color = 'red';
        mistakes.push(1);
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
        PasswordLabel.style.color = 'red';
        ConfirmPasswordLabel.style.color = 'red';
        mistakes.push(1);
    }
}

function nullMistakes() {
    firstNameLabel.style.color = '#555';
    lastNameLabel.style.color = '#555';
    EmailLabel.style.color = '#555';
    ConfirmEmailLabel.style.color = '#555';
    PhoneLabel.style.color = '#555';
    PasswordLabel.style.color = '#555';
    ConfirmPasswordLabel.style.color = '#555';
    btnCreate.disabled = false;
    mistakes = [];
}

function sendRequest() {
    btnCreate.disabled = true;

    const formData = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput2.value,
        phone: phoneInput.value,
        password: passwordInput.value,
    };

    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]')
    fetch('/user/signup', {
      method: "POST",
      credentials: 'same-origin',
      headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrfToken.value
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
          localStorage.setItem('email', data['data']['email']);
          localStorage.setItem('first_name', data['data']['first_name']);
          localStorage.setItem('last_name', data['data']['last_name']);
          localStorage.setItem('phone', data['data']['phone']);
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/success_register/";
        }, 500);
      });
}


formCreate.addEventListener('submit', function (event) {
    event.preventDefault();
    nullMistakes();
    checkBlankFields();
    checkEmail();
    checkSames();
    if (!mistakes.length) {
        sendRequest();
    }
});
