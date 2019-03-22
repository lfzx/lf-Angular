import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PepoleAppComponent } from './pepole-app.component';
import { PostListComponent } from './component/post-list/post-list.component';

const routes: Routes = [
  {path:'',component:PepoleAppComponent,
  children: [
    { path: 'post-list', component: PostListComponent },
    { path: '**', redirectTo: 'post-list'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
