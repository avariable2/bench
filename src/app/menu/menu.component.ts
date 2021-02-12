import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: any;
  estCo: boolean;
  info: any; // 0 si on affiche rien, 1 si on affiche succes, -1 sinon

  constructor(private auth: AuthService) {
    this.estCo = false;
    this.user = this.auth.afAuth.onAuthStateChanged((user) => {
      if(user){
        this.estCo = true;
      }else {
        this.estCo = false;
      }
    });
    this.info = 0;
  }

  ngOnInit(): void {
  }

  deco(){
    this.auth.deconnexion();
  }

  // Regarde si l'utilisateur est connecter
  checkCo(){
    if(!this.estCo){

    }
  }

}
