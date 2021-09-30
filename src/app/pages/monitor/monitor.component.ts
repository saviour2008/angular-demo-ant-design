import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/article.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit {
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getData().subscribe((data) => {
      console.log(data);
    });
  }

  postData() {
    this.articleService.postData().subscribe((data) => {
      console.log(data);
    });
  }

  sendAsyncApiRequest() {
    this.articleService.sendAsyncApiRequest().subscribe((data) => {
      console.log(data);
    });
  }

  sendSyncApiRequest() {
    this.articleService.sendSyncApiRequest().subscribe((data) => {
      console.log(data);
    });
  }
}
