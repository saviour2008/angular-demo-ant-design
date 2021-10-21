import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { concatAll, mergeMap, retry, switchMap, take } from 'RxJS/operators';
import { of, concat, interval, throwError } from 'RxJS';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.sass'],
})
export class RxjsComponent implements OnInit {
  @ViewChild('concat', { static: true }) concat: ElementRef;
  show = false;
  parentValueInContent = 'parentValue';
  constructor(private rd: Renderer2) {}

  ngOnInit(): void {
    // 发出 1,2,3
    const sourceOne = of(1, 2, 3);
    // 发出 4,5,6
    const sourceTwo = of(4, 5, 6);
    // 先发出 sourceOne 的值，当完成时订阅 sourceTwo
    const example = concat(sourceOne, sourceTwo);
    const subscribe = example.subscribe((val) => {
      setTimeout(() => {
        this.rd.setProperty(this.concat.nativeElement, 'innerText', val);
      }, 1000);
    });

    const source1 = interval(1000);
    const example1 = source1.pipe(
      mergeMap((val) => {
        // 抛出错误以进行演示
        if (val > 5) {
          return throwError('Error!');
        }
        return of(val);
      }),
      // 出错的话可以重试2次
      retry(2)
    );

    const subscribe1 = example1.subscribe({
      next: (val) => console.log(val),
      error: (val) => console.log(`${val}: Retried 2 times then quit!`),
    });

    // 发出 1,2,3,4,5
    const source2 = of(1, 2, 3, 4, 5);
    // 取第一个发出的值然后完成
    const example2 = source2.pipe(take(1));
    // 输出: 1
    const subscribe2 = example2.subscribe((val) => console.log(val));
  }

  handleSlotClick(){
    console.log('child slot is clicked')
  }
}
