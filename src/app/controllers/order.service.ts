import { Injectable, EventEmitter } from "@angular/core";
import Order from "../models/order";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../configs/api-endpoints";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  public onOrdersUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient, private userService: UserService) {}

  public addOrder(order: Order): Promise<Object> {
    return this.http
      .post(APIS.ADD_ORDER_API, {
        order
      })
      .toPromise();
  }

  public retrieveAllOrder(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const accessToken = this.userService.getAccessToken();
      this.http
        .post<any[]>(APIS.RETRIEVE_ORDERS_API, { accessToken })
        .toPromise()
        .then(
          result => {
            const orders: Order[] = [];
            result.forEach(element => {
              orders.push(Order.fromJSON(element));
            });
            resolve(orders);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  public removeOrder(order: Order): Promise<void> {
    return new Promise((resolve, reject) => {
      const accessToken = this.userService.getAccessToken();
      this.http
        .post(APIS.REMOVE_ORDER_API, { accessToken, orderId: order.getOrderId() })
        .subscribe(() => {
          this.onOrdersUpdated.emit();
          resolve();
        }, reject);
    });
  }
}
