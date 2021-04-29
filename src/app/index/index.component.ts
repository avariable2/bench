import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(public blogService: BlogServiceService) {}

  ngOnInit(): void {}
}
