import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { BlockListComponent } from './block-list/block-list.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { OutilsComponent } from './outils/outils.component';
import { MediaComponent } from './media/media.component';
import { AdminComponent } from './admin/admin.component';
import { ArticleComponent } from './article/article.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bench', component: IndexComponent },
  { path: 'log', component: ConnexionComponent },
  { path: 'blog-list', component: BlockListComponent },
  { path: 'outils', component: OutilsComponent},
  { path: 'media', component: MediaComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AngularFireAuthGuard]},
  { path: 'article/:key', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
