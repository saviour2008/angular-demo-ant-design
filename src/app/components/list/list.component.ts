import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleService } from 'src/app/service/article.service';
import { CommonListenerService } from 'src/app/service/common-listener.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  data = [];
  initLoading = true;
  page = 1;
  isEnd = false;
  isEditStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private commonListenerService: CommonListenerService
  ) {}

  ngOnInit(): void {
    this.articleService
      .getData({ page: this.page, limit: 2 })
      .pipe(catchError(this.handleBusinessError()))
      .subscribe((data: any) => {
        this.initLoading = false;
        this.page++;
        this.data = this.data.concat(data.list);
        this.isEnd = data.isEnd;
      });
  }

  edit(id) {
    // 相对于现在的路由往上找一层，然后再进入这个路由
    this.isEditStatus.emit(true);
    this.commonListenerService.editStatus$.next(true);
    this.router.navigate(['../item', id], {
      relativeTo: this.route,
    });
  }

  onLoadMore() {
    this.articleService
      .getData({ page: this.page, limit: 2 })
      .subscribe((data: any) => {
        this.initLoading = false;
        this.page++;
        this.data = this.data.concat(data.list);
        this.isEnd = data.isEnd;
      });
  }

  handleBusinessError() {
    return (error) => {
      console.log('handle api customer api error' + error);
      this.initLoading = false;
      return EMPTY;
    };
  }
}
