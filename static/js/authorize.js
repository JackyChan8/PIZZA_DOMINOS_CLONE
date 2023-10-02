if (localStorage.getItem('email')) {
    // Logout
    const btnLogout = document.querySelector('#logoutBtn');

    btnLogout.addEventListener('click', function () {
        localStorage.removeItem("email");
        localStorage.removeItem("first_name");
        localStorage.removeItem("last_name");
        localStorage.removeItem("phone");
    })

    // Get field from localstorage
    const firstName = localStorage.getItem('first_name');

    // Username add
    const usernameLink = document.querySelector('#usernameLink');
    usernameLink.textContent = firstName;
    if (firstName === 'user') {
        btnLogout.textContent = ''
    } else {
        btnLogout.textContent = 'Not ' + firstName + '? Sign Out'
    }
    const order = JSON.parse(localStorage.getItem('Order'));
    console.log(order)
    let totalQuantityProducts = 0;
    if (order) {
        order.map(item => {
            totalQuantityProducts += Number(item.quantity)
            item.sides.map(side => {
                totalQuantityProducts += Number(side.quantity)
            })
        })
    }
    console.log('totalQuantityProducts: ', totalQuantityProducts)
    // const navCartGroup = document.querySelector('.nav__group--cart');
    // const siteNavToggleCart = navCartGroup.querySelector('.site-nav__toggle--cart');
    const quantityCartNumber = document.querySelector('.js-cartQuantityBadge');
    console.log('quantityCartNumber: ', quantityCartNumber)
    if (quantityCartNumber) {
        quantityCartNumber.textContent = totalQuantityProducts.toString();
    }
    // menu Click redirect to choose menu
    const menuLinkPizza = document.querySelector('#menuLinkSeeAll');
    if (menuLinkPizza) {
        menuLinkPizza.href = '/order?type=Delivery'
        menuLinkPizza.addEventListener('click', function () {
            window.location.href = '/order?type=Delivery'
        })
    }

    const menuLinkPizzaMobile = document.querySelector('#menuLinkSeeAll2');
    if (menuLinkPizzaMobile) {
        menuLinkPizzaMobile.href = '/order?type=Delivery'
        menuLinkPizzaMobile.addEventListener('click', function () {
            window.location.href = '/order?type=Delivery'
        })
    }
}