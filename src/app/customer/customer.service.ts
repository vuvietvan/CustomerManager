import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../customer/models';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from'@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private CustomerURL= 'http://localhost:3000/customer';

  constructor(private http: HttpClient) { }

  getCustomer(): Observable< Customer[]>{
    return this.http.get<Customer[]>(this.CustomerURL).pipe(
      // tap(receivedCustomer => console.log(`receivedCustomer = ${JSON.stringify(receivedCustomer)}`)),
      // catchError(error => of([]))  
    );
  }

  getCustomerFromId(id: number): Observable<Customer>
  {
    const url= `${this.CustomerURL}/${id}`;
    return this.http.get<Customer>(url).pipe();
  }

  updateCustomer(customer:Customer):Observable<any>{
   
    return this.http.put(`${this.CustomerURL}/${customer.id}`,customer, httpOptions).pipe();
  }

  addCustomer(newCustomer: Customer):Observable<Customer>
  {
    return this.http.post<Customer>(this.CustomerURL, newCustomer, httpOptions).pipe();
  }

  deleteCustomer(customerId:number):Observable<Customer>{
    const url =`${this.CustomerURL}/${customerId}`;
    return this.http.delete<Customer>(url, httpOptions).pipe();
  }
  searchCustomer(typeString: string): Observable<Customer[]>
  {
    if(!typeString.trim()){
      return this.http.get<Customer[]>(this.CustomerURL).pipe();
    }
    return this.http.get<Customer[]>(`${this.CustomerURL}?lastName_like=${typeString}`).pipe();
  }
}
