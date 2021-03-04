import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';

import { Genre } from '../interfaces/genre';
import { Post } from "../interfaces/post";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
  lesPosts: Observable<Post[]>;

  constructor(private db: BlogServiceService) {
    this.lesPosts = this.db.getPost();
  }

  ngOnInit(): void {
  }

}
