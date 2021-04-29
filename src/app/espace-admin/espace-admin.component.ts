import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { DialSuppComponent } from '../mat-dialog/dial-supp/dial-supp.component';
import { DialModifComponent } from '../mat-dialog/dial-modif/dial-modif.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-espace-admin',
  templateUrl: './espace-admin.component.html',
  styleUrls: ['./espace-admin.component.scss'],
})
export class EspaceAdminComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public lesPosts = new MatTableDataSource<Post>();
  displayedColumns: string[] = ['select', 'titre', 'desc', 'img'];
  selection: SelectionModel<Post>;

  constructor(
    public blogService: BlogServiceService,
    private dialogue: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    // Lorsque les valuers sont bien set
    this.lesPosts.data = this.blogService.lesPosts.slice().reverse();

    // pour les avoir trier par ordre decroissant d'ajout
    const initialSelection: Post[] | undefined = [];
    this.selection = new SelectionModel<Post>(true, initialSelection);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // add ngAfterViewInit hook
    this.lesPosts.paginator = this.paginator;
    this.lesPosts.sort = this.sort;
  }

  //Permet de faire un recherche dans le tableau
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lesPosts.filter = filterValue.trim().toLowerCase();

    if (this.lesPosts.paginator) {
      this.lesPosts.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.lesPosts.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection.*/
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.lesPosts.data.forEach((row: Post) => this.selection.select(row));
  }

  supprimer() {
    // Recupere le dialog pour traiter ce qu'il renvoie
    if (this.selection.selected.length > 0) {
      const estSur = this.dialogue.open(DialSuppComponent);
      estSur.afterClosed().subscribe((result: any) => {
        if (result) {
          this.selection.selected.forEach((tab) => {
            if (tab.key !== undefined) {
              this.blogService.supprimerPost(tab.key);
            }
          });
        }
      });
    }
  }

  modifier() {
    if (this.selection.selected.length < 2) {
      this.selection.selected.forEach((ligne) => {
        this.dialogue.open(DialModifComponent, {
          width: '800px',
          data: ligne,
        });
      });
    } else {
      this._snackBar.open('Aie ! essaye avec un seul element', 'ça roule', {
        duration: 5000,
      });
    }
  }

  refresh() {
    this.lesPosts.data = this.blogService.lesPosts.slice().reverse();
  }

  ngOnDestroy() {}
}
