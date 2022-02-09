import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  concatAll,
  mergeMap,
  retry,
  switchMap,
  take,
  concatMap,
  map,
  mapTo,
  mergeAll,
} from 'RxJS/operators';
import {
  of,
  concat,
  interval,
  throwError,
  Subject,
  EMPTY,
  fromEvent,
  from,
  zip,
  combineLatest,
} from 'RxJS';
import { Observable, forkJoin } from 'rxjs';
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
    const sourceTwo = of(4, 5, 6, 7);
    // 先发出 sourceOne 的值，当完成时订阅 sourceTwo
    const example = concat(sourceOne, sourceTwo);
    const example4 = Observable.create(of(123)).publish();
    example4.subscribe((value) => {
      console.log(value);
    });
    // 执行connect时，开始发送数据，如果不用这个，需要在publish后面加上refCount()方法，也相当于启动数据发送
    example4.connect();

    example.subscribe(
      (val) => {
        console.log(val);
        this.rd.setProperty(this.concat.nativeElement, 'innerText', val);
      },
      (error) => {},
      () => {
        console.log('complete example');
      }
    );

    // const myObservable = Observable.create((observer) => {
    //   observer.next('foo');
    //   setTimeout(() => observer.next('bar'), 1000);
    // });

    // myObservable.subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log('error');
    //   },
    //   () => {
    //     console.log('complete');
    //   }
    // );

    // const subject = new Subject();
    // subject.next('test');
    // subject.complete();
    // subject.subscribe(
    //   (value) => {
    //     console.log(value);
    //   },
    //   (error) => error,
    //   () => {
    //     console.log('complete');
    //   }
    // );

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

    example1.subscribe({
      next: (val) => console.log(val),
      error: (val) => console.log(`${val}: Retried 2 times then quit!`),
    });

    // 发出 1,2,3,4,5
    const source2 = of(1, 2, 3, 4, 5);
    // 取第一个发出的值然后完成
    const example2 = source2.pipe(take(1));
    // 输出: 1
    example2.subscribe((val) => console.log(val));

    // Subject与Observable的区别是多播，也就是订阅subject的对象，不用从头输出发送的值，啥时候订阅，就发送啥时候的发布值
    // 而Observable是每次被订阅的话都从开始发送新值，并且只能被订阅，而subject既能被订阅，也能去订阅
    // Subject与BehaviorSubject区别是BehaviorSubject被订阅时，会发送最近一次发布的value
  }

  handleSlotClick() {
    console.log('child slot is clicked');
  }

  handleConcatMap() {
    // 与concatAll的区别，其实就是concatAll与map的结合
    // 要等本轮工作完成了才能继续下一轮。
    // 如果本轮工作还未完成又接受到了源对象发送的数据，那么将会用一个队列保存，然后等本轮完成立即检查该队列里是否还有，如果有则立马开启下一轮
    const source = interval(3000);
    // concatMap指的是在source发送数据后，紧接着执行监听source数据发送的方法
    // 也就是第三秒发送数据后，开始执行interval(1000).pipe(take(2))，也就是取0，1。
    // 第六秒发送数据后，再次执行上面的方法，0，1
    // 也就是第一级每发送一次数据，第二级执行一次方法
    const result = source.pipe(
      concatMap((val) => interval(1000).pipe(take(2)))
    );
    result.subscribe((x) => console.log(x));
  }

  handleMap() {
    const source = interval(1000).pipe(take(3));
    const result = source.pipe(map((value) => value * 2));
    result.subscribe((data) => console.log(data));
  }

  handleMapTo() {
    const source = interval(1000).pipe(take(5));
    const result = source.pipe(mapTo(666));
    result.subscribe((value) => {
      console.log(value);
    });
  }

  handleMergeMap() {
    // 跟map的区别
    // 这里面mergeMap主要做了一个整合的能力, 我们可以将它与map进行对比，我们可以发现map的返回值必须是一个数值，而mergeMap返回值是要求是一个Observable
    const source = interval(1000).pipe(take(5));
    const result = source.pipe(
      mergeMap((x) => {
        return x % 2 === 0 ? of(x) : EMPTY;
      })
    );
    result.subscribe((x) => {
      console.log(x);
    });
  }

  handleSwitchMap() {
    // switch就是切换，也就是说用switch的话，上一个源发送的前一个数据就断开了，从上个源正在发送的数据开始计算
    const btn = document.createElement('button');
    btn.innerText = 'switch map button';
    document.body.appendChild(btn);
    const source = fromEvent(btn, 'click');
    // switchMap执行的时候，上一个源发来新的之后，switchMap对应的方法就会重新开始执行,上一个源的上一次发送的就会被打断掉
    const result = source.pipe(
      switchMap((x) => {
        return interval(1000).pipe(take(3));
      })
    );
    result.subscribe((x) => {
      console.log(x);
    });
  }

  // distinct就是过滤重复值的

  handleConcatAll() {
    const btn = document.createElement('button');
    btn.innerText = 'concat all button';
    document.body.appendChild(btn);
    const source1 = fromEvent(btn, 'click');
    const source2 = source1.pipe(map((x) => interval(1000).pipe(take(3))));
    // concatAll是串行执行的。上个源每发送一次，下源就会开始执行新的，下源没结束，上源再来新的，还是要等上源结束上一轮后，再执行下一轮
    const result = source2.pipe(concatAll());
    result.subscribe((x) => {
      console.log(x);
    });
    // 其实相当于
    // source1.pipe(
    //   concatMap((x) => {
    //     return interval(1000).pipe(take(3));
    //   })
    // );
  }

  // https://juejin.cn/post/6910943445569765384#heading-58

  handleMergeAll() {
    const source1 = interval(1000).pipe(take(3));
    const source2 = source1.pipe(
      map((x) => {
        return interval(1000).pipe(take(2));
      })
    );
    // mergeAll是并行执行的。两个源按照源数据出现的数据顺序让监听者听到，source1发送一份数据出来后，source2的数据就执行一遍，以此类推，互不影响，
    // source1每次发送，都不影响上一轮source2的执行
    const result = source2.pipe(mergeAll());
    result.subscribe((x) => {
      console.log(x);
    });
  }

  handleForkJoin() {
    const ob1 = interval(1000).pipe(
      map((d) => `ob1:${d}`),
      take(3)
    );
    const ob2 = interval(2000).pipe(
      map((d) => `ob2:${d}`),
      take(2)
    );
    // 两个流都结束了，才把两个流的最后的数据发射出来
    // ob1和ob2都结束时，发射一次数据
    forkJoin([ob1, ob2]).subscribe((data) => console.log(data));
  }

  handleZip() {
    const ob1 = interval(1000).pipe(
      map((d) => `ob1:${d}`),
      take(3)
    );
    const ob2 = interval(2000).pipe(
      map((d) => `ob2:${d}`),
      take(2)
    );
    // 两个流每个流发射的数据都是一一对应，直到某一个流结束，这时候不再发送
    // 只要有一个流结束，就停止发送，在此之前，每次发送的都是一组一组的
    zip([ob1, ob2]).subscribe((data) => console.log(data));
  }

  handleCombineLatest() {
    const ob1 = interval(1000).pipe(
      map((d) => `ob1:${d}`),
      take(3)
    );
    const ob2 = interval(2000).pipe(
      map((d) => `ob2:${d}`),
      take(2)
    );
    // 两个流其中有一个流发射数据后，还需要等待另外一个流也发送数据，当都发送第一次数据的时候，才进行监听发送
    // 当开始发送数据后，其中某个流发送了数据，那么另外的流没有发送数据的话，就会取另外的流上一次发送的结果
    // 当多个流都结束的时候，才是完结的时候
    combineLatest([ob1, ob2]).subscribe((data) => console.log(data));
  }

  debounce(fun, time) {
    // 总而言之防抖就是在不断的操作中（输入、点击等）最终只执行一次的一种提高性能的方法。
    // 只执行最后一次，如果在规定的时间内再次触发这个方法，那么取消上一次的执行，就重新开始计时执行
    let timer;
    return function () {
      clearTimeout(timer);
      let args = arguments;
      timer = setTimeout(() => {
        fun.apply(this, args);
      }, time);
    };
  }

  throttle(fun, time) {
    // 节流就是在一段时间内不断操作而在你规定的时间内只执行一次的一种提高性能的方法
    // 当间隔大于time时，才会执行回调，也就是两次方法的执行间隔要大于time
    let t1: Date = new Date(); //初始时间
    return function () {
      let t2: Date = new Date(); //当前时间
      if (Number(t2) - Number(t1) > time) {
        fun.apply(this, arguments);
        t1 = t2;
      }
    };
  }
}
