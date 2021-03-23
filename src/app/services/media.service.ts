import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

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
