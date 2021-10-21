import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { NewUserService } from 'src/app/service/new-user.service';
import { UserService } from 'src/app/service/user.service';
import { CreditNumberPipe } from '../../pipes/credit-number.pipe';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicContainer: ViewContainerRef;
  constructor(
    private injector: Injector,
    private userService: UserService,
    private resolver: ComponentFactoryResolver,
    private creditCardPipe: CreditNumberPipe
  ) {}

  public skills = [];

  get name() {
    return this.userService.getData();
  }

  mount: number = null;

  color = 'red';

  theme = '';

  show = true;

  value = 0;
  creditCardNumber: any = '9999999999999999';

  alertComponent;

  files = [
    { name: 'logo.svg', size: 2120109, type: 'image/svg' },
    { name: 'banner.jpg', size: 18029, type: 'image/jpg' },
    { name: 'background.png', size: 1784562, type: 'image/png' },
  ];

  context = {
    message: 'Hello ngOutletContext!',
    newMessage: 'Hello New ngOutletContext!',
    $implicit: 'Hello, Semlinker!',
  };

  ngOnInit() {
    this.skills = [
      'AngularJS 1.x',
      'Angular 2.x',
      'Angular 4.x',
      'Angular 6.x',
    ];

    this.creditCardNumber = this.creditCardPipe.transform(
      this.creditCardNumber,
      2
    );

    const service = this.injector.get(NewUserService);
    console.log(service);
  }
  addSkill(skill: string, $event) {
    $event.preventDefault();

    let skillStr = skill.trim();
    if (this.skills.indexOf(skillStr) === -1) {
      this.skills.push(skillStr);
    }
  }
  createComponent(type) {
    this.dynamicContainer.clear();
    const factory: ComponentFactory<AlertComponent> =
      this.resolver.resolveComponentFactory(AlertComponent);
    this.alertComponent = this.dynamicContainer.createComponent(factory);
    this.alertComponent.instance.type = type;
    this.alertComponent.instance.alertEmitter.subscribe((message) => {
      this.alertComponent.destroy();
    });
  }
  changeCardNumber($event) {
    this.creditCardNumber = $event.target.value;
  }
}
