import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export class FormControlItem {
  public value: any = null;
  constructor(
    public controlType: string,
    public placeholder: string,
    public type: string,
    public name: string,
    public options: string[] = []
  ) {}
}

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"]
})
export class FormDialogComponent {
  public title: string;
  public items: FormControlItem[];
  public completedText: string;
  public cancelText: string;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this.title = dialogData.title;
    this.items = dialogData.items;
    this.completedText = dialogData.completedText;
    this.cancelText = dialogData.cancelText;
  }

  onCompleted() {
    const result = {};
    this.items.forEach(item => {
      result[item.name] = item.value;
    });
    this.dialogRef.close(result);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
