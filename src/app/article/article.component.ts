import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { BlogServiceService } from '../services/blog-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  // La clef de l'article dans firebase
  key: string | null ;

  refArticleDansBDD: Observable<string[]>;
  article: Post = {
    titre: '',
    image: '',
    genre: '',
    description: '',
    corpsBlog: '',
    date: ''
  };

  constructor(private route: ActivatedRoute, private db: BlogServiceService) {
    this.key = this.route.snapshot.paramMap.get('key');

    this.refArticleDansBDD = this.db.getPostParKey(this.key);
    
    this.refArticleDansBDD.subscribe( value => {
      //console.warn(value);
      this.article.corpsBlog = value[0];
      this.article.date = value[1];
      this.article.description = value[2];
      this.article.genre = value[3];
      this.article.image = value[4];
      this.article.titre = value[5];
    });
  }

  ngOnInit(): void {
    
  }

}
