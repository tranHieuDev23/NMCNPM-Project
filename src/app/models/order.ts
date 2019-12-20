import Customer from "./customer";
import ProductCartItem from "./cart-item";

enum OrderStatus {
  CONFIRMING,
  PREPARING,
  SHIPPING,
  DONE,
  CANCELLED
}

function getOrderStatusFromId(id: number): OrderStatus {
  switch (id) {
    case OrderStatus.CONFIRMING:
      return OrderStatus.CONFIRMING;
    case OrderStatus.PREPARING:
      return OrderStatus.PREPARING;
    case OrderStatus.SHIPPING:
      return OrderStatus.SHIPPING;
    case OrderStatus.DONE:
      return OrderStatus.DONE;
    case OrderStatus.CANCELLED:
      return OrderStatus.CANCELLED;
    default:
      return null;
  }
}

class Order {
  constructor(
    private orderId: number,
    private customer: Customer,
    private products: ProductCartItem[],
    private status: OrderStatus
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

  public getStatus(): OrderStatus {
    return this.status;
  }

  static fromJSON(data: any): Order {
    if (data == null || data == undefined) return null;
    const result = new Order(
      data.orderId,
      Customer.fromJSON(data.customer),
      [],
      data.status != null && data.status != undefined
        ? getOrderStatusFromId(data.status)
        : null
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

export { OrderStatus, getOrderStatusFromId };
