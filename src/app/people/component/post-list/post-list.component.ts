import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostParameters } from '../../models/post.Parameter';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  // 设置默认属性，即PostParameters中的constructor(init?: Partial<PostParameters>) {
    //     super(init);
    //     Object.assign(this, init);
    // }
  postParameter = new PostParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });

  constructor(private postService:PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPagedPosts(this.postParameter).subscribe(resp => {
     console.log(resp);
    });
  }
 
}
