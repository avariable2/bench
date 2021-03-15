import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { BlockListComponent } from './block-list/block-list.component';
import { BlockCreerComponent } from './block-creer/block-creer.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { OutilsComponent } from './outils/outils.component';
import { MediaComponent } from './media/media.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bench', component: IndexComponent },
  { path: 'log', component: ConnexionComponent },
  { path: 'blog-list', component: BlockListComponent },
  { path: 'blog-creer', component: BlockCreerComponent, canActivate:[AngularFireAuthGuard]},
  { path: 'outils', component: OutilsComponent},
  { path: 'media', component: MediaComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
