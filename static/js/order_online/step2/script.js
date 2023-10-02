// Address
const addressChooseDelivery = document.querySelector('#AddressChooseDelivery');
const streetAddressStep2 = document.querySelector('#streetAddressStep2');

const addressDeliveryStorage = JSON.parse(localStorage.getItem('DeliveryAddress'));
streetAddressStep2.textContent = addressDeliveryStorage['StreetName'] + ' ' + addressDeliveryStorage['House'];

// ========================================================= Pizza Build
function canvasPizza(
    photoOne, photoTwo, photoX = null, photoC = null, photoP = null, photoM = null, photoS = null,
    photoV = null, photoB = null, photoN = null, photoZ = null
) {

  base_image = new Image();
  base_image.src = photoTwo;
  base_image.onload = function(){
    canvasTwo.drawImage(base_image, 0, 0, 300, 315);
  }

  base_image_1 = new Image();
  base_image_1.src = photoOne;
  base_image_1.onload = function(){
    canvasOne.drawImage(base_image_1, 0, 0, 300, 315);
  }

  if (photoP) {
      base_image_4 = new Image();
      base_image_4.src = photoP;
      base_image_4.onload = function(){
          canvasP.drawImage(base_image_4, 0, 0, 300, 315);
      }
  }

  if (photoM) {
      base_image_5 = new Image();
      base_image_5.src = photoM;
      base_image_5.onload = function(){
          canvasM.drawImage(base_image_5, 0, 0, 300, 315);
      }
  }

  if (photoS) {
      base_image_6 = new Image();
      base_image_6.src = photoS;
      base_image_6.onload = function(){
          canvasS.drawImage(base_image_6, 0, 0, 300, 315);
      }
  }

  if (photoX) {
      base_image_2 = new Image();
      base_image_2.src = photoX;
      base_image_2.onload = function(){
          canvasX.drawImage(base_image_2, 0, 0, 300, 315);
      }
  }

  if (photoC) {
      base_image_3 = new Image();
      base_image_3.src = photoC;
      base_image_3.onload = function(){
          canvasC.drawImage(base_image_3, 0, 0, 300, 315);
      }
  }

    if (photoV) {
      base_image_7 = new Image();
      base_image_7.src = photoV;
      base_image_7.onload = function(){
          canvasV.drawImage(base_image_7, 0, 0, 300, 315);
      }
  }

    if (photoB) {
      base_image_8 = new Image();
      base_image_8.src = photoB;
      base_image_8.onload = function(){
          canvasB.drawImage(base_image_8, 0, 0, 300, 315);
      }
  }

    if (photoN) {
      base_image_9 = new Image();
      base_image_9.src = photoN;
      base_image_9.onload = function(){
          canvasN.drawImage(base_image_9, 0, 0, 300, 315);
      }
  }

    if (photoZ) {
      base_image_10 = new Image();
      base_image_10.src = photoZ;
      base_image_10.onload = function(){
          canvasZ.drawImage(base_image_10, 0, 0, 300, 315);
      }
  }
}

function deleteCanvas() {
    canvasOne.clearRect(0, 0, 300, 315)
    canvasTwo.clearRect(0, 0, 300, 315)
    canvasX.clearRect(0, 0, 300, 315)
    canvasC.clearRect(0, 0, 300, 315)
    canvasP.clearRect(0, 0, 300, 315)
    canvasM.clearRect(0, 0, 300, 315)
    canvasS.clearRect(0, 0, 300, 315)
    canvasV.clearRect(0, 0, 300, 315)
    canvasB.clearRect(0, 0, 300, 315)
    canvasN.clearRect(0, 0, 300, 315)
    canvasZ.clearRect(0, 0, 300, 315)
}

// Canvas
const handTossedPizzaBorder = document.querySelector('#mask_canvas');
const handTossedPizza = document.querySelector('#crust_canvas')
const handTossedPizzaX = document.querySelector('#X_canvas')
const handTossedPizzaC = document.querySelector('#C_canvas')
const handTossedPizzaP = document.querySelector('#P_canvas')
const handTossedPizzaM = document.querySelector('#M_canvas')
const handTossedPizzaS = document.querySelector('#S_canvas')
const handTossedPizzaV = document.querySelector('#V_canvas')
const handTossedPizzaB = document.querySelector('#B_canvas')
const handTossedPizzaN = document.querySelector('#N_canvas')
const handTossedPizzaZ = document.querySelector('#Z_canvas')


canvasOne = handTossedPizzaBorder.getContext('2d');
canvasTwo = handTossedPizza.getContext('2d');
canvasX = handTossedPizzaX.getContext('2d');
canvasC = handTossedPizzaC.getContext('2d');
canvasP = handTossedPizzaP.getContext('2d');
canvasM = handTossedPizzaM.getContext('2d');
canvasS = handTossedPizzaS.getContext('2d');
canvasV = handTossedPizzaV.getContext('2d');
canvasB = handTossedPizzaB.getContext('2d');
canvasN = handTossedPizzaN.getContext('2d');
canvasZ = handTossedPizzaZ.getContext('2d');


// Close Model Pizza
const CloseChoosePizza = document.querySelector('#CloseChoosePizza')
CloseChoosePizza.addEventListener('click', () => {dominosPizzaBuilderBlock.style.display = 'none'; deleteCanvas(); console.log(pizza);});


// ========================= Build your Own Pizza
// const buildYourOwnPizza = document.querySelector('#entree-BuildYourOwn');
const btnClickProducts = document.querySelectorAll('.PizzaChooseMenu');
const dominosPizzaBuilderBlock = document.querySelector('#DominosPizzaBuilder');

console.log('btnClickProducts: ', btnClickProducts)

function getSizeCrust() {
    const handtoss = document.querySelector('#sizeCrustWrapper');
    const inputsPizza = handtoss.querySelectorAll('input');
    console.log('inputsPizza: ', inputsPizza);
    for (let i = 0; i < inputsPizza.length; i++) {
        inputsPizza[i].addEventListener('click', function (e) {
            if (inputsPizza[i].value.includes('HandTossedPizza')) {
                let size = inputsPizza[i].value.split(' ')[1];
                let name = size + `" Hand Tossed ${namePizza ? namePizza : 'Pizza'}\n`;
                let description = 'Robust Inspired Tomato Sauce, Cheese\n';

                titlePizzaName.textContent = name;
                textPizzaName.textContent = description;
                //
                console.log('name: ', name)
                console.log('description: ', description)
                console.log('size: ', size)

                pizza.name = name;
                pizza.description = description;
                pizza.size = size;
                pizza.price = size === '14' ? '31.00' : '23.25';
                canvasPizza('/static/images/photos/HandTossedPizza/2.png', '/static/images/photos/HandTossedPizza/2.png')
            } else if (inputsPizza[i].value.includes('handmadePan')) {
                let size = inputsPizza[i].value.split(' ')[1];
                let name = size + `" Handmade Pan Pizza ${namePizza ? namePizza : ''}`;
                let description = 'Cheese, Robust Inspired Tomato Sauce\n';

                titlePizzaName.textContent = name;
                textPizzaName.textContent = description;
                //

                console.log('name: ', name)
                console.log('description: ', description)
                console.log('size: ', size)
                pizza.name = name;
                pizza.description = description;
                pizza.size = size;
                pizza.price = '27.50';
                canvasPizza('/static/images/photos/handmadePan/2.png', '/static/images/photos/handmadePan/2.png');
            } else if (inputsPizza[i].value.includes('CrunchyThinCrust')) {
                let size = inputsPizza[i].value.split(' ')[1];
                let name = size + `" Crunchy Thin Crust ${namePizza ? namePizza : 'Pizza'}\n`;
                let description = 'Cheese, Robust Inspired Tomato Sauce\n';

                titlePizzaName.textContent = name;
                textPizzaName.textContent = description;
                //

                console.log('name: ', name)
                console.log('description: ', description)
                console.log('size: ', size)
                pizza.name = name;
                pizza.description = description;
                pizza.size = size;
                pizza.price = size === '14' ? '31.00' : '23.25';
                // titlePizzaName.textContent = '14" Crunchy Thin Crust Pizza\n';
                // textPizzaName.textContent = 'Cheese, Robust Inspired Tomato Sauce\n';
                canvasPizza(
                    '/static/images/photos/CrunchyThinCrust/2.png',
                    '/static/images/photos/CrunchyThinCrust/2.png',
                );
            }
        })
    }
}

let pizza = {
    'name': '',
    'description': '',
    'quantity': '',
    'size': '',
    'price': '',
    'img': '',
    'sides': []
}

const titlePizzaName = document.querySelector('.order-summary__item__title');
const textPizzaName = document.querySelector('#textPizzaName');


let namePizza = null;

for (let i = 0; i < btnClickProducts.length; i++) {
    btnClickProducts[i].addEventListener("click", function (e) {
          console.log(e)
          console.log(btnClickProducts[i])
          console.log(e.target.className)
          if (e.target.className.includes('tossedPizza')) {
                titlePizzaName.textContent = '14" Hand Tossed Pizza\n';
                textPizzaName.textContent = 'Robust Inspired Tomato Sauce, Cheese\n';
                canvasPizza('/static/images/photos/HandTossedPizza/2.png', '/static/images/photos/HandTossedPizza/2.png')
                pizza.name = '14" Hand Tossed Pizza';
                pizza.price = '31.00';
                pizza.size = '14';
                pizza.description = 'Robust Inspired Tomato Sauce, Cheese';
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZZA.jpg';
          } else if (btnClickProducts[i].textContent.includes('Hand Tossed')) {
                titlePizzaName.textContent = '14" Hand Tossed Pizza\n';
                textPizzaName.textContent = 'Robust Inspired Tomato Sauce, Cheese\n';
                pizza.name = '14" Hand Tossed Pizza';
                pizza.price = '31.00';
                pizza.size = '14';
                pizza.description = 'Robust Inspired Tomato Sauce, Cheese';
                canvasPizza('/static/images/photos/HandTossedPizza/2.png', '/static/images/photos/HandTossedPizza/2.png');
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZZA.jpg';
          } else if (btnClickProducts[i].textContent.includes('Handmade Pan')) {
                titlePizzaName.textContent = '12" Handmade Pan Pizza';
                textPizzaName.textContent = 'Cheese, Robust Inspired Tomato Sauce\n';
                pizza.name = '12" Handmade Pan Pizza';
                pizza.price = '27.50';
                pizza.size = '12';
                pizza.description = 'Cheese, Robust Inspired Tomato Sauce';
                canvasPizza('/static/images/photos/handmadePan/2.png', '/static/images/photos/handmadePan/2.png');
          } else if (btnClickProducts[i].textContent.includes('Crunchy Thin Crust')) {
                titlePizzaName.textContent = '14" Crunchy Thin Crust Pizza\n';
                textPizzaName.textContent = 'Cheese, Robust Inspired Tomato Sauce\n';
                pizza.name = '14" Crunchy Thin Crust Pizza';
                pizza.price = '31.00';
                pizza.size = '14';
                pizza.description = 'Cheese, Robust Inspired Tomato Sauce';
                canvasPizza('/static/images/photos/CrunchyThinCrust/2.png', '/static/images/photos/CrunchyThinCrust/2.png');
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZZA.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('America\'s Favorite Feast')) {
                console.log('btnClickProducts[i].getAttribute(\'data-dpz-track-evt-name\': ', btnClickProducts[i].getAttribute('data-dpz-track-evt-name'))
                titlePizzaName.textContent = '14" Hand Tossed Americas Feast\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/AmericasFeast/2.png',
                    '/static/images/photos/AmericasFeast/2.png',
                    null,
                    null,
                    '/static/images/photos/AmericasFeast/3-P.png',
                    '/static/images/photos/AmericasFeast/5-M.png',
                    '/static/images/photos/AmericasFeast/4-S.png'
                );
                namePizza = 'Americas Feast';
                pizza.name = 'Americas Feast';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZAX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Bacon Cheeseburger Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed Bacon Cheeseburger\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/BaconCheeseburger/1.png',
                    '/static/images/photos/BaconCheeseburger/2.png',
                    null,
                    null,
                    '/static/images/photos/BaconCheeseburger/4.png',
                    '/static/images/photos/BaconCheeseburger/5.png',
                    '/static/images/photos/BaconCheeseburger/3.png'
                );
                namePizza = 'Bacon Cheeseburger';
                pizza.size = '14';
                pizza.name = 'Bacon Cheeseburger';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZBX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('BBQ Chicken')) {
                titlePizzaName.textContent = '14" Hand Tossed BBQ Chicken\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/BbqChicken/1.png',
                    '/static/images/photos/BbqChicken/2.png',
                    null,
                    null,
                    '/static/images/photos/BbqChicken/3.png'
                );
                namePizza = 'BBQ Chicken';
                pizza.size = '14';
                pizza.price = 35;
                pizza.name = 'BBQ Chicken';
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZBC.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Deluxe Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed Deluxe';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/DeluxeFeast/1.png',
                    '/static/images/photos/DeluxeFeast/2.png',
                    null,
                    null,
                    '/static/images/photos/DeluxeFeast/3.png',
                    '/static/images/photos/DeluxeFeast/4.png',
                    '/static/images/photos/DeluxeFeast/5.png'
                );
                namePizza = 'Deluxe';
                pizza.name = 'Deluxe';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZDX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('ExtravaganZZa Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed ExtravaganZZa';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/ExtravaganZZaFeast/1.png',
                    '/static/images/photos/ExtravaganZZaFeast/2.png',
                    '/static/images/photos/ExtravaganZZaFeast/3.png',
                    '/static/images/photos/ExtravaganZZaFeast/4.png',
                    '/static/images/photos/ExtravaganZZaFeast/5.png',
                    '/static/images/photos/ExtravaganZZaFeast/6.png',
                    '/static/images/photos/ExtravaganZZaFeast/7.png',
                    '/static/images/photos/ExtravaganZZaFeast/8.png',
                    '/static/images/photos/ExtravaganZZaFeast/9.png',
                    '/static/images/photos/ExtravaganZZaFeast/10.png'
                );
                namePizza = 'ExtravaganZZa';
                pizza.name = 'ExtravaganZZa';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZZZ.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Hawaiian Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed Hawaiian\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/HawaiianFeast/1.png',
                    '/static/images/photos/HawaiianFeast/2.png',
                    '/static/images/photos/HawaiianFeast/3.png',
                    '/static/images/photos/HawaiianFeast/4.png'
                );
                namePizza = 'Hawaiian';
                pizza.name = 'Hawaiian';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZHX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('MeatZZa Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed MeatZZa\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/MeatZZaFeast/1.png',
                    '/static/images/photos/MeatZZaFeast/2.png',
                    '/static/images/photos/MeatZZaFeast/6.png',
                    '/static/images/photos/MeatZZaFeast/4.png',
                    '/static/images/photos/MeatZZaFeast/3.png',
                    '/static/images/photos/MeatZZaFeast/5.png'
                );
                namePizza = 'MeatZZa';
                pizza.name = 'MeatZZa';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZMX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Pepperoni Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed Pepperoni Feast\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/Pepperoni/1.png',
                    '/static/images/photos/Pepperoni/2.png',
                    '/static/images/photos/Pepperoni/3.png'
                );
                namePizza = 'Pepperoni Feast';
                pizza.name = 'Pepperoni Feast';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZPX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Veggie Feast')) {
                titlePizzaName.textContent = '14" Hand Tossed Veggie\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/VeggieFeast/1.png',
                    '/static/images/photos/VeggieFeast/2.png',
                    '/static/images/photos/VeggieFeast/3.png',
                    '/static/images/photos/VeggieFeast/4.png',
                    '/static/images/photos/VeggieFeast/5.png',
                    '/static/images/photos/VeggieFeast/6.png',
                    '/static/images/photos/VeggieFeast/7.png'
                );
                namePizza = 'Veggie';
                pizza.name = 'Veggie';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_PIZVX.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Cheeseburger Pizza')) {
                titlePizzaName.textContent = '14" Hand Tossed Cheeseburger Pizza\n';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/CheeseburgerPizza/1.png',
                    '/static/images/photos/CheeseburgerPizza/2.png',
                    '/static/images/photos/CheeseburgerPizza/3.png',
                    '/static/images/photos/CheeseburgerPizza/6.png',
                    '/static/images/photos/CheeseburgerPizza/5.png',
                    '/static/images/photos/CheeseburgerPizza/4.png',
                );
                namePizza = 'Cheeseburger Pizza';
                pizza.name = 'Cheeseburger Pizza';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/wam/prod/market/AW/_en/images/promo/17ea7b8a-3701-4327-ac63-a327c9f09fc9.jpg';
          } else if (btnClickProducts[i].getAttribute('data-dpz-track-evt-name').includes('Chicken Taco Pizza')) {
                titlePizzaName.textContent = '14" Hand Tossed Chicken Taco Pizza';
                textPizzaName.textContent = '';
                canvasPizza(
                    '/static/images/photos/Chicken Taco/1.png',
                    '/static/images/photos/Chicken Taco/2.png',
                    '/static/images/photos/Chicken Taco/3.png',
                    '/static/images/photos/Chicken Taco/6.png',
                    '/static/images/photos/Chicken Taco/5.png',
                    '/static/images/photos/Chicken Taco/4.png',
                );
                namePizza = 'Chicken Taco Pizza';
                pizza.name = 'Chicken Taco Pizza';
                pizza.size = '14';
                pizza.price = 35;
                pizza.img = 'https://cache.dominos.com/wam/prod/market/AW/_en/images/promo/86d5c98d-27e1-48fc-b4d5-b794d0e8026d.jpg';
          }
          getSizeCrust()

          dominosPizzaBuilderBlock.style.display = 'block';
    });
}


// pizza['quantity'] = document.querySelector('#quantityPizza').value;

// Add To Order Button and Sides choose
const btnAddToOrder = document.querySelector('#addToOrder');
const sidesChoose = document.querySelector('#sidesChoose');
const visualWrapper = document.querySelector('.visualWrapper');
const sizeCrustChoose = document.querySelector('#sizeCrustChoose');
const progressBarStep = document.querySelectorAll('.js-progressBarStep');

btnAddToOrder.addEventListener('click', function (e) {
    e.preventDefault()
    pizza.quantity = document.querySelector('#quantityPizza').value;
    // localStorage.setItem('Order', JSON.stringify(pizza));

    for (let i=0; i<=1; i++) {
        progressBarStep[i].classList.add("is-active");
    }

    visualWrapper.style.display = 'none';
    sizeCrustChoose.style.display = 'none';
    sidesChoose.style.display = 'block';
})

// Add sides to order


const sidesInputs = sidesChoose.querySelectorAll('input');

const MarinaraDippingSauce = sidesChoose.querySelector('#MarinaraDippingSauce')
const RanchSauce = sidesChoose.querySelector('#Ranch')
const BBQSauce = sidesChoose.querySelector('#BBQSauce')

MarinaraDippingSauce.addEventListener('click', function () {
    if (!MarinaraDippingSauce.classList.contains('choose')) {
        MarinaraDippingSauce.classList.add('choose');
        pizza.sides.push({'id': 1, 'name': 'Marinara Dipping Sauce', 'quantity': 1, 'price': 1.75, 'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SIDMAR.jpg'});
        console.log(pizza);
    } else {
        let idx = pizza.sides.map(function(e) { return e.id; }).indexOf(1);
        console.log(idx);
        pizza.sides.splice(idx,1);
        MarinaraDippingSauce.classList.remove('choose');
    }

    console.log(pizza);
})

RanchSauce.addEventListener('click', function () {
    if (!RanchSauce.classList.contains('choose')) {
        RanchSauce.classList.add('choose');
        pizza.sides.push({'id': 2, 'name': 'Ranch', 'quantity': 1, 'price': 1.75, 'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SIDRAN.jpg'});
    } else {
        let idx = pizza.sides.map(function(e) { return e.id; }).indexOf(2);
        console.log(idx);
        pizza.sides.splice(idx,1);
        RanchSauce.classList.remove('choose');
    }

    console.log(pizza);
})

BBQSauce.addEventListener('click', function () {
    if (!BBQSauce.classList.contains('choose')) {
        BBQSauce.classList.add('choose');
        pizza.sides.push({'id': 3, 'name': 'BBQ Sauce', 'quantity': 1, 'price': 1.75, 'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_BBQC.jpg'});
    } else {
        let idx = pizza.sides.map(function(e) { return e.id; }).indexOf(3);
        console.log(idx);
        pizza.sides.splice(idx,1);
        BBQSauce.classList.remove('choose');
    }

    console.log(pizza);
})

const btnAddSidestoOrder = document.querySelector('#addSidestoOrder');

btnAddSidestoOrder.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('pizza: ', pizza);
    let order = localStorage.getItem('Order')
    console.log('order: ', order)
    if (order) {
        let newOrder = JSON.parse(order)
        newOrder.push(pizza);
        localStorage.setItem('Order', JSON.stringify(newOrder));
    } else {
        localStorage.setItem('Order', JSON.stringify([pizza]));
    }

    window.location.href = '/order/step2/'
})

const noThanksPizza = document.querySelector('#NoThanksBtn')

noThanksPizza.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('pizza: ', pizza);
    let order = localStorage.getItem('Order')
    console.log('order: ', order)
    if (order) {
        let newOrder = JSON.parse(order)
        newOrder.push(pizza);
        localStorage.setItem('Order', JSON.stringify(newOrder));
    } else {
        localStorage.setItem('Order', JSON.stringify([pizza]));
    }

    window.location.href = '/order/step2/'
});

// ===================================================================================================== Menu Products

// View All
const mainFrameOrder = document.querySelector('#js-pageSplit');

// Specialty Pizza
const splitFrameSpecialPizza = document.querySelector('#splitFrameSpecialPizza');
const btnSpecialtyPizza = document.querySelectorAll('.specialtyPizza')
const btnViewAllProducts = document.querySelector('#navViewAllBtn')

// Chicken
const splitFrameChicken = document.querySelector('#splitFrameChicken');
const btnChickenMenu = document.querySelectorAll('.chickenChoose');

// Sides
const splitFrameSides = document.querySelector('#splitFrameSides');
const btnSidesMenu = document.querySelectorAll('.sidesChoose');

// Drinks
const splitFrameDrinks = document.querySelector('#splitFrameDrinks');
const btnDrinksMenu = document.querySelectorAll('.drinkChoose');

// Dessert
const splitFrameDessert = document.querySelector('#splitFrameDessert');
const btnDessertMenu = document.querySelectorAll('.dessertChoose');

// Speciality Pizza
for (let i = 0; i < btnSpecialtyPizza.length; i++) {
    btnSpecialtyPizza[i].addEventListener('click', function () {
        mainFrameOrder.style.display = 'none';
        splitFrameChicken.style.display = 'none';
        splitFrameSides.style.display = 'none';
        splitFrameDrinks.style.display = 'none';
        splitFrameDessert.style.display = 'none';
        splitFrameSpecialPizza.style.display = 'inline-flex';
    })
}

btnViewAllProducts.addEventListener('click', function () {
    splitFrameSpecialPizza.style.display = 'none';
    splitFrameChicken.style.display = 'none';
    splitFrameSides.style.display = 'none';
    splitFrameDrinks.style.display = 'none';
    splitFrameDessert.style.display = 'none';
    mainFrameOrder.style.display = 'inline-flex';
})


// Chicken
for (let i = 0; i < btnChickenMenu.length; i++) {
    btnChickenMenu[i].addEventListener('click', function () {
        mainFrameOrder.style.display = 'none';
        splitFrameSpecialPizza.style.display = 'none'
        splitFrameSides.style.display = 'none'
        splitFrameDrinks.style.display = 'none'
        splitFrameDessert.style.display = 'none'
        splitFrameChicken.style.display = 'inline-flex';
    })
}

// Sides
for (let i = 0; i < btnSidesMenu.length; i++) {
    btnSidesMenu[i].addEventListener('click', function () {
        mainFrameOrder.style.display = 'none';
        splitFrameSpecialPizza.style.display = 'none'
        splitFrameChicken.style.display = 'none';
        splitFrameDrinks.style.display = 'none';
        splitFrameDessert.style.display = 'none';
        splitFrameSides.style.display = 'inline-flex';
    })
}

// Drinks
for (let i = 0; i < btnDrinksMenu.length; i++) {
    btnDrinksMenu[i].addEventListener('click', function () {
        mainFrameOrder.style.display = 'none';
        splitFrameSpecialPizza.style.display = 'none'
        splitFrameChicken.style.display = 'none';
        splitFrameSides.style.display = 'none';
        splitFrameDessert.style.display = 'none';
        splitFrameDrinks.style.display = 'inline-flex';
    })
}

// Dessert
for (let i = 0; i < btnDessertMenu.length; i++) {
    btnDessertMenu[i].addEventListener('click', function () {
        mainFrameOrder.style.display = 'none';
        splitFrameSpecialPizza.style.display = 'none'
        splitFrameChicken.style.display = 'none';
        splitFrameSides.style.display = 'none';
        splitFrameDrinks.style.display = 'none';
        splitFrameDessert.style.display = 'inline-flex';
    })
}

// ========================================================================================== Customize Wings
const blockWingsContainer = document.querySelector('#pageModalWings');
const btnClickWings = document.querySelectorAll('.WingsChooseMenu');
const quantityBlock = document.querySelectorAll('.quantity__component');
const closeBlockWings = document.querySelector('.modal__close-btn');
const titleWings = blockWingsContainer.querySelector('#modalHeaderWings');
const imgWings = blockWingsContainer.querySelector('.product-builder__image');
const descriptionWings = blockWingsContainer.querySelector('.product-builder__description');
const titleWings2 = blockWingsContainer.querySelector('.serving-options__name');

closeBlockWings.addEventListener('click', () => {blockWingsContainer.style.display = 'none';});

let wings = {
    'name': '',
    'description': '',
    'quantity': '',
    'size': '',
    'price': '',
    'img': '',
    'sides': []
}

function capitalizeFirstLetter(string) {
  return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}


function quantityProductWings() {
    // Block Quanitity
    for (let i = 0; i < quantityBlock.length; i++) {
        let buttonsQuant = quantityBlock[i].querySelectorAll('button');
        let valueQuant = quantityBlock[i].querySelector('div');

        buttonsQuant[0].addEventListener('click', function () {
            let value = Number(valueQuant.textContent)
            if (valueQuant.getAttribute('data-type-product') === 'Chicken') {
                if (value === 1) {
                    buttonsQuant[0].style.backgroundColor = '#bbb';
                    buttonsQuant[0].style.cursor = 'not-allowed';
                    buttonsQuant[0].setAttribute('disabled', '')
                    valueQuant.textContent = 1;
                } else {
                    valueQuant.textContent = value - 1;
                }
            }
            else if (value <= 0) {
                valueQuant.textContent = 0;
                buttonsQuant[0].style.backgroundColor = '#bbb';
                buttonsQuant[0].style.cursor = 'not-allowed';
                buttonsQuant[0].setAttribute('disabled', '')
            } else {
                valueQuant.textContent = value - 1
            }
        })

        buttonsQuant[1].addEventListener('click', function () {
            let value = Number(valueQuant.textContent)
            valueQuant.textContent = value + 1
            if (value >= 1) {
                buttonsQuant[0].style.backgroundColor = '#006491';
                buttonsQuant[0].style.cursor = 'pointer';
                buttonsQuant[0].removeAttribute('disabled');
            }
            valueQuant.textContent = value + 1
            // console.log('value: ', value)
        })
    }
}

function getAmountWings() {
    const blockAmount = document.querySelector('.segmented-radio__component');
    const labelsWings = blockAmount.querySelectorAll('label');
    const descriptionWingsProduct = document.querySelector('#descriptionWingsProduct');
    const spanDescriptionProduct = descriptionWingsProduct.querySelectorAll('.descriptWings');
    for (let i = 0; i < labelsWings.length; i++) {
        labelsWings[i].addEventListener('click', function () {
            let valueWingsAmount = labelsWings[i].textContent
            wings.size = valueWingsAmount.split('-')[0]
            wings.price = wings.size === '6' ? '17.00' : wings.size === '12' ? '29.00' : '49.00'
            spanDescriptionProduct[0].textContent = valueWingsAmount
            spanDescriptionProduct[1].textContent = `${valueWingsAmount.split('-')[0] === '6' ? '1' : valueWingsAmount.split('-')[0] === '12' ? '2' : '3'} dipping cups`
        })
    }
}

function addWingsToOrder() {
    let order = localStorage.getItem('Order')
    console.log('order: ', order)
    if (order) {
        let newOrder = JSON.parse(order)
        newOrder.push(wings);
        localStorage.setItem('Order', JSON.stringify(newOrder));
    } else {
        localStorage.setItem('Order', JSON.stringify([wings]));
    }
    window.location.href = '/order/step2/'
}

function getAllValues() {
    const blockBtnChooseWings = document.querySelector('.product-builder__footer');
    const buttonsWings = blockBtnChooseWings.querySelectorAll('button');
    console.log('buttonsWings: ', buttonsWings);

    buttonsWings[0].addEventListener('click', function () {
        blockWingsContainer.style.display = 'none';
    })

    buttonsWings[1].addEventListener('click', function (e) {
        // Get values
        e.preventDefault()
        for (let i = 0; i < quantityBlock.length; i++) {
            let valueQuant = quantityBlock[i].querySelector('div');
            let amount = valueQuant.textContent;
            console.log('valueQuant.textContent: ', valueQuant.textContent);

            if (valueQuant.getAttribute('data-type-product') === 'sause' && valueQuant.textContent > 0) {
                console.log('TRUEEEEEEE')
                // wings.size
                    if (valueQuant.getAttribute('data-type-name') === 'BBQ Sause') {
                        idx = wings.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            wings.sides.splice(idx,1);
                            let valueQuant = quantityBlock[1].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'BBQ Sauce',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_BBQC.jpg'
                                }
                            )
                        } else {
                            let valueQuant = quantityBlock[1].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'BBQ Sauce',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_BBQC.jpg'
                                }
                            )
                        }
                    } else if (valueQuant.getAttribute('data-type-name') === 'Blue Cheese') {
                        idx = wings.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            wings.sides.splice(idx,1);
                            let valueQuant = quantityBlock[2].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Blue Cheese',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_Bd.jpg'
                                }
                            )
                        } else {
                            let valueQuant = quantityBlock[2].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Blue Cheese',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_Bd.jpg'
                                }
                                )
                        }
                    } else if (valueQuant.getAttribute('data-type-name') === 'Hot Dipping Cup') {
                        idx = wings.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            wings.sides.splice(idx,1);
                            let valueQuant = quantityBlock[3].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                            {
                                'id': i,
                                'name': 'Hot Sauce',
                                'quantity': Number(amount),
                                'price': 1.75,
                                'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_Bd.jpg'
                            }
                        )
                        } else {
                            let valueQuant = quantityBlock[3].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Hot Sauce',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_Bd.jpg'
                                }
                            )
                        }
                    } else if (valueQuant.getAttribute('data-type-name') === 'Ranch') {
                        idx = wings.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            wings.sides.splice(idx,1);
                            let valueQuant = quantityBlock[4].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Ranch',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/minis/F_SIDRAN.jpg'
                                }
                            )
                        } else {
                            let valueQuant = quantityBlock[4].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Ranch',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/minis/F_SIDRAN.jpg'
                                }
                            )
                        }
                    } else if (valueQuant.getAttribute('data-type-name') === 'Mango Habanero Dipping Cup') {
                        idx = wings.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            wings.sides.splice(idx,1);
                            let valueQuant = quantityBlock[5].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Habanero Dip Cup',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SMHAB.jpg'
                                }
                            )
                        } else {
                            let valueQuant = quantityBlock[5].querySelector('div');
                            let amount = valueQuant.textContent;
                            wings.sides.push(
                                {
                                    'id': i,
                                    'name': 'Habanero Dip Cup',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SMHAB.jpg'
                                }
                            )
                        }
                    }
            } else {
                let valueQuant = quantityBlock[0].querySelector('div');
                let amount = valueQuant.textContent;
                console.log('ELSEEEEEE amount: ', amount)
                wings.name = capitalizeFirstLetter(titleWings.textContent)
                wings.description = descriptionWings.textContent
                wings.quantity = Number(amount) === 0 ? 1 : Number(amount)
                // wings.img = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/S_BONEIN.jpg'
            }
        }
        addWingsToOrder();
        // console.log('wings: ', wings)
    })
}


for (let i = 0; i < btnClickWings.length; i++) {
    btnClickWings[i].addEventListener("click", function (e) {
          quantityProductWings();
          getAmountWings();
          let segmentedRadioComponent = document.querySelector('.segmented-radio__component')
          if (btnClickWings[i].getAttribute('data-dpz-track-evt-name').includes('Wings')) {
                wings.price = '17.00';
                wings.quantity = '1';
                titleWings.textContent = 'WINGS';
                titleWings2.textContent = 'Wings';
                descriptionWings.textContent = 'Marinated and oven-baked with your choice of dipping sauce: Sweet Mango Habanero, BBQ, Kicker Hot Sauce, Blue Cheese or Ranch.\n';
                // textPizzaName.textContent = 'Robust Inspired Tomato Sauce, Cheese\n';

                let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/S_BONEIN.jpg'

                imgWings.src = imagePath
                wings.img = imagePath;
          } else if (btnClickWings[i].getAttribute('data-dpz-track-evt-name').includes('Boneless Chicken')) {
                wings.price = '17.00';
                wings.quantity = '1';
                titleWings.textContent = 'BONELESS CHICKEN\n';
                titleWings2.textContent = 'Boneless Chicken';
                descriptionWings.textContent = 'Lightly breaded with savory herbs, made with 100% whole white breast meat. Customize with your choice of dipping sauce: Sweet Mango Habanero, BBQ, Kicker Hot Sauce, Blue Cheese or Ranch.\n';
                // textPizzaName.textContent = 'Robust Inspired Tomato Sauce, Cheese\n';

                let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/S_BONELESS.jpg'

                imgWings.src = imagePath
                wings.img = imagePath;
          } else if (btnClickWings[i].getAttribute('data-dpz-track-evt-name').includes('Specialty Chicken – Crispy Bacon')) {

                segmentedRadioComponent.style.display = 'none';
                wings.price = '17.00';
                wings.quantity = '1';
                titleWings.textContent = 'SPECIALTY CHICKEN – CRISPY BACON & TOMATO\n';
                titleWings2.textContent = '12-Piece Specialty Chicken – Crispy Bacon & Tomato';
                descriptionWings.textContent = 'Tender bites of lightly breaded, 100% whole breast white meat chicken, topped with garlic parmesan white sauce, a blend of cheese made with mozzarella and cheddar, crispy bacon and tomato\n';
                // textPizzaName.textContent = 'Robust Inspired Tomato Sauce, Cheese\n';

                let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/S_CBT.jpg'

                imgWings.src = imagePath
                wings.img = imagePath;
          } else if (btnClickWings[i].getAttribute('data-dpz-track-evt-name').includes('Specialty Chicken – Classic Hot Buffalo')) {
                // const segmentedRadioComponent = document.querySelector('.segmented-radio__component')
                segmentedRadioComponent.style.display = 'none';
                wings.price = '17.00';
                wings.quantity = '1';
                titleWings.textContent = 'SPECIALTY CHICKEN – CLASSIC HOT BUFFALO\n';
                titleWings2.textContent = '12-Piece Specialty Chicken – Classic Hot Buffalo';
                descriptionWings.textContent = 'Tender bites of lightly breaded, 100% whole breast white meat chicken, topped with classic hot buffalo sauce, ranch, a blend of cheese made with mozzarella and cheddar, and feta.'

                let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/S_CHSC.jpg'

                imgWings.src = imagePath
                wings.img = imagePath;
          } else if (btnClickWings[i].getAttribute('data-dpz-track-evt-name').includes('Specialty Chicken – Sweet BBQ Bacon')) {
                // const segmentedRadioComponent = document.querySelector('.segmented-radio__component')
                segmentedRadioComponent.style.display = 'none';
                wings.price = '17.00';
                wings.quantity = '1';
                titleWings.textContent = 'SPECIALTY CHICKEN – SWEET BBQ BACON';
                titleWings2.textContent = '12-Piece Specialty Chicken – Sweet BBQ Bacon\n';
                descriptionWings.textContent = 'Tender bites of lightly breaded, 100% whole breast white meat chicken, topped with sweet and smoky BBQ sauce, a blend of cheese made with mozzarella and cheddar, and crispy bacon.'
                let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/S_SBB.jpg'

                imgWings.src = imagePath
                wings.img = imagePath;
          } else if (btnClickWings[i].getAttribute('data-dpz-track-evt-name').includes('Specialty Chicken – Spicy Jalapeno - Pineapple')) {
                // const segmentedRadioComponent = document.querySelector('.segmented-radio__component')
                segmentedRadioComponent.style.display = 'none';
                wings.price = '17.00';
                wings.quantity = '1';
                titleWings.textContent = 'SPECIALTY CHICKEN – SPICY JALAPENO - PINEAPPLE';
                titleWings2.textContent = '12-Piece Specialty Chicken – Spicy Jalapeno - Pineapple\n';
                descriptionWings.textContent = 'Tender bites of lightly breaded, 100% whole breast white meat chicken, topped with sweet and spicy mango-habanero sauce, a blend of cheese made with mozzarella and cheddar, jalapeno and pineapple.'
                let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/S_SJP.jpg'

                imgWings.src = imagePath
                wings.img = imagePath;
          }

          blockWingsContainer.style.display = 'block';
          getAllValues();
    });
}

// ================================================================================================= Drinks
const containerModalDrinks = document.querySelector('#pageModalDrinks');
const titleDrinks = containerModalDrinks.querySelector('#js-modalHeader');
const titleDrinksTwo = containerModalDrinks.querySelector('.serving-options__name');
const blockImgDescDrinks = containerModalDrinks.querySelector('.product-builder__sidebar');
const closeBtnDrinks = containerModalDrinks.querySelector('.modal__close-btn');

const menuDrinks = document.querySelector('#splitFrameDrinks');
const btnClickDrinks = menuDrinks.querySelectorAll('.DrinksChooseMenu');
const orderDrinks = containerModalDrinks.querySelector('.product-builder__footer')

let drinks = {
    'name': '',
    'description': '',
    'quantity': '',
    'size': '',
    'price': '',
    'img': '',
    'sides': []
}

closeBtnDrinks.addEventListener('click', () => {containerModalDrinks.style.display = 'none';})


function getAmountDrinks() {
    const blockAmount = containerModalDrinks.querySelector('.segmented-radio__component');
    const labelsDrinks = blockAmount.querySelectorAll('label');
    for (let i = 0; i < labelsDrinks.length; i++) {
        labelsDrinks[i].addEventListener('click', function () {
            let valueDrinksAmount = labelsDrinks[i].textContent
            console.log('valueDrinksAmount: ', valueDrinksAmount)
            if (valueDrinksAmount === '1L-Bottle') {
                drinks.size = '1L'
                drinks.price = '4.00'
            } else if (valueDrinksAmount === '2L-Bottle') {
                drinks.size = '2L'
                drinks.price = '7.75'
            } else {
                drinks.size = '12oz'
                drinks.price = '2.50'
            }
        })
    }
}

const quantityBlockDrink = containerModalDrinks.querySelector('.quantity__component');
let valueQuant = quantityBlockDrink.querySelector('div');

function quantityProductDrinks() {
    let buttonsQuant = quantityBlockDrink.querySelectorAll('button');
    let buttonsQuantMinus = buttonsQuant[0];
    let buttonsQuantPlus = buttonsQuant[1];

    buttonsQuantMinus.addEventListener('click', function () {
        console.log('Minus');
        let value = Number(valueQuant.textContent)
        valueQuant.textContent = value - 1
        if (value <= 1) {
            valueQuant.textContent = 1;
            buttonsQuant[0].style.backgroundColor = '#bbb';
            buttonsQuant[0].style.cursor = 'not-allowed';
            buttonsQuant[0].setAttribute('disabled', '');
        }
        drinks.quantity = valueQuant.textContent
    })

    buttonsQuantPlus.addEventListener('click', function () {
        console.log('Plus');
        let value = Number(valueQuant.textContent)
        valueQuant.textContent = value + 1
        if (value >= 1) {
            buttonsQuant[0].style.backgroundColor = '#006491';
            buttonsQuant[0].style.cursor = 'pointer';
            buttonsQuant[0].removeAttribute('disabled');
        }
        drinks.quantity = valueQuant.textContent
    })
}

function addDrinksToOrder() {
    let order = localStorage.getItem('Order')
    if (order) {
        let newOrder = JSON.parse(order)
        newOrder.push(drinks);
        localStorage.setItem('Order', JSON.stringify(newOrder));
    } else {
        localStorage.setItem('Order', JSON.stringify([drinks]));
    }
    window.location.href = '/order/step2/'
}


const AddToOrderDrinks = containerModalDrinks.querySelector('.product-builder__footer')
function addToOrderDrinks() {
    const buttons = AddToOrderDrinks.querySelectorAll('button')
    buttons[0].addEventListener('click', () => {containerModalDrinks.style.display = 'none';})
    buttons[1].addEventListener('click', function (e) {
        e.preventDefault()
        console.log('drinks: ', drinks)
        addDrinksToOrder();
    })
}


for (let i = 0; i < btnClickDrinks.length; i++) {
    btnClickDrinks[i].addEventListener("click", function (e) {
        if (btnClickDrinks[i].getAttribute('data-dpz-track-evt-name').includes('Coca-Cola')) {
            drinks.price = '2.50';
            drinks.quantity = '1';
            drinks.size = '12oz'
            drinks.name = 'Coca-Cola®'
            drinks.description = 'The authentic cola sensation that is a refreshing part of sharing life\'s enjoyable moments.'
            titleDrinks.textContent = 'COCA-COLA®';
            titleDrinksTwo.textContent = 'Coca-Cola®';
            blockImgDescDrinks.querySelector('p').textContent = 'The authentic cola sensation that is a refreshing part of sharing life\'s enjoyable moments.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_COKE.jpg'

            blockImgDescDrinks.querySelector('img').src = imagePath
            drinks.img = imagePath;
            valueQuant.textContent = 1
        } else if (btnClickDrinks[i].getAttribute('data-dpz-track-evt-name').includes('Sprite')) {
            drinks.price = '2.50';
            drinks.quantity = '1';
            drinks.size = '12oz'
            drinks.name = 'Sprite®'
            drinks.description = 'Unique Lymon (lemon-lime) flavor, clear, clean and crisp with no caffeine.'
            titleDrinks.textContent = 'SPRITE®';
            titleDrinksTwo.textContent = 'Sprite®\n';
            blockImgDescDrinks.querySelector('p').textContent = 'Unique Lymon (lemon-lime) flavor, clear, clean and crisp with no caffeine.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_SPRITE.jpg'

            blockImgDescDrinks.querySelector('img').src = imagePath
            drinks.img = imagePath;
            valueQuant.textContent = 1
        } else if (btnClickDrinks[i].getAttribute('data-dpz-track-evt-name').includes('Water')) {
            drinks.price = '3.75';
            drinks.quantity = '1';
            drinks.size = '12oz'
            drinks.name = 'Bottle Water'
            drinks.description = 'Fresh, crisp tasting water.'
            titleDrinks.textContent = 'WATER';
            titleDrinksTwo.textContent = 'Bottle Water\n';
            blockImgDescDrinks.querySelector('p').textContent = 'Fresh, crisp tasting water';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_WATER.jpg'

            blockImgDescDrinks.querySelector('img').src = imagePath
            drinks.img = imagePath;
            valueQuant.textContent = 1
        } else if (btnClickDrinks[i].getAttribute('data-dpz-track-evt-name').includes('FUZE® Iced Tea Lemon')) {
            drinks.price = '3.50';
            drinks.quantity = '1';
            drinks.size = '12oz'
            drinks.name = 'FUZE® Iced Tea Lemon\n'
            drinks.description = 'Naturally flavored with lemon to deliver bold refreshment.'
            titleDrinks.textContent = 'FUZE® ICED TEA LEMON\n';
            titleDrinksTwo.textContent = 'FUZE® Iced Tea Lemon\n';
            blockImgDescDrinks.querySelector('p').textContent = 'Naturally flavored with lemon to deliver bold refreshment.';

            let imagePath = 'https://cache.dominos.com/wam/prod/market/AW/_en/images/promo/0ba441cb-f34a-4179-b358-722028852359.jpg'

            blockImgDescDrinks.querySelector('img').src = imagePath
            drinks.img = imagePath;
            valueQuant.textContent = 1
        } else if (btnClickDrinks[i].getAttribute('data-dpz-track-evt-name').includes('FUZE® Iced Tea Peach')) {
            drinks.price = '3.50';
            drinks.quantity = '1';
            drinks.size = '12oz'
            drinks.name = 'FUZE® ICED TEA PEACH\n'
            drinks.description = 'Naturally flavored with lemon to deliver bold refreshment.'
            titleDrinks.textContent = 'FUZE® ICED TEA PEACH\n';
            titleDrinksTwo.textContent = 'FUZE® Iced Tea Peach\n';
            blockImgDescDrinks.querySelector('p').textContent = 'Naturally flavored with lemon to deliver bold refreshment.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/placeholder.jpg'

            blockImgDescDrinks.querySelector('img').src = imagePath
            drinks.img = imagePath;
            valueQuant.textContent = 1
        } else if (btnClickDrinks[i].getAttribute('data-dpz-track-evt-name').includes('C-C No Sugar®')) {
            drinks.price = '2.50';
            drinks.quantity = '1';
            drinks.size = '12oz'
            drinks.name = 'COCA-COLA NO SUGAR®\n'
            drinks.description = 'Beautifully balanced adult cola taste in a no calorie beverage.'
            titleDrinks.textContent = 'COCA-COLA NO SUGAR®\n';
            titleDrinksTwo.textContent = 'Coca-Cola No Sugar®\n';
            blockImgDescDrinks.querySelector('p').textContent = 'Beautifully balanced adult cola taste in a no calorie beverage.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/placeholder.jpg'

            blockImgDescDrinks.querySelector('img').src = imagePath
            drinks.img = imagePath;
            valueQuant.textContent = 1
        }
        // changeValueOz();

        containerModalDrinks.style.display = 'block';
    })
}

quantityProductDrinks();
getAmountDrinks();
addToOrderDrinks();


// ================================================================================================= Desserts
const containerModelDessert = document.querySelector('#pageModalDesserts');
const titleModelDessert = containerModelDessert.querySelector('.card__title');
const titleModelDessertTwo = containerModelDessert.querySelector('.serving-options__name');
const imgDescrModelDessert = containerModelDessert.querySelector('.product-builder__sidebar');


const menuDesserts = document.querySelector('#splitFrameDessert');
const btnClickDesserts = menuDesserts.querySelectorAll('.DessertsChooseMenu');

const closeBtnDessert = containerModelDessert.querySelector('.modal__close-btn')
closeBtnDessert.addEventListener('click', () => {containerModelDessert.style.display = 'none';})

const blockImgDescDessert = containerModelDessert.querySelector('.product-builder__sidebar');

let desserts = {
    'name': '',
    'description': '',
    'quantity': '',
    'size': '',
    'price': '',
    'img': '',
    'sides': []
}


const quantityBlockDessert = containerModelDessert.querySelector('.quantity__component');
let valueQuantityDessert = quantityBlockDessert.querySelector('div');

function quantityProductDessert() {
    let buttonsQuant = quantityBlockDessert.querySelectorAll('button');
    let buttonsQuantMinus = buttonsQuant[0];
    let buttonsQuantPlus = buttonsQuant[1];

    buttonsQuantMinus.addEventListener('click', function () {
        let value = Number(valueQuantityDessert.textContent)
        valueQuantityDessert.textContent = value - 1
        if (value <= 1) {
            valueQuantityDessert.textContent = 1;
            buttonsQuant[0].style.backgroundColor = '#bbb';
            buttonsQuant[0].style.cursor = 'not-allowed';
            buttonsQuant[0].setAttribute('disabled', '');
        }
        desserts.quantity = valueQuantityDessert.textContent
    })

    buttonsQuantPlus.addEventListener('click', function () {
        let value = Number(valueQuantityDessert.textContent)
        valueQuantityDessert.textContent = value + 1
        if (value >= 1) {
            buttonsQuant[0].style.backgroundColor = '#006491';
            buttonsQuant[0].style.cursor = 'pointer';
            buttonsQuant[0].removeAttribute('disabled');
        }
        desserts.quantity = valueQuantityDessert.textContent
    })
}


function addDessertToOrder() {
    let order = localStorage.getItem('Order')
    if (order) {
        let newOrder = JSON.parse(order)
        newOrder.push(desserts);
        localStorage.setItem('Order', JSON.stringify(newOrder));
    } else {
        localStorage.setItem('Order', JSON.stringify([desserts]));
    }
    window.location.href = '/order/step2/'
}


const AddToOrderDessert = containerModelDessert.querySelector('.product-builder__footer')
function addToOrderDessert() {
    const buttons = AddToOrderDessert.querySelectorAll('button')
    buttons[0].addEventListener('click', () => {containerModelDessert.style.display = 'none';})
    buttons[1].addEventListener('click', function (e) {
        e.preventDefault()
        console.log('desserts: ', desserts)
        addDessertToOrder();
    })
}

for (let i = 0; i < btnClickDesserts.length; i++) {
    btnClickDesserts[i].addEventListener("click", function (e) {
        if (btnClickDesserts[i].getAttribute('data-dpz-track-evt-name').includes('Chocolate Lava Crunch Cakes')) {
            desserts.price = '12.00';
            desserts.quantity = '1';
            desserts.size = '2-Piece'
            desserts.name = '2-Piece Chocolate Lava Crunch Cakes\n'
            desserts.description = 'Indulge in two delectable oven-baked chocolate cakes with molten chocolate fudge on the inside. Perfectly topped with a dash of powdered sugar.'
            titleModelDessert.textContent = 'CHOCOLATE LAVA CRUNCH CAKES\n';
            titleModelDessertTwo.textContent = '2-Piece Chocolate Lava Crunch Cakes\n';
            blockImgDescDessert.querySelector('p').textContent = 'Indulge in two delectable oven-baked chocolate cakes with molten chocolate fudge on the inside. Perfectly topped with a dash of powdered sugar.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_LAVA.jpg'

            blockImgDescDessert.querySelector('img').src = imagePath
            desserts.img = imagePath;
            valueQuantityDessert.textContent = 1
        } else if (btnClickDesserts[i].getAttribute('data-dpz-track-evt-name').includes('Cinna Stix®')) {
            desserts.price = '8.25';
            desserts.quantity = '1';
            desserts.size = '8-Piece'
            desserts.name = '8-Piece Cinna Stix®'
            desserts.description = 'Enjoy a warm order of sweet cinnamon and sugar oven-baked breadsticks. Drizzle on the included decadent icing with a hint of vanilla.'
            titleModelDessert.textContent = 'CINNA STIX®\n';
            titleModelDessertTwo.textContent = '8-Piece Cinna Stix®';
            blockImgDescDessert.querySelector('p').textContent = 'Enjoy a warm order of sweet cinnamon and sugar oven-baked breadsticks. Drizzle on the included decadent icing with a hint of vanilla.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_CINBRD.jpg'

            blockImgDescDessert.querySelector('img').src = imagePath
            desserts.img = imagePath;
            valueQuantityDessert.textContent = 1
        } else if (btnClickDesserts[i].getAttribute('data-dpz-track-evt-name').includes('Domino\'s Marbled Cookie Brownie™')) {
            desserts.price = '7.25';
            desserts.quantity = '1';
            desserts.size = '3-Piece'
            desserts.name = 'Domino\'s Marbled Cookie Brownie™\n'
            desserts.description = 'Satisfy your sweet tooth! Taste the decadent blend of gooey milk chocolate chunk cookie and delicious fudge brownie. Oven-baked to perfection and cut into 9 pieces - this dessert is perfect to share with the whole group.'
            titleModelDessert.textContent = 'DOMINO\'S MARBLED COOKIE BROWNIE™\n';
            titleModelDessertTwo.textContent = 'Domino\'s Marbled Cookie Brownie™\n';
            blockImgDescDessert.querySelector('p').textContent = 'Satisfy your sweet tooth! Taste the decadent blend of gooey milk chocolate chunk cookie and delicious fudge brownie. Oven-baked to perfection and cut into 9 pieces - this dessert is perfect to share with the whole group.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_MRBRWNE.jpg'

            blockImgDescDessert.querySelector('img').src = imagePath
            desserts.img = imagePath;
            valueQuantityDessert.textContent = 1
        }

        containerModelDessert.style.display = 'block';
    })
}

quantityProductDessert();
addToOrderDessert();

// ================================================================================================= Sides
const containerSidesModel = document.querySelector('#pageModalSides');
const titleModelSides = containerSidesModel.querySelector('.card__title');
const titleModelSidesTwo = containerSidesModel.querySelector('.serving-options__name');

const containerSidesPage = document.querySelector('#splitFrameSides');
const btnClickSides = document.querySelectorAll('.SidesChooseMenu');

const closeBtnSides = containerSidesModel.querySelector('.modal__close-btn')
closeBtnSides.addEventListener('click', () => {containerSidesModel.style.display = 'none';})

let sides = {
    'name': '',
    'description': '',
    'quantity': '',
    'size': '',
    'price': '',
    'img': '',
    'sides': []
}

const blockImgDescSides = containerSidesModel.querySelector('.product-builder__sidebar');

const quantityBlockSides = containerSidesModel.querySelectorAll('.quantity__component');
let valueQuantSidesProduct = quantityBlockSides[0].querySelector('div');

function addSidesToOrder() {
    let order = localStorage.getItem('Order')
    if (order) {
        let newOrder = JSON.parse(order)
        newOrder.push(sides);
        localStorage.setItem('Order', JSON.stringify(newOrder));
    } else {
        localStorage.setItem('Order', JSON.stringify([sides]));
    }
    window.location.href = '/order/step2/'
}

const addToOrderSides = containerSidesModel.querySelector('.product-builder__footer')
function addToOrdersSides() {
    const buttons = addToOrderSides.querySelectorAll('button')
    buttons[0].addEventListener('click', () => {containerSidesModel.style.display = 'none';})
    buttons[1].addEventListener('click', function (e) {
        e.preventDefault()
        for (let i = 0; i < quantityBlockSides.length; i++) {
            let valueQuant = quantityBlockSides[i].querySelector('div');
            let amount = valueQuant.textContent;

            if (valueQuant.getAttribute('data-type-product') === 'sause2' && valueQuant.textContent > 0) {
                    if (valueQuant.getAttribute('data-type-name') === 'Marinara') {
                        idx = sides.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            sides.sides.splice(idx,1);
                            let valueQuant = quantityBlockSides[1].querySelector('div');
                            let amount = valueQuant.textContent;
                            sides.sides.push(
                                {
                                    'id': i,
                                    'name': 'Marinara',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SIDMAR.jpg'
                                }
                            )
                        } else {
                            let valueQuant = quantityBlockSides[1].querySelector('div');
                            let amount = valueQuant.textContent;
                            sides.sides.push(
                                {
                                    'id': i,
                                    'name': 'Marinara',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SIDMAR.jpg'
                                }
                            )
                        }
                    } else if (valueQuant.getAttribute('data-type-name') === 'Ranch') {
                        idx = sides.sides.map(function (e) {return e.id}).indexOf(i)
                        if (idx !== -1) {
                            sides.sides.splice(idx,1);
                            let valueQuant = quantityBlockSides[2].querySelector('div');
                            let amount = valueQuant.textContent;


                            sides.sides.push(
                                {
                                    'id': i,
                                    'name': 'Ranch',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SIDRAN.jpg'
                                }
                            )
                        } else {
                            let valueQuant = quantityBlockSides[2].querySelector('div');
                            let amount = valueQuant.textContent;
                            sides.sides.push(
                                {
                                    'id': i,
                                    'name': 'Ranch',
                                    'quantity': Number(amount),
                                    'price': 1.75,
                                    'img': 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/thumbnails/F_SIDRAN.jpg'
                                }
                                )
                        }
                    }
            } else if (valueQuant.getAttribute('data-type-product') === 'productCountSides') {
                let valueQuant = quantityBlockSides[0].querySelector('div');
                let amount = valueQuant.textContent;
                sides.quantity = Number(amount);
            }
        }
        addSidesToOrder()
        // console.log('sides: ', sides)
    })
}

function quantityProductSides() {
    // Block Quanitity
    for (let i = 0; i < quantityBlockSides.length; i++) {
        let buttonsQuant = quantityBlockSides[i].querySelectorAll('button');
        let valueQuant = quantityBlockSides[i].querySelector('div');

        buttonsQuant[0].addEventListener('click', function () {
            let value = Number(valueQuant.textContent)
            if (valueQuant.getAttribute('data-type-product') === 'Chicken') {
                if (value === 1) {
                    buttonsQuant[0].style.backgroundColor = '#bbb';
                    buttonsQuant[0].style.cursor = 'not-allowed';
                    buttonsQuant[0].setAttribute('disabled', '')
                    valueQuant.textContent = 1;
                } else {
                    valueQuant.textContent = value - 1;
                }
            }
            else if (value <= 0) {
                valueQuant.textContent = 0;
                buttonsQuant[0].style.backgroundColor = '#bbb';
                buttonsQuant[0].style.cursor = 'not-allowed';
                buttonsQuant[0].setAttribute('disabled', '')
            } else {
                valueQuant.textContent = value - 1
            }
        })

        buttonsQuant[1].addEventListener('click', function () {
            let value = Number(valueQuant.textContent)
            valueQuant.textContent = value + 1
            if (value >= 1) {
                buttonsQuant[0].style.backgroundColor = '#006491';
                buttonsQuant[0].style.cursor = 'pointer';
                buttonsQuant[0].removeAttribute('disabled');
            }
            valueQuant.textContent = value + 1
            // console.log('value: ', value)
        })
    }
}


for (let i=0; i<btnClickSides.length; i++) {
    btnClickSides[i].addEventListener('click', function () {
        if (btnClickSides[i].getAttribute('data-dpz-track-evt-name').includes('Breadsticks')) {
            sides.price = '7.00';
            sides.quantity = '1';
            sides.size = '8-Piece'
            sides.name = '8-Piece Breadsticks\n'
            sides.description = 'Breadsticks baked to a golden brown, seasoned with a savory blend of garlic, Romano cheese and parsley. Served with a side of marinara.'
            titleModelSides.textContent = 'BREADSTICKS';
            titleModelSidesTwo.textContent = '8-Piece Breadsticks\n';
            blockImgDescSides.querySelector('p').textContent = 'Breadsticks baked to a golden brown, seasoned with a savory blend of garlic, Romano cheese and parsley. Served with a side of marinara.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_TWISTBRD.jpg'

            blockImgDescSides.querySelector('img').src = imagePath
            sides.img = imagePath;
            // valueQuantityDessert.textContent = 1
            valueQuantSidesProduct.textContent = 1
        } else if (btnClickSides[i].getAttribute('data-dpz-track-evt-name').includes('Parmesan Bread Bites')) {
            sides.price = '6.50';
            sides.quantity = '1';
            sides.size = '16-Piece'
            sides.name = 'Parmesan Bread Bites\n'
            sides.description = 'Taste the flavor of our oven baked, bite-size breadsticks lightly sprinkled with Parmesan-Asiago cheeses and seasoned with garlic and even more Parmesan. Perfectly delicious for sharing and dipping! Add Marinara or your favorite dipping cup for an additional charge.'
            titleModelSides.textContent = 'PARMESAN BREAD BITES\n';
            titleModelSidesTwo.textContent = 'Parmesan Bread Bites\n';
            blockImgDescSides.querySelector('p').textContent = 'Taste the flavor of our oven baked, bite-size breadsticks lightly sprinkled with Parmesan-Asiago cheeses and seasoned with garlic and even more Parmesan. Perfectly delicious for sharing and dipping! Add Marinara or your favorite dipping cup for an additional charge.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_PBITES.jpg'

            blockImgDescSides.querySelector('img').src = imagePath
            sides.img = imagePath;
            // valueQuantityDessert.textContent = 1
            valueQuantSidesProduct.textContent = 1
        } else if (btnClickSides[i].getAttribute('data-dpz-track-evt-name').includes('Stuffed Cheesy Bread with Bacon')) {
            sides.price = '16.75';
            sides.quantity = '1';
            sides.size = '8-Piece'
            sides.name = '8-Piece Stuffed Cheesy Bread with Bacon & Jalapeno'
            sides.description = 'Oven baked breadsticks stuffed with cheese, smoked bacon & jalapeno peppers - covered in a blend of cheese made with 100% Mozzarella and Cheddar Cheese. Seasoned with a sprinkling of garlic, parsley and Romano cheese. Add Marinara or your favorite dipping cup for an additional charge.'
            titleModelSides.textContent = 'STUFFED CHEESY BREAD WITH BACON & JALAPENO';
            titleModelSidesTwo.textContent = '8-Piece Stuffed Cheesy Bread with Bacon & Jalapeno';
            blockImgDescSides.querySelector('p').textContent = 'Oven baked breadsticks stuffed with cheese, smoked bacon & jalapeno peppers - covered in a blend of cheese made with 100% Mozzarella and Cheddar Cheese. Seasoned with a sprinkling of garlic, parsley and Romano cheese. Add Marinara or your favorite dipping cup for an additional charge.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_SBBRD.jpg'

            blockImgDescSides.querySelector('img').src = imagePath
            sides.img = imagePath;
            // valueQuantityDessert.textContent = 1
            valueQuantSidesProduct.textContent = 1
        } else if (btnClickSides[i].getAttribute('data-dpz-track-evt-name').includes('Stuffed Cheesy Bread')) {
            sides.price = '16.75';
            sides.quantity = '1';
            sides.size = '8-Piece'
            sides.name = '8-Piece Stuffed Cheesy Bread\n'
            sides.description = 'Indulge in cheesy perfection. Our oven-baked breadsticks are generously stuffed and covered with an exquisite blend of 100% Mozzarella and Cheddar Cheeses then seasoned with a sprinkling of garlic, parsley, and Romano cheese.'
            titleModelSides.textContent = 'STUFFED CHEESY BREAD';
            titleModelSidesTwo.textContent = '8-Piece Stuffed Cheesy Bread\n';
            blockImgDescSides.querySelector('p').textContent = 'Indulge in cheesy perfection. Our oven-baked breadsticks are generously stuffed and covered with an exquisite blend of 100% Mozzarella and Cheddar Cheeses then seasoned with a sprinkling of garlic, parsley, and Romano cheese.';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_SCBRD.jpg'

            blockImgDescSides.querySelector('img').src = imagePath
            sides.img = imagePath;
            // valueQuantityDessert.textContent = 1
            valueQuantSidesProduct.textContent = 1
        } else if (btnClickSides[i].getAttribute('data-dpz-track-evt-name').includes('Stuffed Cheesy Bread with Bacon')) {
            sides.price = '16.75';
            sides.quantity = '1';
            sides.size = '8-Piece'
            sides.name = '8-Piece Stuffed Cheesy Bread with Bacon\n'
            sides.description = 'Oven baked breadsticks stuffed with cheese & smoked bacon - covered in a blend of cheese made with 100% Mozzarella and Cheddar Cheese. Seasoned with a sprinkling of garlic, parsley and Romano cheese. Add Marinara or your favorite dipping cup for an additional charge'
            titleModelSides.textContent = 'STUFFED CHEESY BREAD WITH BACON';
            titleModelSidesTwo.textContent = '8-Piece Stuffed Cheesy Bread with Bacon\n';
            blockImgDescSides.querySelector('p').textContent = 'Oven baked breadsticks stuffed with cheese & smoked bacon - covered in a blend of cheese made with 100% Mozzarella and Cheddar Cheese. Seasoned with a sprinkling of garlic, parsley and Romano cheese. Add Marinara or your favorite dipping cup for an additional charge';

            let imagePath = 'https://cache.dominos.com/olo/6_88_2/assets/build/market/AW/_en/images/img/products/larges/F_SCBRD.jpg'

            blockImgDescSides.querySelector('img').src = imagePath
            sides.img = imagePath;
            // valueQuantityDessert.textContent = 1
            valueQuantSidesProduct.textContent = 1
        }

        containerSidesModel.style.display = 'block';
    })
}

quantityProductSides()
addToOrdersSides()
