// Angular/cli et core
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';

//Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { BlockCreerComponent } from './block-creer/block-creer.component';
import { BlockListComponent } from './block-list/block-list.component';
import { CompteurCalComponent } from './compteur-cal/compteur-cal.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ConstructionComponent } from './construction/construction.component';
import { EspaceAdminComponent } from './espace-admin/espace-admin.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { DialModifComponent } from './mat-dialog/dial-modif/dial-modif.component';
import { DialSuppComponent } from './mat-dialog/dial-supp/dial-supp.component';
import { DialogComponent } from './mat-dialog/dialog/dialog.component';
import { MediaCreerComponent } from './media-creer/media-creer.component';
import { MediaComponent } from './media/media.component';
import { NavComponent } from './nav/nav.component';
import { OutilsComponent } from './outils/outils.component';
import { TroncText } from './services/pipe/tronc-text';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    ConnexionComponent,
    BlockListComponent,
    BlockCreerComponent,
    NavComponent,
    DialogComponent,
    OutilsComponent,
    CompteurCalComponent,
    MediaComponent,
    AdminComponent,
    MediaCreerComponent,
    ConstructionComponent,
    TroncText,
    ArticleComponent,
    EspaceAdminComponent,
    DialSuppComponent,
    DialModifComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    EditorModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
