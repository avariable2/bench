import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { BlogServiceService } from '../services/blog-service.service';
import { Post } from '../interfaces/post';
import { Genre } from '../interfaces/genre';


@Component({
  selector: 'app-block-creer',
  templateUrl: './block-creer.component.html',
  styleUrls: ['./block-creer.component.scss']
})
export class BlockCreerComponent implements OnInit {
  genreCollection: any;
  genres: Genre[];

  constructor(private blogService: BlogServiceService) {
    this.genres = [];
  }

  ngOnInit(): void {
    this.genreCollection = this.blogService.getGenre().subscribe(data => console.log(data));
    this.genres = this.genreCollection;
  }

}
