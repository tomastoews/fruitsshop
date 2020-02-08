import products from './products';

class Cart {
    constructor () {
        this.list = document.querySelector('.cart-container');
        this.priceBox = document.querySelector('.total-price');
        this.priceText = document.querySelector('.price-info');
        this.emptyMessage = document.querySelector('.message');
        this.price = 0;
        this.addedProducts = [];
    }
    addProduct(item) {
        if (item) {
            const product = document.createElement('div');
            product.classList.add('item');
            product.innerHTML = `
                <div class="title">
                    <span>${item.title}</span>
                </div>
                <div class="price">
                    <span>${item.price} €</span>
                </div>
                <div class="remove" data-id="${item.id}">x</div>
            `;
            product.querySelector('.remove').addEventListener('click', (e) => this.removeProduct(e));
            this.addPrice(item.price);
            this.list.append(product);
            this.filledMode();
        }
    }
    removeProduct(e) {
        const id = e.target.dataset.id;
        const product = products.filter(p => p.id == id)[0];
        this.substractPrice(product.price);
        e.target.parentElement.remove();
        if (this.price == 0 || this.price < 0) this.emptyMode();
    }
    addPrice(price) {
        this.price = this.price + price;
        this.price = Math.floor(this.price * 100) / 100;
        this.priceText.innerHTML = `Gesamtsumme: ${this.price} €`;
    }
    substractPrice(price) {
        this.price = this.price - price;
        this.price = Math.floor(this.price * 100) / 100; // Truncate decimals to max 2 places only
        this.priceText.innerHTML = `Gesamtsumme: ${this.price} €`;
    }
    filledMode() {
        this.priceBox.style.display = 'flex';
        this.emptyMessage.style.display = 'none';
    }
    emptyMode() {
        this.priceBox.style.display = 'none';
        this.emptyMessage.style.display = 'flex';
    }
};

export default Cart;