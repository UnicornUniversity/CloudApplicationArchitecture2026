const { createApp } = Vue;

// Product Card Component (MVVM Component)
const ProductCard = {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
        subtotal() {
            return (this.product.price * this.quantity).toFixed(2);
        }
    },
    methods: {
        incrementQuantity() {
            this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 0) {
                this.quantity--;
            }
        },
        addToCart() {
            if (this.quantity > 0) {
                this.$emit('add-to-cart', {
                    product: this.product,
                    quantity: this.quantity
                });
                this.quantity = 0;
            }
        }
    },
    template: `
        <div class="product-card">
            <div class="product-header">
                <div class="product-title">{{ product.name }}</div>
                <div class="product-price">\${{ product.price }}</div>
            </div>
            <div class="product-description">{{ product.description }}</div>
            <div class="product-controls">
                <button @click="decrementQuantity" :disabled="quantity === 0">-</button>
                <span class="quantity">{{ quantity }}</span>
                <button @click="incrementQuantity">+</button>
                <button @click="addToCart" :disabled="quantity === 0">
                    Add to Cart {{ quantity > 0 ? '(\$' + subtotal + ')' : '' }}
                </button>
            </div>
        </div>
    `
};

// Cart Summary Component (MVVM Component)
const CartSummary = {
    props: {
        cartItems: {
            type: Array,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    computed: {
        itemCount() {
            return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        }
    },
    template: `
        <div class="cart-summary">
            <h2>Shopping Cart</h2>
            <div v-if="cartItems.length === 0">
                <em>Your cart is empty</em>
            </div>
            <div v-else>
                <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
                    <div>{{ item.product.name }} × {{ item.quantity }}</div>
                    <div>\${{ (item.product.price * item.quantity).toFixed(2) }}</div>
                </div>
                <div class="cart-total">
                    Total ({{ itemCount }} items): \${{ total.toFixed(2) }}
                </div>
            </div>
        </div>
    `
};

// Main App (Root ViewModel)
createApp({
    components: {
        'product-card': ProductCard,
        'cart-summary': CartSummary
    },
    data() {
        return {
            // MODEL - Products data
            products: [
                {
                    id: 1,
                    name: 'Laptop',
                    price: 999.99,
                    description: 'High-performance laptop with 16GB RAM'
                },
                {
                    id: 2,
                    name: 'Wireless Mouse',
                    price: 29.99,
                    description: 'Ergonomic wireless mouse with precision tracking'
                },
                {
                    id: 3,
                    name: 'Mechanical Keyboard',
                    price: 149.99,
                    description: 'RGB mechanical keyboard with blue switches'
                },
                {
                    id: 4,
                    name: 'USB-C Hub',
                    price: 49.99,
                    description: '7-in-1 USB-C hub with HDMI and card reader'
                }
            ],
            // MODEL - Cart data
            cartItems: []
        }
    },
    computed: {
        // VIEWMODEL - Computed property for cart total
        cartTotal() {
            return this.cartItems.reduce((sum, item) => {
                return sum + (item.product.price * item.quantity);
            }, 0);
        }
    },
    methods: {
        // VIEWMODEL - Method to handle cart updates
        addToCart(data) {
            const existingItem = this.cartItems.find(
                item => item.product.id === data.product.id
            );

            if (existingItem) {
                existingItem.quantity += data.quantity;
            } else {
                this.cartItems.push({
                    product: data.product,
                    quantity: data.quantity
                });
            }
        }
    }
}).mount('#app');
