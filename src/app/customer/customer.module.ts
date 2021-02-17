import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, ParamMap} from '@angular/router';
import { MaterialModule } from '../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomerComponent } from './customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { Form, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path : '', component: CustomerComponent},
  {path : 'detail/:id', component: CustomerDetailComponent},
];

@NgModule({
  declarations: [ CustomerComponent,CustomerAddComponent, CustomerEditComponent, CustomerDeleteComponent, CustomerDetailComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class CustomerModule { 
  
}
