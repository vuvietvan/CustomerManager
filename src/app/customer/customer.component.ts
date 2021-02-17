import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject,Observable } from 'rxjs';
import * as Rx from "rxjs";
import { CustomerService } from './customer.service';
import { MatDialog} from '@angular/material/dialog';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { debounceTime, distinctUntilChanged , switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Customer } from './models';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public customer=[];
  public p: number = 1;
  public Card;List: boolean;
  observable :any;
  subject = new Subject<number>();
  total :any;
  behaviorsubject = new Rx.BehaviorSubject<number>(0);
  customer$: Observable<Customer[]>;
  private searchedSuject = new Subject<string>();
  constructor(private router:Router, private customerService : CustomerService, public dialog: MatDialog) {
    this.Card = true;
    this.List = false;
  } 
  getList(){
    this.customerService.getCustomer().subscribe(
      data => {
        this.customer = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  showCard(){
    this.Card = true;
    this.List = false;
  }

  showList() {
    this.Card = false;
    this.List = true;
  }
  openDialog() {
    const dialogRef = this.dialog.open(CustomerAddComponent,{
      panelClass:"customer-add-dialog",
      width:"500px",
      data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getList();
    });
  }
  search(searchedString: string):void{
    console.log(`searchedString =${searchedString}`);
    // this.searchedSuject.next(searchedString);
    this.customerService.searchCustomer(searchedString).subscribe(
      data => {
        this.customer = data;
        // this.total =this.customer.length; 
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {

  this.customerService.getCustomer().subscribe(
    data => {
      this.customer = data;
      this.total =this.customer.length; 
    },
    error => {
      console.log(error);
    }
  );
  // this.customer$ = this.searchedSuject.pipe(
  //   debounceTime(300),
  //   distinctUntilChanged(),
  //   switchMap((searchedString: string) => this.customerService.searchCustomer(searchedString))
  // );
}
   
}export class DialogContentExampleDialog {
  
}

