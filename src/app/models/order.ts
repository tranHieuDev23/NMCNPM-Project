import ProductCartItem from "./cart-item";
import User from "./user";

enum OrderStatus {
  CONFIRMING,
  PREPARING,
  SHIPPING,
  DONE,
  CANCELLED
}

function getOrderStatusString(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.CONFIRMING:
      return "Đang xác nhận";
    case OrderStatus.PREPARING:
      return "Đang chuẩn bị";
    case OrderStatus.SHIPPING:
      return "Đang giao hàng";
    case OrderStatus.DONE:
      return "Hoàn tất";
    case OrderStatus.CANCELLED:
      return "Đã bị hủy";
    default:
      return "Invalid status!";
  }
}

enum PaymentMethod {
  CASH_ON_DELIVERY,
  BANK_TRANSFER
}

function getPaymentMethodString(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.CASH_ON_DELIVERY:
      return "Thanh toán khi nhận hàng";
    case PaymentMethod.BANK_TRANSFER:
      return "Thanh toán chuyển khoản";
    default:
      return "Invalid method!";
  }
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
    private orderedUser: User,
    private products: ProductCartItem[],
    private paymentMethod: PaymentMethod,
    private status: OrderStatus
  ) {}

  public getOrderId(): number {
    return this.orderId;
  }

  public getOrderedUser(): User {
    return this.orderedUser;
  }

  public getProducts(): ProductCartItem[] {
    return this.products;
  }

  public getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  static fromJSON(data: any): Order {
    if (data == null || data == undefined) return null;
    const result = new Order(
      data.orderId,
      User.fromJSON(data.orderedUser),
      [],
      data.paymentMethod,
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

export {
  OrderStatus,
  getOrderStatusFromId,
  getOrderStatusString,
  PaymentMethod,
  getPaymentMethodString
};
