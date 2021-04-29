import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  key!: number;

  //refArticleDansBDD: Observable<string[]>;
  postVide: Post = {
    titre: '',
    image: '',
    genre: '',
    description: '',
    corpsBlog: '',
    date: '',
  };
  // Pour assurer a angular que le code html est sure et prevenir des attaques XSS
  corpsArticle: any;
  article!: Post;

  constructor(
    private route: ActivatedRoute,
    public blogService: BlogServiceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.key = Number(this.route.snapshot.paramMap.get('key')); // correspond à l'index de l'article dans le tableau
    if (this.key == null || Number(this.key) == NaN) {
      this.router.navigate(['accueil']);
    }
  }

  ngOnInit(): void {}
}
