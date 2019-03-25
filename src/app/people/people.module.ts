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
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';
import { PostTableComponent } from './component/post-table/post-table.component';
import { EnsureAcceptHeaderInterceptor } from '../shared/ensure-accept-header.interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    InfiniteScrollModule
  ],
  declarations: 
  [
    PepoleAppComponent, 
    SidenavComponent, 
    ToolbarComponent, 
    PostListComponent,
     PostCardComponent,
      WritePostComponent,
      EditPostComponent,
      PostDetailComponent,
      SafeHtmlPipe,
      PostTableComponent],
  providers:[
    PostService,
    TinymceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    }
  ]
})
export class PeopleModule { }
