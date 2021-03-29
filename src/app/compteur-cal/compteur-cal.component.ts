import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../mat-dialog/dialog/dialog.component';

@Component({
  selector: 'app-compteur-cal',
  templateUrl: './compteur-cal.component.html',
  styleUrls: ['./compteur-cal.component.scss'],
})
export class CompteurCalComponent implements OnInit {
  //Les objectifs journaliers sont définis grâce à la formule d'Harris et Benedict, qui selon moi est la plus précise, la voici :
  //Homme = 13,707 x Poids(kg) + 492,3 x Taille(m) - 6,673 x Age(an) + 77, 607
  //Femme = 9,740 x Poids(kg) + 172,9 x Taille(m) - 4,737 x Age(an) + 667, 051
  //Homme et femme sedentaires = Métabolisme de base (dépense énergétique au repos = DER) x 1,375
  //Homme et femme actifs = Métabolisme de base (dépense énergétique au repos = DER) x 1,55
  //Homme et femme sportifs = Métabolisme de base x 1,80 (voire x 2)
  // https://fr.wikipedia.org/wiki/M%C3%A9tabolisme_de_base

  calculForm = new FormGroup({
    sexe: new FormControl('', Validators.required),
    taille: new FormControl('', Validators.required),
    poid: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    activite: new FormControl('', Validators.required),
  });
  resultat: number = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  calc() {
    const sexe = this.calculForm.value.sexe;
    const taille = this.calculForm.value.taille;
    const poid = this.calculForm.value.poid;
    const age = this.calculForm.value.age;
    const act = this.calculForm.value.activite;
    let nb = -0.13;
    let resultat = 0;

    if (sexe == 'H') {
      resultat =
        259 *
        (Math.pow(poid, 0.48) * Math.pow(taille, 0.5) * Math.pow(age, nb));
    } else {
      resultat =
        230 *
        (Math.pow(poid, 0.48) * Math.pow(taille, 0.5) * Math.pow(age, nb));
    }
    if (act == 'actif') {
      resultat = resultat * 1.55;
    } else {
      resultat = resultat * 1.375;
    }

    this.resultat = Math.floor(resultat);

    let corpsTexte =
      'Il vous faut ' +
      this.resultat +
      ' kcal par jour. Bien sur à moduler en fonction de vos objectifs.';
    this.openDialog('Résultat', corpsTexte);
  }

  openDialog(t: string, c: string) {
    this.dialog.open(DialogComponent, {
      data: {
        titre: t,
        content: c,
      },
    });
  }
}
