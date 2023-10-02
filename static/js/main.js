// localStorage.setItem("LoginID", inputLoginID.value);
// window.location.href = "./secret/index.html";

// Sign in
const signInBtn = document.querySelector('#login_btn');
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('#cardLoginClose');

if (signInBtn) {
    signInBtn.addEventListener('click', function () {
        console.log('Click');
        popupContainer.style.display = 'flex';
    }, false);
}

if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        popupContainer.style.display = 'none';
    }, false)
}


// Cart
const cartBtn = document.querySelector('.site-nav__toggle--cart');
const emptyCart = document.querySelector('.js-miniCartContainer');


// Show Cart
if (cartBtn) {
    cartBtn.addEventListener('click', function () {
        if (!localStorage.getItem('email')) {
            emptyCart.innerHTML = '<div class="mini-cart" data-quid="mini-cart">\n' +
                '        <div class="mini-cart__header"><h2 class="mini-cart__header__title" data-quid="mini-cart-header-title">Your\n' +
                '            cart</h2>\n' +
                '            <button aria-label="close" class="mini-cart__header__close-icon" data-dpz-no-track="true"\n' +
                '                    data-quid="mini-cart-header-close-button" type="button"></button>\n' +
                '        </div>\n' +
                '        <div class="mini-cart__body" style="opacity: 1;">\n' +
                '            <div class="mini-cart__body--spacer">\n' +
                '                <div><p class="mini-cart__body__content" data-quid="mini-cart-empty-messaging">Your cart is currently\n' +
                '                    empty, but your stomach doesn\'t have to be. Add some items and come back here to checkout.</p>\n' +
                '                    <div class="center">\n' +
                '                        <button type="button" id="btnStartOrder" data-quid="mini-cart-empty-continue-shopping">Start Your Order</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>'

            const startOrder = document.querySelector('#btnStartOrder');
            startOrder.addEventListener('click', function () {
                document.location.href = "/order/?type=Delivery"
            });
        } else {
            const order = JSON.parse(localStorage.getItem('Order'));
            if (order) {
                let totalPrice = 0;
                console.log('order: ', order);
                // let price = {
                //     'pizza': {
                //         '12" Hand Tossed Pizza': 23.25,
                //         '14" Hand Tossed Pizza': 31.00,
                //         '12" Crunchy Thin Crust Pizza': 23.25,
                //         '14" Crunchy Thin Crust Pizza': 31.00,
                //         '12" Handmade Pan Pizza ': 27.50,
                //     }
                // }
                html = `<div id="cartAllProducts" class="mini-cart" data-quid="mini-cart">
                       <div class="mini-cart__header"><h2 class="mini-cart__header__title" data-quid="mini-cart-header-title">Your cart</h2><button aria-label="close" class="mini-cart__header__close-icon" data-dpz-no-track="true" data-quid="mini-cart-header-close-button" type="button"></button></div>
                       <div class="mini-cart__body" style="opacity: 1;">
                           <div class="mini-cart__body--spacer">
                               <ul class="mini-cart__product-list">
                                   ${order.map((item, idx) => `
                                    <div style="display: none;">${totalPrice = totalPrice + Number(item.price * item.quantity)}</div>
                                   <li data-idx-element="${idx}" class="mini-cart__product-list__product media" data-quid="mini-cart-product-1">
                                       <img alt="" class="media__image mini-cart__product-list__product-img" data-quid="mini-cart-product-1-image" src="${item.img}">
                                       <div class="mini-cart__product-list__product-details">
                                           <h2 class="mini-cart__product-list__product-name" data-quid="mini-cart-product-1-name">
                                               <button type="button" class="btn--link btn--link-outline-offset" data-quid="mini-cart-product-1-name-button">
                                                   ${item.name}
                                               </button>
                                           </h2>
                                           <ul class="mini-cart__product-list__product-toppings" data-quid="mini-cart-product-toppings"></ul>
                                       </div>
                                       <div class="mini-cart__product-list__product-price" data-quid="mini-cart-product-1-price"><span>AWG ${item.price * item.quantity} </span></div>
                                       <fieldset class="fieldset--reset mini-cart__product-list__product-controls"><legend class="is-visually-hidden">${item.name}</legend>
                                           <label for="1|Quantity" class="mini-cart__product-list__label">
                                               Quantity:<select disabled id="1|Quantity" class="selectQuantity" name="1|Quantity" data-quid="mini-cart-product-1-quantity" data-dpz-track-evt-pagename="Mini Cart">
                                               <option value="1" ${item.quantity.toString() === '1' ? 'selected' : ''}>1</option>
                                               <option value="2" ${item.quantity.toString() === '2' ? 'selected' : ''}>2</option>
                                               <option value="3" ${item.quantity.toString() === '3' ? 'selected' : ''}>3</option>
                                               <option value="4" ${item.quantity.toString() === '4' ? 'selected' : ''}>4</option>
                                               <option value="5" ${item.quantity.toString() === '5' ? 'selected' : ''}>5</option>
                                               <option value="6" ${item.quantity.toString() === '6' ? 'selected' : ''}>6</option>
                                               <option value="7" ${item.quantity.toString() === '7' ? 'selected' : ''}>7</option>
                                               <option value="8" ${item.quantity.toString() === '8' ? 'selected' : ''}>8</option>
                                               <option value="9" ${item.quantity.toString() === '9' ? 'selected' : ''}>9</option>
                                               <option value="10" ${item.quantity.toString() === '10' ? 'selected' : ''}>10</option>
                                               <option value="11" ${item.quantity.toString() === '11' ? 'selected' : ''}>11</option>
                                               <option value="12" ${item.quantity.toString() === '12' ? 'selected' : ''}>12</option>
                                               <option value="13" ${item.quantity.toString() === '13' ? 'selected' : ''}>13</option>
                                               <option value="14" ${item.quantity.toString() === '14' ? 'selected' : ''}>14</option>
                                               <option value="15" ${item.quantity.toString() === '15' ? 'selected' : ''}>15</option>
                                               <option value="16" ${item.quantity.toString() === '16' ? 'selected' : ''}>16</option>
                                               <option value="17" ${item.quantity.toString() === '17' ? 'selected' : ''}>17</option>
                                               <option value="18" ${item.quantity.toString() === '18' ? 'selected' : ''}>18</option>
                                               <option value="19" ${item.quantity.toString() === '19' ? 'selected' : ''}>19</option>
                                               <option value="20" ${item.quantity.toString() === '20' ? 'selected' : ''}>20</option>
                                               <option value="21" ${item.quantity.toString() === '21' ? 'selected' : ''}>21</option>
                                               <option value="22" ${item.quantity.toString() === '22' ? 'selected' : ''}>22</option>
                                               <option value="23" ${item.quantity.toString() === '23' ? 'selected' : ''}>23</option>
                                               <option value="24" ${item.quantity.toString() === '24' ? 'selected' : ''}>24</option>
                                               <option value="25" ${item.quantity.toString() === '25' ? 'selected' : ''}>25</option>
                                               </select>
                                           </label>
                                           <button id="removeBtnFromCart" class="btn btn--outline mini-cart__product-list__product-controls__button btn--extra-small" data-dpz-track-evt-name="Product Removed - S_PIZZA" data-dpz-track-evt-pagename="Mini Cart" data-quid="mini-cart-product-1-remove-product" type="button">
                                               remove
                                               <span class="is-visually-hidden">: ${item.name}</span>
                                           </button>
                                           </fieldset>
                                   </li>
                                   ${item.sides.map((side, index) => `
                                    <div style="display: none;">${totalPrice = totalPrice + Number(side.price * side.quantity)}</div>
                                   <li data-idx-element="${index}" data-idx-parent="${idx}" class="mini-cart__product-list__product media" data-quid="mini-cart-product-1">
                                       <img alt="" class="media__image mini-cart__product-list__product-img" data-quid="mini-cart-product-1-image" src="${side.img}">
                                       <div class="mini-cart__product-list__product-details">
                                           <h2 class="mini-cart__product-list__product-name" data-quid="mini-cart-product-1-name">
                                               <button type="button" class="btn--link btn--link-outline-offset" data-quid="mini-cart-product-1-name-button">
                                                   ${side.name}
                                               </button>
                                           </h2>
                                           <ul class="mini-cart__product-list__product-toppings" data-quid="mini-cart-product-toppings"></ul>
                                       </div>
                                       <div class="mini-cart__product-list__product-price" data-quid="mini-cart-product-1-price"><span>AWG ${side.price * side.quantity} </span></div>
                                       <fieldset class="fieldset--reset mini-cart__product-list__product-controls"><legend class="is-visually-hidden">${side.name}</legend>
                                           <label for="1|Quantity" class="mini-cart__product-list__label">
                                               Quantity:<select disabled id="1|Quantity" class="selectQuantity" name="1|Quantity" data-quid="mini-cart-product-1-quantity" data-dpz-track-evt-pagename="Mini Cart">
                                               <option value="1" ${side.quantity.toString() === '1' ? 'selected' : ''}>1</option>
                                               <option value="2" ${side.quantity.toString() === '2' ? 'selected' : ''}>2</option>
                                               <option value="3" ${side.quantity.toString() === '3' ? 'selected' : ''}>3</option>
                                               <option value="4" ${side.quantity.toString() === '4' ? 'selected' : ''}>4</option>
                                               <option value="5" ${side.quantity.toString() === '5' ? 'selected' : ''}>5</option>
                                               <option value="6" ${side.quantity.toString() === '6' ? 'selected' : ''}>6</option>
                                               <option value="7" ${side.quantity.toString() === '7' ? 'selected' : ''}>7</option>
                                               <option value="8" ${side.quantity.toString() === '8' ? 'selected' : ''}>8</option>
                                               <option value="9" ${side.quantity.toString() === '9' ? 'selected' : ''}>9</option>
                                               <option value="10" ${side.quantity.toString() === '10' ? 'selected' : ''}>10</option>
                                               <option value="11" ${side.quantity.toString() === '11' ? 'selected' : ''}>11</option>
                                               <option value="12" ${side.quantity.toString() === '12' ? 'selected' : ''}>12</option>
                                               <option value="13" ${side.quantity.toString() === '13' ? 'selected' : ''}>13</option>
                                               <option value="14" ${side.quantity.toString() === '14' ? 'selected' : ''}>14</option>
                                               <option value="15" ${side.quantity.toString() === '15' ? 'selected' : ''}>15</option>
                                               <option value="16" ${side.quantity.toString() === '16' ? 'selected' : ''}>16</option>
                                               <option value="17" ${side.quantity.toString() === '17' ? 'selected' : ''}>17</option>
                                               <option value="18" ${side.quantity.toString() === '18' ? 'selected' : ''}>18</option>
                                               <option value="19" ${side.quantity.toString() === '19' ? 'selected' : ''}>19</option>
                                               <option value="20" ${side.quantity.toString() === '20' ? 'selected' : ''}>20</option>
                                               <option value="21" ${side.quantity.toString() === '21' ? 'selected' : ''}>21</option>
                                               <option value="22" ${side.quantity.toString() === '22' ? 'selected' : ''}>22</option>
                                               <option value="23" ${side.quantity.toString() === '23' ? 'selected' : ''}>23</option>
                                               <option value="24" ${side.quantity.toString() === '24' ? 'selected' : ''}>24</option>
                                               <option value="25" ${side.quantity.toString() === '25' ? 'selected' : ''}>25</option>
                                               </select>
                                           </label>
                                           <button id="removeBtnFromCart" class="btn btn--outline mini-cart__product-list__product-controls__button btn--extra-small" data-dpz-track-evt-name="Product Removed - S_PIZZA" data-dpz-track-evt-pagename="Mini Cart" data-quid="mini-cart-product-1-remove-product" type="button">
                                               remove
                                               <span class="is-visually-hidden">: ${side.name}</span>
                                           </button>
                                           </fieldset>
                                   </li>
                                   `).join('')}
                                    `).join('')}
                                   
                                   
                   <div class="mini-cart__footer">
                      <div class="mini-cart__footer__totals">
                          <p class="mini-cart__footer__delivery" data-quid="mini-cart-footer-delivery">Delivery Charge:AWG 3.50</p>
                          <p class="mini-cart__footer__subtotal" data-quid="mini-cart-footer-subtotal">Subtotal:&nbsp;<span>AWG ${totalPrice}</span></p>
                      </div>
                      <div class="mini-cart__footer__buttons">
                          <button type="button" class="btn--outline is-hidden@desktop">Continue shopping</button>
                          <button class="mini-cart__footer__go-to-checkout" data-dpz-track-evt-pagename="Mini Cart" data-quid="mini-cart-footer-go-to-checkout" type="button" data-dpz-track-evt-name="Go to checkout">
                              <span class="is-hidden@desktop">Checkout</span
                              <span class="is-hidden@handheld">Go to checkout</span
                          </button>
                      </div>
                   </div>
                </div>`
                emptyCart.innerHTML = html;
                // console.log('totalPrice: ', totalPrice);
                const goToCheckOutBtn = document.querySelector('.mini-cart__footer__go-to-checkout');
                goToCheckOutBtn.addEventListener('click', () => {
                    window.location.href = '/payment/step1/';
                });

                const allProductFromCart = document.querySelectorAll('.mini-cart__product-list__product');
                // console.log('allProductFromCart: ', allProductFromCart);
                // console.log('allProductFromCart: ', allProductFromCart)

                // Edit button:
                // <button id="editBtnFromCart"
                //         className="btn btn--outline mini-cart__product-list__product-controls__button btn--extra-small"
                //         data-dpz-track-evt-pagename="Mini Cart" data-quid="mini-cart-product-1-edit-product" type="button">
                //     Edit
                //     <span className="is-visually-hidden">: ${side.name}</span>
                // </button>
                const cartContainer = document.querySelector('#cartAllProducts');
                for (let i = 0; i < allProductFromCart.length; i++) {


                    const removeFromCartProduct = allProductFromCart[i].querySelector('#removeBtnFromCart');
                    // console.log(removeFromCartProduct);
                    removeFromCartProduct.addEventListener('click', () => {
                        const subtotalField = cartContainer.querySelector('.mini-cart__footer__subtotal').querySelector('span');
                        const idxElement = allProductFromCart[i].getAttribute('data-idx-element');
                        const idxParent = allProductFromCart[i].getAttribute('data-idx-parent');
                        console.log('Element', idxElement, 'Parent: ', idxParent)
                        if (idxParent) {
                            console.log('Children element', 'idx: ', idxElement)
                            let product = order[idxParent].sides[idxElement];

                            allProductFromCart[i].style.display = 'none';
                            cartContainer.style.display = 'none';
                            totalPrice = totalPrice - Number(product.price)
                            order[idxParent].sides.splice(idxElement, 1);

                            console.log('order: ', order)
                            localStorage.setItem('Order', JSON.stringify(order));
                            subtotalField.textContent = `AWG ${totalPrice}`;
                            console.log('1', order.length)
                            location.reload()
                            // console.log('product: ', product)
                        } else {
                            console.log('Parent element')
                            let product = order[idxElement];

                            allProductFromCart[i].style.display = 'none';
                            cartContainer.style.display = 'none';
                            totalPrice = totalPrice - Number(product.price)
                            order.splice(idxElement, 1);

                            console.log('order: ', order)
                            localStorage.setItem('Order', JSON.stringify(order));
                            subtotalField.textContent = `AWG ${totalPrice}`;
                            console.log('1', order.length)
                            location.reload()
                        }
                        //     const indexElement = allProductFromCart[i].getAttribute('data-idx-element');
                        // data-idx-parent -> id родительского
                        // data-idx-element
                        //     // const subtotalField = cartContainer.querySelector('.mini-cart__footer__subtotal').querySelector('span');
                        //     // let product = order[indexElement];
                        //
                        //     // console.log(product)
                        //

                    })
                }
                console.log('2', order.length)
                if (!order.length) {
                    localStorage.removeItem('Order');
                    cartContainer.style.display = 'none';
                    // window.location.reload();
                }

            } else {
                emptyCart.innerHTML = '<div class="mini-cart" data-quid="mini-cart">\n' +
                    '        <div class="mini-cart__header"><h2 class="mini-cart__header__title" data-quid="mini-cart-header-title">Your\n' +
                    '            cart</h2>\n' +
                    '            <button aria-label="close" class="mini-cart__header__close-icon" data-dpz-no-track="true"\n' +
                    '                    data-quid="mini-cart-header-close-button" type="button"></button>\n' +
                    '        </div>\n' +
                    '        <div class="mini-cart__body" style="opacity: 1;">\n' +
                    '            <div class="mini-cart__body--spacer">\n' +
                    '                <div><p class="mini-cart__body__content" data-quid="mini-cart-empty-messaging">Your cart is currently\n' +
                    '                    empty, but your stomach doesn\'t have to be. Add some items and come back here to checkout.</p>\n' +
                    '                    <div class="center">\n' +
                    '                        <button type="button" id="btnStartOrder" data-quid="mini-cart-empty-continue-shopping">Start Your Order</button>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>'

                const startOrder = document.querySelector('#btnStartOrder');
                startOrder.addEventListener('click', function () {
                    document.location.href = '/order/?type=Delivery'
                });
            }
        }
        // Close Cart
        const closeBtnCart = document.querySelector('.mini-cart__header__close-icon');
        console.log('closeBtnCart: ', closeBtnCart);

        closeBtnCart.addEventListener('click', function () {
            console.log('Close Cart');
            emptyCart.innerHTML = '';
        }, false);
    }, false);
}
// cartBtn.addEventListener('click', function () {
//     emptyCart.style.display = 'block';
//
//     if (localStorage.getItem('email')) {
//
//     } else {
//         cons
//     }
//
//     const startOrder = document.querySelector('#btnStartOrder');
//     startOrder.addEventListener('click', function () {
//         document.location.href = '/order_online/index.html'
//     });
//     // Close Cart
//     const closeBtnCart = document.querySelector('.mini-cart__header__close-icon');
//     console.log('closeBtnCart: ', closeBtnCart);
//
//     closeBtnCart.addEventListener('click', function () {
//         console.log('Close Cart');
//         emptyCart.style.display = 'none';
//         }, false);
//     }, false);

// Reset Password
const emailInput = document.querySelector('#EmailReset');
const btnForgotPass = document.querySelector('.btn--forgot-password');
const popupContainerReset = document.querySelector('.popup-container-reset-pass');
const closeBtnResetPass = document.querySelector('#close-reset-pass');
const btnBackToSignIn = document.querySelector('#js-resetPassword');

if (btnForgotPass) {
    btnForgotPass.addEventListener('click', function () {
        popupContainer.style.display = 'none';
        popupContainerReset.style.display = 'flex';
    }, false);
}

if (closeBtnResetPass) {
    closeBtnResetPass.addEventListener('click', function () {
        popupContainerReset.style.display = 'none';
    }, false)
}

if (btnBackToSignIn) {
    btnBackToSignIn.addEventListener('click', function () {
        popupContainerReset.style.display = 'none';
        popupContainer.style.display = 'flex';
    }, false)
}

// Logic Authorize User
const btnNotAuthorize = document.querySelector('#btnNotAuthorize');
const btnAuthorizeUser = document.querySelector('#btnAuthorizeUser');

if (btnNotAuthorize) {
    if (!localStorage.getItem('email')) {
        btnNotAuthorize.style.display = 'block';
        btnAuthorizeUser.style.display = 'none';
    } else {
        btnNotAuthorize.style.display = 'none';
        btnAuthorizeUser.style.display = 'block';
    }
}
// // Logout
// const btnLogout = document.querySelector('#logoutBtn');
//
// btnLogout.addEventListener('click', function () {
//     localStorage.removeItem("email");
//     localStorage.removeItem("first_name");
//     localStorage.removeItem("last_name");
//     localStorage.removeItem("phone");
// })
//
// // Get field from localstorage
// const firstName = localStorage.getItem('first_name');
//
// // Username add
// const usernameLink = document.querySelector('#usernameLink');
// usernameLink.textContent = firstName;
// btnLogout.textContent = 'Not ' + firstName + '? Sign Out'


// Login Form

// Inputs
const loginFormControl2 = document.querySelector('#loginForm');
const emailInputForm2 = document.querySelector('#Email');
const passwordInputForm2 = document.querySelector('#Password');
const loginBtnFormOne2 = document.querySelector('#loginBtnFormOne');
// const loginBtnFormTwo2 = document.querySelector('#loginBtnFormTwo');

// Labels
const labelEmailForm2 = document.querySelector('#labelEmailForm');
const labelPasswordForm2 = document.querySelector('#labelPasswordForm');

// Error Message
const errorMessageForm2 = document.querySelector('#genericOverlay');
const errorMessageBtnClose2 = document.querySelector('#errorMessageClose');

mistakes_2 = [];

function checkBlankFields() {
    if (!emailInputForm2.value) {
        labelEmailForm2.style.color = 'red';
        mistakes_2.push(0);
    }
    if (!passwordInputForm2.value) {
        labelPasswordForm2.style.color = 'red';
        mistakes_2.push(1);
    }
}


function LoginUser() {
    loginBtnFormOne2.disabled = true;
    // loginBtnFormTwo2.disabled = true;

    const formData = {
        email: emailInputForm2.value,
        password: passwordInputForm2.value,
    };

    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]')

    fetch('/user/signin', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrfToken.value
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('data: ', data);
            console.log('data[\'status\']: ', data['status']);
            if (data['status'] === 'error') {
                loginBtnFormOne2.disabled = false;
                popupContainer.style.display = 'none';
                errorMessageForm2.style.display = 'block';
            } else if (data['status'] === 'success') {
                localStorage.setItem('email', data['data']['email']);
                localStorage.setItem('first_name', data['data']['first_name']);
                localStorage.setItem('last_name', data['data']['last_name']);
                localStorage.setItem('phone', data['data']['phone']);
                window.location.href = '/en/';
            }
        })
}

function nullMistakes() {
    labelEmailForm2.style.color = '#555';
    labelPasswordForm2.style.color = '#555';
    mistakes_2 = [];
    loginBtnFormOne2.disabled = false;
    // loginBtnFormTwo2.disabled = false;
}

if (loginBtnFormOne2) {
    loginBtnFormOne2.addEventListener('click', function (e) {
        console.log('Click One btn');
        e.preventDefault();
        nullMistakes();
        checkBlankFields();

        if (!mistakes_2.length) {
            LoginUser();
        }

        errorMessageBtnClose2.addEventListener('click', function () {
            errorMessageForm2.style.display = 'none';
        })

        console.log('mistakes_2: ', mistakes_2);
        console.log(emailInputForm2.value);
        console.log(passwordInputForm2.value);
    });
}

// if (loginBtnFormTwo2) {
//     loginBtnFormTwo2.addEventListener('click', function (e) {
//         console.log('Click Two btn');
//         e.preventDefault();
//         nullMistakes();
//         checkBlankFields();
//
//         if (!mistakes_2.length) {
//             LoginUser();
//         }
//
//         console.log('mistakes_2: ', mistakes_2);
//         console.log(emailInputForm2.value);
//         console.log(passwordInputForm2.value);
//     });
// }

// Reset Password
const resetSubmitBtn = document.querySelector('#resetSubmitBtn');
const EmailResetLabel = document.querySelector('#EmailResetLabel');
const messageSuccessReset = document.querySelector('#genericOverlayReset');
const successMessageEmail = document.querySelector('#successMessageEmail');
const closeMessageSuccessReset = document.querySelector('#closeMessageSuccessReset');

mistakesResetPass = [];

function checkBlankFieldReset() {
    if (!emailInput.value) {
        EmailResetLabel.style.color = 'red';
        mistakesResetPass.push(0);
    }
}

function ResetPassUser() {
    resetSubmitBtn.disabled = true;

    const formData = {
        email: emailInput.value,
    };

    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]')

    fetch('/user/restore', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrfToken.value
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data['status'] === 'error') {
                resetSubmitBtn.disabled = false;
                EmailResetLabel.style.display = 'none';
                popupContainerReset.style.display = 'none';
                messageSuccessReset.style.display = 'block';
                successMessageEmail.textContent = emailInput.value;
            } else if (data['status'] === 'success') {
                resetSubmitBtn.disabled = false;
                EmailResetLabel.style.display = 'none';
                popupContainerReset.style.display = 'none';
                messageSuccessReset.style.display = 'block';
                successMessageEmail.textContent = emailInput.value;
            }
        })
}


function nullMistakesResetPass() {
    mistakesResetPass = [];
    EmailResetLabel.style.color = '#555';
    resetSubmitBtn.disabled = false;
}

if (resetSubmitBtn) {
    resetSubmitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nullMistakesResetPass();
        checkBlankFieldReset();
        console.log('emailInput.value: ', emailInput.value);

        if (!mistakesResetPass.length) {
            ResetPassUser();
        }
    })
}

if (closeMessageSuccessReset) {
    closeMessageSuccessReset.addEventListener('click', function () {
        messageSuccessReset.style.display = 'none';
    })
}

// Not valid password or email Message
const btnForgotPassNotValid = document.querySelector('#ForgotPasswordNeValid');

if (btnForgotPassNotValid) {
    btnForgotPassNotValid.addEventListener('click', function () {
        errorMessageForm2.style.display = 'none';
        popupContainerReset.style.display = 'block';
    })
}