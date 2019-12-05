import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-yes-no-popup",
  templateUrl: "./yes-no-popup.component.html",
  styleUrls: ["./yes-no-popup.component.scss"]
})
export class YesNoPopupComponent {
  constructor(private dialogRef: MatDialogRef<YesNoPopupComponent>) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
