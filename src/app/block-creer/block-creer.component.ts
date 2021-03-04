import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';


import { BlogServiceService } from '../services/blog-service.service';
import { Post } from "../interfaces/post";
import { Genre } from '../interfaces/genre';

@Component({
  selector: 'app-block-creer',
  templateUrl: './block-creer.component.html',
  styleUrls: ['./block-creer.component.scss']
})
export class BlockCreerComponent implements OnInit {

  file: File = null as any;
  fichierFinal = "";

  // Formulaire pour les genres (ou catégorie)
  genreForm = new FormGroup({
    nom: new FormControl('',Validators.required),
    couleur: new FormControl(''),
  });

  // Formulaire pour les posts
  postForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    mignature: new FormControl('',Validators.required),
    categorie: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    corps: new FormControl('',Validators.required),
  });


  // Genre
  lesGenres: Observable<any[]>;
  veuxAjouter = false;

  // Alert
  doitPasserInfo = false;
  modalType = "success";
  modalText = "Super ! la catégorie à bien été créer.";
  etatUpload: Observable<number | undefined>;
  fileUpload: any;

  constructor(private blogService: BlogServiceService) {
    this.lesGenres = this.blogService.getGenre();
    this.etatUpload = new Observable();
  }

  veuxAjouterGenre(){
    if (this.veuxAjouter){
      this.veuxAjouter = false;
    } else {
      this.veuxAjouter = true;
    }
  }

  ajouterGenre() {
    let genre: Genre = { nom: this.genreForm.value.nom, couleur: this.genreForm.value.couleur};

    if (this.blogService.ajouterGenre(genre)) {
      this.doitPasserInfo = true;
      this.modalType = "success";
      this.modalText = "Super ! la catégorie à bien été créer.";
    } else {
      this.doitPasserInfo = true;
      this.modalType = "danger";
      this.modalText = "Erreur ! contact Adrien !";
    }
    this.veuxAjouter = false;
  }

  annuler() {
    this.doitPasserInfo = false;
  }

  // Post
  ajouterPost() {
    let post: Post = { 
      titre: this.postForm.value.titre,
      image: this.fichierFinal,
      genre: this.postForm.value.categorie,
      description: this.postForm.value.description,
      corpsBlog: this.postForm.value.corps,
      date: new Date(),
    };

    if (this.blogService.creerPost(post)){
      this.doitPasserInfo = true;
      this.modalType = "success";
      this.modalText = "Super ! le post à bien été creer.";
    } else {
      this.doitPasserInfo = true;
      this.modalType = "danger";
      this.modalText = "Erreur ! contact Adrien !";
    }
  }

  // Upload de l'image
  onChange(e: Event){
    const file = (e.target as HTMLInputElement).files as any;
    this.file = file[0];
    this.fileUpload = this.blogService.envoieImage(this.file);
    this.etatUpload = this.blogService.getStatutEnvoie(this.fileUpload);
    this.blogService.getImageByName(this.file.name).subscribe(
      (url: string) => {
        this.fichierFinal = url;
      });
  }
  
  ngOnInit(): void {
    
  }
}
