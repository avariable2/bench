import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

import { BlogServiceService } from '../services/blog-service.service';
import { Post } from '../interfaces/post';
import { Genre } from '../interfaces/genre';
import { finalize } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../mat-dialog/dialog/dialog.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-block-creer',
  templateUrl: './block-creer.component.html',
  styleUrls: ['./block-creer.component.scss'],
})
export class BlockCreerComponent implements OnInit {
  // Formulaire pour les genres (ou catégorie)
  genreForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    couleur: new FormControl(''),
  });
  // Genre
  lesGenres: Observable<any[]>;
  veuxAjouter = false;

  // Formulaire pour les posts
  postForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    mignature: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    corps: new FormControl('', Validators.required),
  });
  // Alert
  doitPasserInfo = false;
  modalType = 'success';
  modalText = 'Super ! la catégorie à bien été créer.';
  //File
  file: File = null as any;
  etatUpload!: Observable<number | undefined>;
  downloadURL!: any;

  constructor(
    private blogService: BlogServiceService,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) {
    this.lesGenres = this.blogService.getGenre();
  }

  veuxAjouterGenre() {
    if (this.veuxAjouter) {
      this.veuxAjouter = false;
    } else {
      this.veuxAjouter = true;
    }
  }

  ajouterGenre() {
    let genre: Genre = {
      nom: this.genreForm.value.nom,
      couleur: this.genreForm.value.couleur,
    };

    if (this.blogService.ajouterGenre(genre)) {
      this.doitPasserInfo = true;
      this.modalType = 'success';
      this.modalText = 'Super ! la catégorie à bien été créer.';
    } else {
      this.doitPasserInfo = true;
      this.modalType = 'danger';
      this.modalText = 'Erreur ! contact Adrien !';
    }
    this.veuxAjouter = false;
  }

  annuler() {
    this.doitPasserInfo = false;
  }

  // Post
  ajouterPost() {
    let myDate = new Date().toString();
    let post: Post = {
      titre: this.postForm.value.titre,
      image: this.downloadURL,
      genre: this.postForm.value.categorie,
      description: this.postForm.value.description,
      corpsBlog: this.postForm.value.corps,
      date: firebase.default.database.ServerValue.TIMESTAMP,
    };

    if (this.blogService.creerPost(post)) {
      this.doitPasserInfo = true;
      this.modalType = 'success';
      this.modalText = 'Super ! le post à bien été creer.';
      this.openDialog('Super ! ', 'Le post à bien été créer.');
    } else {
      this.doitPasserInfo = true;
      this.modalType = 'danger';
      this.modalText = 'Erreur ! contact Adrien !';
      this.openDialog('Erreur ! ', 'contact Adrien');
    }
  }

  // Upload de l'image
  onChange(e: Event) {
    const file = (e.target as HTMLInputElement).files as any;
    this.file = file[0];
    const filePath = 'Images/Posts/' + this.file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);

    // observe percentage changes
    this.etatUpload = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((download) => {
            this.downloadURL = download;
          })
        )
      )
      .subscribe();
  }

  openDialog(t: string, c: string) {
    this.dialog.open(DialogComponent, {
      data: {
        titre: t,
        content: c,
      },
    });
  }

  ngOnInit(): void {}
}
