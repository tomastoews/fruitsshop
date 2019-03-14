import './../scss/main.scss';
import Cart from './cart';
import products from './products';

let mainCart = new Cart();

const tabBar = document.querySelector('.tabbar');
const tabBarTabs = tabBar.querySelector('.tabs');
const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const tab3 = document.querySelector('.tab3');
const cart = document.querySelector('.cart');
const cartButton = document.querySelector('.cart-button');

let previousTabContent;

tab1.addEventListener('click', (e) => toggle(e));
tab2.addEventListener('click', (e) => toggle(e));
tab3.addEventListener('click', (e) => toggle(e));
cartButton.addEventListener('click', (e) => {
    if (tabBar.classList.contains('cart-mode') == false) {
        openCart(e); 
    }
    else {
        closeCart(e); 
    }
});

document.querySelectorAll('.add-to-cart').forEach(item => {
    item.addEventListener('click',(e) => addItem(e));
});

const toggle = (e) => {
    if (e.target.classList.contains('active'))
        return;

    const newTab = e.target;
    const oldTab = tabBar.querySelector('.active');
    const newTabContent = document.querySelector(`.${e.target.dataset.content}`);
    const oldTabContent = document.querySelector(`.${oldTab.dataset.content}`);

    oldTabContent.classList.remove('show');
    oldTabContent.classList.add('hide');

    setTimeout(() => {
        document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
        newTabContent.style.display = 'grid';

        oldTabContent.classList.remove('hide');
        newTabContent.classList.add('show');

        tabBar.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        newTab.classList.add('active');
    }, 500);
};

const openCart = (e) => {   
    previousTabContent = document.querySelector(`.${tabBar.querySelector('.active').dataset.content}`);

    previousTabContent.classList.remove('show');
    previousTabContent.classList.add('hide');
    tabBar.classList.add('cart-mode');
    
    setTimeout(() => {
        previousTabContent.classList.remove('hide');
        previousTabContent.style.display = 'none';
        tabBarTabs.style.display = 'none';
        cart.style.display = 'block';
        cart.classList.add('open');
    }, 500);
};

const closeCart = (e) => {
    tabBar.classList.remove('cart-mode');
    tabBar.classList.add('cart_close');
    tabBarTabs.style.display = 'flex';

    cart.classList.remove('open');
    cart.classList.add('close');

    setTimeout(() => {
        tabBar.classList.remove('cart_close');

        previousTabContent.classList.remove('cart-mode');
        previousTabContent.classList.add('show');
        setTimeout(() => previousTabContent.classList.remove('show'), 500);
        previousTabContent.style.display = 'grid';

        cart.classList.remove('close');
        cart.style.display = 'none';
    }, 500);
};

const addItem = (e) => {
    const id = e.target.parentElement.dataset.itemId;
    const product = products.filter(p => p.id == id)[0];

    mainCart.addProduct(product);
};