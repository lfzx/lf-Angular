import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { PostParameters } from '../models/post.Parameter';
import { Post } from '../models/post';
import { PostAdd } from '../models/post-add';


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

  addPost(post: PostAdd) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.cgzl.post.create+json',
        'Accept': 'application/vnd.cgzl.hateoas+json'
      })
    };

    return this.http.post<Post>(`${this.apiUrlBase}/posts`, post, httpOptions);
  }

}
