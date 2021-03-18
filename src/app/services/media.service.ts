import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
<<<<<<< HEAD
=======

>>>>>>> cb21f1f63c6cb8e564f5508d621106e8c9c76f85

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  ref: AngularFireStorageReference;

  constructor(private storage: AngularFireStorage) {
    this.ref = this.storage.ref('Images/Medias');
  }

  getAllMedia () {
    return this.ref.listAll();
  }


}
