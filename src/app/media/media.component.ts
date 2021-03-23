import { Component, OnInit } from '@angular/core';

import { ListResult } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
import { MediaService } from '../services/media.service';
import { interval } from 'rxjs';



@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {


  listMedia:  Array<{nom: string, url: any}> = [];

  numbers = interval(1000);

  constructor(private mds: MediaService) {
    this.mds.getAllMedia().subscribe(
      (res) => {
        res.items.forEach(
          (itemRef) => {
            itemRef.getDownloadURL().then(
              (downloadURL) => {
                let nom = itemRef.name;
                let url = downloadURL;
                this.listMedia.push({nom,url});
              }
            )
          }
        )
      }
    );
  }

  ngOnInit(): void {
    
  }

}
