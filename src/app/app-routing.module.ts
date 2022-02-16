import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'monitor',
    loadChildren: () =>
      import('./pages/monitor/monitor.module').then((m) => m.MonitorModule),
  },
  {
    path: 'rxjs',
    loadChildren: () =>
      import('./pages/rxjs/rxjs.module').then((m) => m.RxjsModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forRoot(routes, { enableTracing: true }), // <-- debugging purposes only
    ComponentsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
