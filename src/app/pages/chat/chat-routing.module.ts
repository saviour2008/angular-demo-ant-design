import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth-guard.guard';
import { ItemComponent } from 'src/app/components/item/item.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    // redirectTo: '/monitor/list',
    // pathMatch: 'full',
    children: [
      {
        path: 'list', // child route path
        component: ListComponent, // child route component that the router renders
      },
      {
        path: 'item/:id', // child route path
        component: ItemComponent, // child route component that the router renders
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'new', // child route path
        component: ItemComponent, // child route component that the router renders
      },
      { path: '', redirectTo: '/chat/list', pathMatch: 'full' }, //注意redirectTo的时候要加/，或者这么写“{ path: '', redirectTo: 'list' },”
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
