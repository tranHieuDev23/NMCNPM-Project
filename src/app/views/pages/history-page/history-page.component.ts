import { Component, OnInit, ViewChild } from "@angular/core";
import Order, { OrderStatus, getOrderStatusFromId, getOrderStatusString, PaymentMethod, getPaymentMethodString } from "src/app/models/order";
import { YesNoPopupComponent } from "../../elements/yes-no-popup/yes-no-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { OrderService } from "src/app/controllers/order.service";
import { MatTable } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/controllers/user.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"]
})
export class HistoryPageComponent implements OnInit {
  @ViewChild("table", { static: false }) table: MatTable<any>;
  public orders: Order[] = [];
  public columnsToDisplay: string[] = [
    "products",
    "paymentMethod",
    "status",
    "edit"
  ];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  initOrders() {
    this.userService.getLoggedInUser().then(
      result => {
        this.orderService.retrieveAllOrderOfUser(result).then(
          result => {
            this.orders = result;
            this.table.renderRows();
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
        this.snackbar.open(
          "Có vấn đề trong quá trình xác thực thông tin đăng nhập!",
          null,
          { duration: 3000 }
        );
        this.router.navigateByUrl("/");
      }
    );
  }

  getOrderStatusString(order: Order): string {
    if (!order.getRestocking())
      return getOrderStatusString(order.getStatus());
    return getOrderStatusString(order.getStatus()) + " (tạm hết hàng)";
  }

  getPaymentMethodString(method: PaymentMethod): string {
    return getPaymentMethodString(method);
  }

  ngOnInit() {
    this.initOrders();
  }

  isIncompletedOrder(order: Order): boolean {
    return (
      order.getStatus() != OrderStatus.DONE &&
      order.getStatus() != OrderStatus.CANCELLED
    );
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
}
