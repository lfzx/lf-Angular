import { Component, OnInit, ViewChild } from '@angular/core';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { PostParameters } from '../../models/post.Parameter';
import { Post } from '../../models/post';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, Sort, PageEvent } from '@angular/material';
import { PostService } from '../../services/post.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {
  pageMeta: PageMeta;
  postParameter = new PostParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });

  // 定义列
  displayedColumns: string[] = ['id', 'title', 'author', 'lastModified'];
  dataSource: Post[];
  searchKeyUp = new Subject<string>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private postService: PostService) {
    const subscription = this.searchKeyUp.pipe(
      // 搜索框输入后过500毫秒才会进行过滤动作
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.load();
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.postService.getPagedPosts(this.postParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult = { ...resp.body } as ResultWithLinks<Post>;
      this.dataSource = pagedResult.value;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.postParameter.title = filterValue;
    this.load();
  }

  //排序
  sortData(sort: Sort) {
    this.postParameter.orderBy = null;
    if (sort.direction) {
      this.postParameter.orderBy = sort.active;
      if (sort.direction === 'desc') {
        this.postParameter.orderBy += ' desc';
      }
    }
    this.load();
  }

  // 翻页
  onPaging(pageEvent: PageEvent) {
    this.postParameter.pageIndex = pageEvent.pageIndex;
    this.postParameter.pageSize = pageEvent.pageSize;
    this.load();
  }
  
}
