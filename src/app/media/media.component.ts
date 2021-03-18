import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ListResult } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
import { MediaService } from '../services/media.service';
import { interval } from 'rxjs';
=======
import { MediaService } from '../services/media.service';
>>>>>>> cb21f1f63c6cb8e564f5508d621106e8c9c76f85

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
<<<<<<< HEAD
  list: Array<any> = [];

  numbers = interval(1000);

  constructor(private mds: MediaService) {
    this.mds.getAllMedia().subscribe(
      (res) => {
        res.items.forEach(
          (itemRef) => {
            itemRef.getDownloadURL().then(
              (downloadURL) => {
                this.list.push(downloadURL);
              }
            )
          }
        )
      }
    );
=======
  listMedia: any;
  list: Array<any> = [];

  constructor(private mds: MediaService) {
    this.mds.getAllMedia().subscribe(
      (res) => this.listMedia = res.items.forEach((itemRef) => {
        this.list.push(itemRef);
    }));
    
>>>>>>> cb21f1f63c6cb8e564f5508d621106e8c9c76f85
  }

  ngOnInit(): void {
    console.warn(this.list);
  }

}
