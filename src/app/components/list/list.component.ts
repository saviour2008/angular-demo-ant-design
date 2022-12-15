/*
 * @Author: jun.zhao saviour2008@126.com
 * @Date: 2022-10-03 21:57:52
 * @LastEditors: jun.zhao saviour2008@126.com
 * @LastEditTime: 2022-10-08 09:50:02
 * @FilePath: \angular-demo-ant-design\src\app\components\list\list.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit, EventEmitter } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd'
import { EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ArticleService } from 'src/app/shared/service/article.service'
import { CommonListenerService } from 'src/app/shared/service/common-listener.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = []
  initLoading = true
  page = 1
  pageSize = 10
  isEnd = false
  confirmModal?: NzModalRef
  // isEditStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private commonListenerService: CommonListenerService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.commonListenerService.editStatus$.next(false)
    })
    this.initList()
  }

  edit(id) {
    // 相对于现在的路由往上找一层，然后再进入这个路由
    // this.isEditStatus.emit(true);
    this.router.navigate(['../item', id], {
      relativeTo: this.route
    })
  }

  delete(id) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Are you sure delete this article?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: this.confirmDelete.bind(this, id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    })
  }

  confirmDelete(id) {
    this.articleService
      .deleteArticle(id)
      .pipe(catchError(this.handleBusinessError()))
      .subscribe((data: any) => {
        this.page = 1
        this.pageSize = 10
        this.data = []
        this.initList()
        this.message.create('success', '删除成功')
      })
  }

  onLoadMore() {
    this.articleService
      .getData({ page: this.page, pageSize: this.pageSize })
      .pipe(catchError(this.handleBusinessError()))
      .subscribe((data: any) => {
        this.initLoading = false
        this.page++
        this.data = this.data.concat(data.records)
        this.isEnd = data.isEnd
      })
  }

  handleBusinessError() {
    return (error) => {
      console.log('handle business error' + error)
      return EMPTY
    }
  }

  initList() {
    this.articleService
      .getData({ page: this.page, pageSize: this.pageSize })
      .pipe(catchError(this.handleBusinessError()))
      .subscribe((data: any) => {
        this.initLoading = false
        this.page++
        this.data = this.data.concat(data.records)
        this.isEnd = data.isEnd
      })
  }
}
