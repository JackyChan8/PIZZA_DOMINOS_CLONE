const resetPassForm = document.querySelector('#formResetPass');
// Fields
const newPasswordFieldReset = document.querySelector('#NewPasswordReset');
const confirmPasswordFieldReset = document.querySelector('#ConfirmPasswordReset');
const saveBtnReset = document.querySelector('#saveBtnReset');

// Labels
const labelNewPasswordReset = document.querySelector('#labelNewPasswordReset');
const confirmPasswordLabelReset = document.querySelector('#confirmPasswordLabelReset');

// Success Message
const genericOverlayReset = document.querySelector('#genericOverlayReset');
const successMessageEmailReset = document.querySelector('#successMessageEmail');

mistakesResetPassFields = []

function checkBlankFieldResetPass() {
    if (!newPasswordFieldReset.value) {
        labelNewPasswordReset.style.color = 'red';
        mistakesResetPassFields.push(0);
    }
    if (!confirmPasswordFieldReset.value) {
        confirmPasswordLabelReset.style.color = 'red';
        mistakesResetPassFields.push(1);
    }
}

function nullMistakesResetPass() {
    mistakesResetPassFields = [];
    labelNewPasswordReset.style.color = '#555';
    confirmPasswordLabelReset.style.color = '#555';
    saveBtnReset.disabled = false;
}

function checkSamePasswords() {
    if (!(newPasswordFieldReset.value === confirmPasswordFieldReset.value)) {
        labelNewPasswordReset.style.color = 'red';
        confirmPasswordLabelReset.style.color = 'red';
        mistakesResetPassFields.push(2);
    }

    if ((newPasswordFieldReset.value.length < 8) && (confirmPasswordFieldReset.value.length < 8)) {
        labelNewPasswordReset.style.color = 'red';
        confirmPasswordLabelReset.style.color = 'red';
        mistakesResetPassFields.push(3);
    }
}


function requestResetPassword(email) {
    saveBtnReset.disabled = true;

    const formData = {
        email: email,
        password: newPasswordFieldReset.value,
    };

    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]')
    fetch('/user/changePass', {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrfToken.value
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          if (data['status'] === 'error') {
              saveBtnReset.disabled = false;
          } else if (data['status'] === 'success') {
              genericOverlayReset.style.display = 'block';
              successMessageEmailReset.textContent = email;
              window.location.href = "/en/";
          }
      })
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


saveBtnReset.addEventListener('click', function (e) {
    e.preventDefault();
    nullMistakesResetPass();

    checkBlankFieldResetPass();
    checkSamePasswords();

    if (!mistakesResetPassFields.length) {
        const email = getParameterByName('email');
        requestResetPassword(email);
    }

    console.log('mistakesResetPassFields: ', mistakesResetPassFields);

    console.log(newPasswordFieldReset.value);
    console.log(confirmPasswordFieldReset.value);
})

