import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( public afAuth: AngularFireAuth, public router: Router ){
  }
  
  // Sign in with email/password
  connexion(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['']);
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  // Fonction qui retourne l'user courent. S'il n'existe pas cela return null
  estCo() {
    return this.afAuth.user;
  }

  // Procédure pour déconnecter un user
  deconnexion(){
    this.afAuth.signOut();
  }
}
