// Choose order for delivery or carryout
const formControl = document.querySelector('#form_control_main');
const mainDelivery = document.querySelector('#delivery_main_block');
const delivery = document.querySelector('#Service_Type_Delivery');
const mainCarryout = document.querySelector('#carryout_main_block');
const carryout = document.querySelector('#Service_Type_Carryout');

function showCarryout() {
    // Show or hidden block
    mainDelivery.style.display = 'none';
    mainCarryout.style.display = 'block';
    // Change color icon
    formControl.querySelector('.circ-icons__icon--delivery').style.boxShadow = 'none';
    formControl.querySelector('.circ-icons__icon--carryout').style.boxShadow = '0 0 5px 3px #29a50a';
};

function showDelivery() {
    // Show or hidden block
    mainCarryout.style.display = 'none';
    mainDelivery.style.display = 'block';
    // Change color icon
    formControl.querySelector('.circ-icons__icon--delivery').style.boxShadow = '0 0 5px 3px #29a50a';
    formControl.querySelector('.circ-icons__icon--carryout').style.boxShadow = 'none';
};

delivery.addEventListener('click', function() {
    showDelivery();
}, false);


carryout.addEventListener('click', function() {
    showCarryout();
}, false);


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

if (getParameterByName('type')) {
    console.log('TRUE')
    const type = getParameterByName('type');
    console.log('type: ', type)
    if (type === 'Carryout') {
        showCarryout()
    } else {
        showDelivery();
    }
} else {
    console.log('False');
}

// ======================================= Delivery write form

// Fields
const addressTypeField = document.querySelector('#Address_Type_Select_Field');
const cityTypeField = document.querySelector('#CityField');
const streetNameTypeField = document.querySelector('#StreetNameField');
const streetNumberTypeField = document.querySelector('#StreetNumberField');
const continueDeliveryAddress = document.querySelector('#continueDeliveryAddress');

// Label
const address_Type_Select_Label = document.querySelector('#Address_Type_Select_Label');
const cityLabel = document.querySelector('#CityLabel');
const streetNameLabel = document.querySelector('#StreetNameLabel');
const streetNumberLabel = document.querySelector('#StreetNumberLabel');

mistakesOrderAddress = []

function checkBlankFieldsReset() {
    if (!addressTypeField.value) {
        address_Type_Select_Label.style.color = 'red';
        mistakesOrderAddress.push(0);
    }
    if (!cityTypeField.value) {
        cityLabel.style.color = 'red';
        mistakesOrderAddress.push(0);
    }
    if (!streetNameTypeField.value) {
        streetNameLabel.style.color = 'red';
        mistakesOrderAddress.push(0);
    }
    if (!streetNumberTypeField.value) {
        streetNumberLabel.style.color = 'red';
        mistakesOrderAddress.push(0);
    }
}

function nullMistakesOrderForm() {
    address_Type_Select_Label.style.color = '#555';
    cityLabel.style.color = '#555';
    streetNameLabel.style.color = '#555';
    streetNumberLabel.style.color = '#555';

    mistakesOrderAddress = [];
}

const btnWithoutAuth = document.querySelector('#continueWithoutAuth');
if (btnWithoutAuth) {
    btnWithoutAuth.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('email', 'user');
        localStorage.setItem('first_name', 'user');
        localStorage.setItem('last_name', 'user');
        localStorage.setItem('phone', 'user');
        window.location.href = '/order/step2/'

        deliveryOrderAddress = {
            'AddressType': addressTypeField.value,
            'District': cityTypeField.value,
            'StreetName': streetNameTypeField.value,
            'House': streetNumberTypeField.value,
        }

        localStorage.setItem(
            'DeliveryAddress', JSON.stringify(deliveryOrderAddress)
        )
    });
}

continueDeliveryAddress.addEventListener('click', function (e) {
    e.preventDefault();
    if (!localStorage.getItem('email')) {
        nullMistakesOrderForm();
        checkBlankFieldsReset();

        if (!mistakesResetPass.length) {
            console.log('mistakesResetPass: ', mistakesResetPass);
            deliveryOrderAddress = {
                'AddressType': addressTypeField.value,
                'District': cityTypeField.value,
                'StreetName': streetNameTypeField.value,
                'House': streetNumberTypeField.value,
            }

            localStorage.setItem(
                'DeliveryAddress', JSON.stringify(deliveryOrderAddress)
            )

            if(!mistakesOrderAddress.length) {
                // popupContainer.style.display = 'block';
                localStorage.setItem('email', 'user');
                localStorage.setItem('first_name', 'user');
                localStorage.setItem('last_name', 'user');
                localStorage.setItem('phone', 'user');
                window.location.href = '/order/step2/'
            }
        }
    } else {
        nullMistakesOrderForm();
        checkBlankFieldsReset();

        if (!mistakesResetPass.length) {
            console.log('mistakesResetPass: ', mistakesResetPass);
            deliveryOrderAddress = {
                'AddressType': addressTypeField.value,
                'District': cityTypeField.value,
                'StreetName': streetNameTypeField.value,
                'House': streetNumberTypeField.value,
            }

            localStorage.setItem(
                'DeliveryAddress', JSON.stringify(deliveryOrderAddress)
            )

            if(!mistakesOrderAddress.length) {
                window.location.href = '/order/step2/';
            }
        }

        console.log('addressTypeField.value: ', addressTypeField.value);
        console.log('cityTypeField.value: ', cityTypeField.value);
        console.log('streetNameTypeField.value: ', streetNameTypeField.value);
        console.log('streetNumberTypeField.value: ', streetNumberTypeField.value);
    }
})
