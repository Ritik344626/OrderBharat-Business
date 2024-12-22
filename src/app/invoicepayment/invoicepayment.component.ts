import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-invoicepayment',
  templateUrl: './invoicepayment.component.html',
  styleUrls: ['./invoicepayment.component.scss']
})
export class InvoicepaymentComponent implements OnInit {


  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  sales_id: any = [];
  customerdata: any = [];
  customerdata1: any = [];
  otherdata: any = [];

  salesdata: any = [];
  items: any = [];
  user_id: any;
  company_id: any;
  total: any;
  paymenttype: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.sales_id = localStorage.getItem('sales_id');   
    this.getallsales();
  }



  getallsales() { 
    console.log(this.user_id); 
console.log(this.company_id);
console.log(this.sales_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getsalesinvoicedetails', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          sales_id: this.sales_id,
          //    customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.salesdata = this.response.data.salesdata;
          this.items = this.response.data.items;
         console.log(this.items);

          // for (var i = 0; i < this.customerdata.length; i++) {
          //   this.lastcusid = this.customerdata[i].customer_id;
          // }
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  submitquery() {
    this.httpclient
      .post(environment.apiBaseUrl + 'addpaymentrecept', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          total: this.total,
          paymenttype: this.paymenttype,
          sales_id: this.sales_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          Swal.fire({
            title: 'Success',
            text: this.response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.router.navigate(['/invoicepayment']);
          });
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

}
