import { Injectable } from "@angular/core";
import Order from "../models/order";
import { HttpClient } from "@angular/common/http";

const ADD_ORDER_API = "/api/add-order";
const RETRIEVE_ORDERS_API = "/api/retrieve-orders";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public addOrder(order: Order): Promise<any> {
    return this.http
      .post(ADD_ORDER_API, {
        order: order
      })
      .toPromise();
  }

  public retrieveOrders(): Promise<Order[]> {
    return this.http.post<Order[]>(RETRIEVE_ORDERS_API, {}).toPromise();
  }
}
