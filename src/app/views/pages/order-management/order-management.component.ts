import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderService } from "src/app/controllers/order.service";
import Order, { OrderStatus } from "src/app/models/order";
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { YesNoPopupComponent } from "../../elements/yes-no-popup/yes-no-popup.component";

@Component({
  selector: "app-order-management",
  templateUrl: "./order-management.component.html",
  styleUrls: ["./order-management.component.scss"]
})
export class OrderManagementComponent implements OnInit {
  @ViewChild("table", { static: false }) table: MatTable<any>;
  public orders: Order[] = [];
  public columnsToDisplay: string[] = [
    "customerName",
    "customerPhone",
    "customerEmail",
    "customerAddress",
    "customerRegion",
    "products",
    "status",
    "edit"
  ];

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initOrders();
    this.orderService.onOrdersUpdated.subscribe(
      () => {
        this.initOrders();
      },
      error => {
        console.log(error);
      }
    );
  }

  initOrders() {
    this.orderService.retrieveAllOrder().then(
      result => {
        this.orders = result;
        this.table.renderRows();
      },
      error => {
        console.log(error);
      }
    );
  }

  getOrderStatusString(status: OrderStatus): string {
    switch(status) {
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

  onRemoveOrder(order: Order) {
    this.dialog
      .open(YesNoPopupComponent)
      .afterClosed()
      .subscribe(result => {
        if (!result) return;
        this.orderService.removeOrder(order).then(
          () => {},
          error => {
            console.log(error);
          }
        );
      });
  }
}
