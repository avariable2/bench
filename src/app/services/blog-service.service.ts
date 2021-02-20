import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  constructor(private firestore: AngularFirestore) { }

  getPost() {
    return this.firestore.collection('post').snapshotChanges();
  }

  getGenre(){
    return this.firestore.collection('genre').snapshotChanges();
  }

  setPost(post: Post) {
    return this.firestore.collection('post').add(post);
  }

  mettreAjourPost(post: Post) {
    delete post.id;
    this.firestore.doc('post/' + post.id).update(post);
  }

  supprimerPost(postId: string) {
    this.firestore.doc('post/' + postId).delete();
  }

}
