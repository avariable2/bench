import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-media-creer',
  templateUrl: './media-creer.component.html',
  styleUrls: ['./media-creer.component.scss']
})
export class MediaCreerComponent implements OnInit {
  image: any;
  url: string | ArrayBuffer | null | undefined;
  doitEnvoyer = false;

  formMedia = new FormGroup({
    nom: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  pourcentageEnvoie: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private storage: AngularFireStorage, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onChange(e: Event) {
    const file = (e.target as HTMLInputElement).files as any;
    this.image = file[0];
    var reader = new FileReader();

      reader.readAsDataURL(this.image); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = (event.target as FileReader).result;
      }
  }

  ajouterPhoto() {
    this.doitEnvoyer = true;
    let nom = this.formMedia.value.nom;
    const filePath = 'Images/Medias/'+ nom;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.image);

    // observe percentage changes
    this.pourcentageEnvoie = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => 
        fileRef.getDownloadURL().subscribe( (download) => { this.openSnackBar()}) 
      )
   )
  .subscribe();
  }

  openSnackBar() {
    this._snackBar.open('Super l\'image à été ajouter !!', 'X', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
