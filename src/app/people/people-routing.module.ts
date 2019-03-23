import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PepoleAppComponent } from './pepole-app.component';
import { PostListComponent } from './component/post-list/post-list.component';
import { RequireAuthenticatedUserRouteGuard } from '../shared/oidc/require-authenticated-user-route.guard';
import { WritePostComponent } from './component/write-post/write-post.component';

const routes: Routes = [
  {path:'',component:PepoleAppComponent,
  children: [
    { path: 'post-list', component: PostListComponent},
    {
      path: 'write-post', component: WritePostComponent,
      canActivate: [RequireAuthenticatedUserRouteGuard]
    },
    { path: '**', redirectTo: 'post-list'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
