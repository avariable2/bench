import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';

import { Genre } from '../interfaces/genre';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class BlogServiceService {
  list: AngularFireList<Post>;

  // variables pour recuperer les posts
  lesPosts: Array<Post> = [];

  // variable pour savoir si les données sont pretes
  estPret = new Subject<boolean>();

  constructor(
    private afdService: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.list = afdService.list('post');
    this.getPostAux();
  }

  /**
   * Fonction principal qui permet de recuperer les post triée par date recente de post.
   */
  getPostAux() {
    this.afdService
      .list('post', (ref) => ref.orderByChild('date'))
      .query.once('value')
      .then((value) => {
        // On effectue le traitement en amont
        value.forEach((unPost) => {
          let clef = unPost.key;
          if (clef) {
            let post = unPost.val();
            post.key = unPost.key;
            this.lesPosts.push(post);
          }
        });
        // ET on confirme que les données on été set
        this.estPret.next(true);
        console.log(this.lesPosts);
      });
    //, (ref) => ref.child('prive').equalTo(false)
  }

  getPostParClef(clef: string | null) {
    for (let index = 0; index < this.lesPosts.length; index++) {
      const element = this.lesPosts[index];
      if (element.key == clef) {
        return element;
      }
    }
    return false;
  }

  getPostParIndex(index: number): Post {
    return this.lesPosts[index];
  }

  getPost() {
    return this.list.valueChanges();
  }

  getPostParKey(key: string | null) {
    // On recupere un AngularFireList de type Post pour renvoyer
    // un Observable<Post> avec valueChanges()
    let list: AngularFireList<string> = this.afdService.list('post/' + key);
    return list.valueChanges();
  }

  get3premiersPost() {
    let ref = this.afdService.list('post', (ref) =>
      ref.orderByChild('date').limitToFirst(3)
    );
    ref.query.once('value').then((value) => {});
  }

  getGenre() {
    return this.afdService
      .list('genre')
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: { payload: { key: any; val: () => {} } }) => ({
            key: c.payload.key,
            ...(c.payload.val() as {}),
          }))
        )
      );
  }

  getGenreById(idGenre: string) {
    return this.afdService.list('genre/' + idGenre);
  }

  ajouterGenre(genre: Genre) {
    return this.afdService.list('genre').push(genre);
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
    const task = this.storage.upload(cheminFichiers, file);
    // observe percentage changes
    return task;
  }

  getImageByRef(ref: string) {
    return this.storage.ref(ref).getDownloadURL();
  }
}
