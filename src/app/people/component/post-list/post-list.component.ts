import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostParameters } from '../../models/post.Parameter';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { Post } from '../../models/post';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Post[];
  pageMeta:PageMeta;

  // 设置默认属性，即PostParameters中的constructor(init?: Partial<PostParameters>) {
    //     super(init);
    //     Object.assign(this, init);
    // }
  postParameter = new PostParameters({ orderBy: 'id desc', pageSize: 5, pageIndex: 0 });

  constructor(
    private openIdConnectService: OpenIdConnectService,
    private postService:PostService) { }

  ngOnInit() {
    this.posts = [];
    this.getPosts();
  }

  getPosts() {
    this.postService.getPagedPosts(this.postParameter).subscribe(resp => {
      // 获得翻页元数据,json.pase转为json,as PageMeta则转为PageMeta型
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      // 将resp里的属性都复制出来，建立一个新的对象，新的对象的类型是result-with-links
      let result = { ...resp.body } as ResultWithLinks<Post>;
      this.posts = this.posts.concat(result.value);
    });
  }

  // 滚动触发
  onScroll() {
    console.log('scrolled down!!');
    this.postParameter.pageIndex++;
    if (this.postParameter.pageIndex < this.pageMeta.pageCount) {
      this.getPosts();
    }
  }
 
}
