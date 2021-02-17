import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormControl  } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Customer } from '../models';
import{ Location } from'@angular/common';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  public customer: any = {
  };
  constructor(
    public dialogRef: MatDialogRef<CustomerAddComponent>,
    private location: Location,
    @Inject(MAT_DIALOG_DATA)  public data,
    public customerService: CustomerService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(false);
  }
  save(form){
    console.log(form);
    if(form.valid)
    {
      this.customerService.addCustomer(this.customer).subscribe(
        data => {
          console.log(data);
          this.toastr.success('Thêm thành công Customer');
          this.dialogRef.close(true);
        },
        error => {
          console.log(error);
        });
    }
    else{
      this.toastr.success('Thất bại !');
      this.dialogRef.close(true);
    }
  }
}
