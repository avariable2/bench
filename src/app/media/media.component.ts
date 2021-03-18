import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  listMedia: any;
  list: Array<any> = [];

  constructor(private mds: MediaService) {
    this.mds.getAllMedia().subscribe(
      (res) => this.listMedia = res.items.forEach((itemRef) => {
        this.list.push(itemRef);
    }));
    
  }

  ngOnInit(): void {
    console.warn(this.list);
  }

}
