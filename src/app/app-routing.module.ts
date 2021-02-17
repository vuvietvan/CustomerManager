import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CustomerComponent } from './customer/customer.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerDetailComponent } from '../app/customer/customer-detail/customer-detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',redirectTo:'/customer',pathMatch:'full'},
  {path:'orders',component:OrdersComponent},
  {
    path : 'customer', 
    loadChildren: ()=> import('./customer/customer.module').then((m)=>m.CustomerModule)
  },
  {path : 'detail/:id', component: CustomerDetailComponent},
  {path:'about',component:AboutComponent},
  {path : '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
