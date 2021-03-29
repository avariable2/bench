import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  titre: any;
  content: any;
  
  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,) {
    if (data) {
      this.titre = data.titre || this.titre;
      this.content = data.content || this.content;
    }
  }

  ngOnInit(): void {
  }

}
