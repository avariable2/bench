import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/interfaces/post';
import { BlogServiceService } from 'src/app/services/blog-service.service';

@Component({
  selector: 'app-dial-modif',
  templateUrl: './dial-modif.component.html',
  styleUrls: ['./dial-modif.component.scss'],
})
export class DialModifComponent implements OnInit {
  formData = new FormGroup({
    titre: new FormControl(this.data.titre),
    image: new FormControl(this.data.image),
    categorie: new FormControl(this.data.genre),
    description: new FormControl(this.data.description),
    corps: new FormControl(this.data.corpsBlog),
  });

  constructor(
    public dialogRef: MatDialogRef<DialModifComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private db: BlogServiceService
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close();
    let postUpdate: Post = {
      key: this.data.key,
      titre: this.formData.value.titre,
      description: this.formData.value.description,
      corpsBlog: this.formData.value.corps,
      image: this.formData.value.image,
      date: this.data.date,
      genre: this.data.genre,
    };
    this.db.mettreAjourPost(postUpdate.key!, postUpdate);
  }
}
