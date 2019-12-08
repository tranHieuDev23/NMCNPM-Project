import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

export class FormControlItem {
  public controlType: string = "input";
  public placeholder: string;
  public type: string = "text";
  public options: any[] = [];
  public optionTexts: string[] = [];
  public name: string;
  public value: any = null;
  public compareWith: (o1: any, o2: any) => boolean = () => {
    return false;
  };
  public editor = null;

  constructor(data: any) {
    if (data.controlType) this.controlType = data.controlType;
    if (data.placeholder) this.placeholder = data.placeholder;
    if (data.type) this.type = data.type;
    if (data.options) this.options = data.options;
    if (data.optionTexts) this.optionTexts = data.optionTexts;
    else if (data.options) this.optionTexts = data.options;
    if (data.name) this.name = data.name;
    if (data.value) this.value = data.value;
    if (data.compareWith) this.compareWith = data.compareWith;  
    if (this.controlType == 'rich') {
      this.editor = ClassicEditor;
      if (!this.value)
        this.value = "";
    }
  }
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

  onRichEditorChanged(item: FormControlItem, event: ChangeEvent): void {
    item.value = event.editor.getData();
  }
}
