import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { PostParameters } from '../models/post.Parameter';
import { Post } from '../models/post';
import { PostAdd } from '../models/post-add';
import { Observable } from 'rxjs';
import { Operation } from 'fast-json-patch';


@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService{

  constructor(private http: HttpClient) { 
    // 继承了BaseService，所以需要调用super
    super();
  }

  // 根据后台api实现查询集合方法
  getPagedPosts(postParameter?: any | PostParameters) {
    return this.http.get(`${this.apiUrlBase}/posts`, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.cgzl.hateoas+json'
      }),
      // 默认获得body,此处则表示获取所有的response
      observe: 'response',
      params: postParameter
    });
  }

  getPostById(id: number | string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrlBase}/posts/${id}`);
  }

  addPost(post: PostAdd) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.cgzl.post.create+json',
        'Accept': 'application/vnd.cgzl.hateoas+json'
      })
    };

    return this.http.post<Post>(`${this.apiUrlBase}/posts`, post, httpOptions);
  }

  partiallyUpdatePost(id: number | string, patchDocument: Operation[]): Observable<any> {
    return this.http.patch(`${this.apiUrlBase}/posts/${id}`, patchDocument,
      {
        headers: { 'Content-Type': 'application/json-patch+json' }
      });
  }

}
