import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { BlockListComponent } from './block-list/block-list.component';
import { BlockCreerComponent } from './block-creer/block-creer.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bench', component: IndexComponent },
  { path: 'log', component: ConnexionComponent },
  { path: 'blog-list', component: BlockListComponent },
  { path: 'blog-creer', component: BlockCreerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
