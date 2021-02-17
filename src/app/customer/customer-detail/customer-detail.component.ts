import { Component, OnInit,Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../models';
import{ Location } from'@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  @Input() customer: Customer;
  constructor( private route: ActivatedRoute,
    private customerServicer : CustomerService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCustomerFormRoute();
  }
  getCustomerFormRoute():void{
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(`this.route.snapshot.paramMap =${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.customerServicer.getCustomerFromId(id).subscribe(customer=>this.customer=customer);
  }
  goBack():void{
    this.location.back();
  }
  save():void{
    this.customerServicer.updateCustomer(this.customer).subscribe(()=> this.goBack());
  }
  deleted(customerId: number):void{
    this.customerServicer.deleteCustomer(this.customer.id).subscribe(()=> this.goBack());
  }

}
