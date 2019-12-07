import Customer from "./customer";
import ProductCartItem from "./cart-item";

class Order {
  constructor(
    private orderId: number,
    private customer: Customer,
    private products: ProductCartItem[]
  ) {}

  public getOrderId(): number {
    return this.orderId;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getProducts(): ProductCartItem[] {
    return this.products;
  }

  static fromJSON(data: any): Order {
    if (data == null || data == undefined) return null;
    const result = new Order(
      data.orderId,
      Customer.fromJSON(data.customer),
      []
    );
    if (data.products) {
      data.products.forEach(element => {
        result.products.push(ProductCartItem.fromJSON(element));
      });
    }
    return result;
  }
}

export default Order;
