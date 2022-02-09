import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//https://zhuanlan.zhihu.com/p/113299696
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './shared/service/user.service';
import { NewUserService } from './shared/service/new-user.service';
import { UserServiceValue } from './shared/service/user-value.service';
import { UserServiceFactory } from './shared/service/user-factory.service';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MonitorModule } from './pages/monitor/monitor.module';
import { AuthInterceptor } from './shared/interceptors/app-http.interceptor';
import { RxjsModule } from './pages/rxjs/rxjs.module';
import { ResInterceptor } from './shared/interceptors/res.interceptor';
import { WebErrorHandler } from './shared/handlers/web-error.handler';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoginModule } from './pages/login/login.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMessageModule,
    LoginModule,
    NzModalModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useClass: WebErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
