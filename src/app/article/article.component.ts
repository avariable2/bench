import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { BlogServiceService } from '../services/blog-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  // La clef de l'article dans firebase
  key: string | null;

  refArticleDansBDD: Observable<string[]>;
  article: Post = {
    titre: '',
    image: '',
    genre: '',
    description: '',
    corpsBlog: '',
    date: '',
  };
  // Pour assurer a angular que le code html est sure et prevenir des attaques XSS
  corpsArticle: any;

  constructor(
    private route: ActivatedRoute,
    private db: BlogServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.key = this.route.snapshot.paramMap.get('key');

    this.refArticleDansBDD = this.db.getPostParKey(this.key);

    this.refArticleDansBDD.subscribe((value) => {
      // Trust safe value : https://angular.io/guide/security#xss
      this.corpsArticle = this.sanitizer.bypassSecurityTrustHtml(value[0]);
      this.article.date = value[1];
      this.article.description = value[2];
      this.article.genre = value[3];
      this.article.image = value[4];
      this.article.titre = value[5];
    });
  }

  ngOnInit(): void {}
}
