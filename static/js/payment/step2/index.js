// Labels
const CountryLabel = document.querySelector('#CountryLabel');
const AddressLabel = document.querySelector('#AddressLabel');
const FirstNameLastName = document.querySelector('#FirstNameLastName');

// Data
const CountrySelect = document.querySelector('.c-input__select');
const AddressInput = document.querySelector('#AddressInput');
const firstLastNameInput = document.querySelector('#firstName-LastName');

// Set Current Pay
const amountPay = document.querySelector('#message');
const order = JSON.parse(localStorage.getItem('Order'));
let totalPriceOrder = 0;
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
    amountPay.value = `${totalPriceOrder}`
}

let mistakesForm = [];

function nullMistakes() {
    CountryLabel.style.color = '#404040';
    AddressLabel.style.color = '#404040';
    FirstNameLastName.style.color = '#404040';
    mistakesForm = [];
}


const continueBtn = document.querySelector('#continueBtn');
continueBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('True');

    console.log(CountrySelect.value)
    console.log(AddressInput.value)
    console.log(firstLastNameInput.value)
    nullMistakes();
    if (!CountrySelect.value) {
        CountryLabel.style.color = 'red';
        mistakesForm.push(1);
    }
    if (!AddressInput.value) {
        AddressLabel.style.color = 'red';
        mistakesForm.push(1);
    }
    if (!firstLastNameInput.value) {
        FirstNameLastName.style.color = 'red';
        mistakesForm.push(1);
    }

    if (!mistakesForm.length) {
        let profileInfo = {
            'Country': CountrySelect.value,
            'Address': AddressInput.value,
            'FullName': firstLastNameInput.value,
        }
        localStorage.setItem('Profile', JSON.stringify(profileInfo))
        window.location.href = '/payment/step3/';
    }
});