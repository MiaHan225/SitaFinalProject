import { Component, Inject, Optional } from '@angular/core';
import { User } from '../user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  action: string | undefined;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User
    ) {
      console.log(data);
      this.local_data = { ...data };

      this.action = this.local_data.action;
    }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}