import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderService } from "src/app/controllers/order.service";
import Order, { OrderStatus, getOrderStatusFromId, getOrderStatusString, PaymentMethod, getPaymentMethodString } from "src/app/models/order";
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { YesNoPopupComponent } from "../../elements/yes-no-popup/yes-no-popup.component";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    "products",
    "paymentMethod",
    "status",
    "edit"
  ];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

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

  getOrderStatusString(order: Order): string {
    if (!order.getRestocking())
      return getOrderStatusString(order.getStatus());
    return getOrderStatusString(order.getStatus()) + " (tạm thời không đủ hàng)";
  }

  getPaymentMethodString(method: PaymentMethod): string {
    return getPaymentMethodString(method);
  }

  isIncompletedOrder(order: Order): boolean {
    return (
      order.getStatus() != OrderStatus.DONE &&
      order.getStatus() != OrderStatus.CANCELLED
    );
  }

  getNextOrderStatusString(status: OrderStatus): string {
    const nextId: number = status + 1;
    const nextStatus: OrderStatus = getOrderStatusFromId(nextId);
    return `Sang trạng thái ${getOrderStatusString(nextStatus)}`
  }

  onSetOrderStatus(order: Order, newStatus: OrderStatus) {
    this.dialog
      .open(YesNoPopupComponent)
      .afterClosed()
      .subscribe(
        result => {
          if (!result) return;
          this.orderService.updateOrderStatus(order, newStatus).then(
            result => {
              this.initOrders();
            },
            error => {
              console.log(error);
              this.snackbar.open(
                "Có lỗi xảy ra trong quá trình thay đổi trạng thái đơn hàng!",
                null,
                { duration: 3000 }
              );
            }
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  onNextStatus(order: Order) {
    if (!this.isIncompletedOrder(order)) {
      return;
    }
    const newId: number = +order.getStatus() + 1;
    const newStatus: OrderStatus = getOrderStatusFromId(newId);
    this.onSetOrderStatus(order, newStatus);
  }

  onCancelOrder(order: Order) {
    if (!this.isIncompletedOrder(order)) {
      return;
    }
    this.onSetOrderStatus(order, OrderStatus.CANCELLED);
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
