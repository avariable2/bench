import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  ref: AngularFireStorageReference;

  constructor(private storage: AngularFireStorage) {
    this.ref = this.storage.ref('Images/Medias');
  }

  getAllMedia () {
    this.ref.listAll();
  }


}
