import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ArticleService } from 'src/app/shared/service/article.service'
import { CommonListenerService } from 'src/app/shared/service/common-listener.service'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, AfterContentChecked {
  isCreating = false
  private editStatusSubscription: Subscription
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private commonListenerService: CommonListenerService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.editStatusSubscription =
      this.commonListenerService.editStatus$.subscribe((value) => {
        if (value) {
          this.isCreating = true
        } else {
          this.isCreating = false
        }
      })
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges()
  }
  ngOnDestroy(): void {
    this.editStatusSubscription.unsubscribe()
  }

  navToList() {
    this.isCreating = false
    // 指定相对路由，请使用 NavigationExtras 中的 relativeTo
    this.router.navigate(['list'], { relativeTo: this.route })
  }

  navToCreate() {
    this.isCreating = true
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  sendAsyncApiRequest() {
    this.articleService.sendAsyncApiRequest().subscribe((data) => {
      console.log(data)
    })
  }

  sendSyncApiRequest() {
    this.articleService.sendSyncApiRequest().subscribe((data) => {
      console.log(data)
    })
  }
}
