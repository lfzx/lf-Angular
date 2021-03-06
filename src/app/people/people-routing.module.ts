import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PepoleAppComponent } from './pepole-app.component';
import { PostListComponent } from './component/post-list/post-list.component';
import { RequireAuthenticatedUserRouteGuard } from '../shared/oidc/require-authenticated-user-route.guard';
import { WritePostComponent } from './component/write-post/write-post.component';
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';
import { PostTableComponent } from './component/post-table/post-table.component';
import { TestComponent } from './component/test/test.component';

const routes: Routes = [
  {path:'',component:PepoleAppComponent,
  children: [
    { path: 'post-list', component: PostListComponent},
    { path: 'post-table', component: PostTableComponent },
    {
      path: 'write-post', component: WritePostComponent,
      canActivate: [RequireAuthenticatedUserRouteGuard]
    },
    {
      path: 'edit-post/:id', component: EditPostComponent,
      canActivate: [RequireAuthenticatedUserRouteGuard]
    },
    { path: 'post-detail/:id', component: PostDetailComponent },
    { path: 'test', component: TestComponent },
    { path: '**', redirectTo: 'post-list'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
