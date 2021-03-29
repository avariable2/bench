import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dial-supp',
  templateUrl: './dial-supp.component.html',
  styleUrls: ['./dial-supp.component.scss'],
})
export class DialSuppComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialSuppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {}
}
