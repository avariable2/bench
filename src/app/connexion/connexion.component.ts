import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  coForm = new FormGroup({
      email: new FormControl(''),
      mdp: new FormControl(''),
  });
  estCo: boolean;

  constructor(private auth: AuthService) {
    this.estCo = false;
  }

  ngOnInit(): void { }

  connexion() {
    let user = this.coForm.value;
    this.auth.connexion(user.email,user.mdp);
    if(this.auth.estCo()){
      this.estCo = true;
    }
  }

}
