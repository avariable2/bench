import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-media-creer',
  templateUrl: './media-creer.component.html',
  styleUrls: ['./media-creer.component.scss']
})
export class MediaCreerComponent implements OnInit {
  image: any;
  url: string | ArrayBuffer | null | undefined;

  constructor(private storage: AngularFireStorage) { }

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
}
