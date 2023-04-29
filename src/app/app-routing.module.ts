import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { PostsCommentsComponent } from './posts-comments/posts-comments.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'posts-table', component: PostsTableComponent },
  { path: 'posts-comments/:id', component: PostsCommentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
