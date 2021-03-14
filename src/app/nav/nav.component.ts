import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../services/auth-service';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  estCo: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private fire: AngularFireAuth) {
    this.estCo = false;
  }

  ngOnInit() {
    this.fire.onAuthStateChanged((user) => {
      if(user) {
        this.estCo = true;
      } else {
        this.estCo = false;
      }
    });
  }

  deco() {
    this.auth.deconnexion();
  }

}
