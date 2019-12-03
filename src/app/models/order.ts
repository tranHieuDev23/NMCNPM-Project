import Customer from "./customer";
import ProductCartItem from './cart-item';

class Order {
    constructor(
        private customer: Customer,
        private products: ProductCartItem[]
    ) {}

    public getCustomer(): Customer {
        return this.customer;
    }

    public getProducts(): ProductCartItem[] {
        return this.products;
    }
}

export default Order;