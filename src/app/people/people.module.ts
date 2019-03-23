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
import { AuthorizationHeaderInterceptor } from '../shared/oidc/authorization-header-interceptor.interceptor';
import { PostCardComponent } from './component/post-card/post-card.component';
import { WritePostComponent } from './component/write-post/write-post.component';
import { TinymceService } from './services/tinymce.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  declarations: [PepoleAppComponent, SidenavComponent, ToolbarComponent, PostListComponent, PostCardComponent, WritePostComponent],
  providers:[
    PostService,
    TinymceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderInterceptor,
      multi: true
    }
  ]
})
export class PeopleModule { }
