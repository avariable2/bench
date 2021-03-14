import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, async } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Genre } from '../interfaces/genre';
import { Post } from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  baseApiUrl = "gs://site-ben-d41dc.appspot.com/";

  list: AngularFireList<Post>;
  listSnapshot: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.list = db.list('post');
    this.listSnapshot = this.list.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }))
      )
    );
  }

  getPost() {
    return this.list.valueChanges();
  }

  getGenre(){
    return this.db.list('genre').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }))
      )
    );
  }

  getGenreById(idGenre: string){
    return this.db.list('genre/'+idGenre);
  }

  ajouterGenre(genre: Genre){
    return this.db.list('genre').push(genre);
  }

  creerPost(post: Post) {
    return this.list.push(post);
  }

  mettreAjourPost(postId: string, post: Post): Promise<void> {
    return this.list.update(postId, post);
  }

  supprimerPost(postId: string): Promise<void> {
    return this.list.remove(postId);
  }

  envoieImage(file: File) {
    const cheminFichiers = 'Images/Posts/' + file.name;
    const fileRef = this.storage.ref(cheminFichiers);
    const task = this.storage.upload(cheminFichiers,file);
    // observe percentage changes
    return task;
  }

  getImageByRef(ref: string) {
    return this.storage.ref(ref).getDownloadURL();
  }
}
