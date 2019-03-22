import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PeopleRoutingModule } from './people-routing.module';

import { MaterialModule } from '../shared/material/material.module';
import { PepoleAppComponent } from './pepole-app.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { PostService } from './services/post.service';
import { PostListComponent } from './component/post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [PepoleAppComponent, SidenavComponent, ToolbarComponent, PostListComponent],
  providers:[
    PostService
  ]
})
export class PeopleModule { }
