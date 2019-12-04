import { Injectable } from "@angular/core";
import Order from "../models/order";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../configs/api-endpoints";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public addOrder(order: Order): Promise<Object> {
    return this.http
      .post(APIS.ADD_ORDER_API, {
        order
      })
      .toPromise();
  }

  public retrieveOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any[]>(APIS.RETRIEVE_ORDERS_API, {})
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
}
