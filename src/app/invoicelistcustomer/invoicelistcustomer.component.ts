import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-invoicelistcustomer',
  templateUrl: './invoicelistcustomer.component.html',
  styleUrls: ['./invoicelistcustomer.component.scss'],
})
export class InvoicelistcustomerComponent implements OnInit {

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router // private platform: Platform,
  ) {}

  response: any;
  auth: any = false;
  customer_id: any = [];
  customerdata: any = [];
  customerdata1: any = [];
  invoicebycustomer: any;

  salesdata: any = [];
  user_id: any;
  company_id: any;

  lastcusid: any;
  invoiceloadlimit: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.customer_id = localStorage.getItem('customer_id');

    // if (this.invoicebycustomer == 'true') {
    //   this.customer_id = localStorage.getItem('customer_id');
    // } else {
    //   this.customer_id = 0;
    // }
  //  this.getcustomerdetails();
    this.getallsales();
  }


  getallsales() {
    // if ($(window).height() <= 600) {
    //   this.invoiceloadlimit = 5;
    // }
console.log(this.user_id);
console.log(this.company_id);
console.log(this.customer_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getallsalesinvoice', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
          //    invoiceloadlimit: this.invoiceloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.salesdata = this.response.data.salesdata;

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

  yougive(customer_id: any) {
    localStorage.setItem('customer_id', customer_id);
    this.router.navigate(['/yougive']);
  }

  yougot(customer_id: any) {
    localStorage.setItem('customer_id', customer_id);
    this.router.navigate(['/yougot']);
  }

  viewinvoice(sales_id: any) {
    localStorage.setItem('sales_id', sales_id);
    this.router.navigate(['/viewinvoice']);
  }
  customersale() {
    this.router.navigate(['/customersale']);
  }

  invoicelist() {
    this.router.navigate(['/invoicelist']);
  }

  home() {
    this.router.navigate(['/home']);
  }



  searchinvoice(data: any) {
   console.log(this.company_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'customersearchinvoice', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
          invoicelist: data.target.value,
       //   customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
        this.salesdata = this.response.data.salesdata;
        //  this.customerdata = this.response.data.customerdata;
      } else if (this.response.success == false) {
          // Swal.fire({
          //   title: 'Oops...',
          //   text: this.response.data.message,
          //   icon: 'warning',
          //   confirmButtonText: 'Ok',
          // });
        }
      });
  }



  // searchinvoice(data: any) {
  //   this.httpclient
  //     .post(environment.apiBaseUrl + 'searchinvoicebynumber', [
  //       {
  //         api_key: environment.apikey,
  //         user_id: this.user_id,
  //         company_id: this.company_id,
  //         invoicenumber: data.target.value,
  //         invoiceloadlimit: this.invoiceloadlimit,
  //       },
  //     ])
  //     .subscribe((res: any) => {
  //       this.response = res;

  //       if (this.response.success == true) {
  //         this.salesdata = this.response.data.salesdata;

  //         // for (var i = 0; i < this.customerdata.length; i++) {
  //         //   this.lastcusid = this.customerdata[i].customer_id;
  //         // }
  //       } else if (this.response.success == false) {
  //         Swal.fire({
  //           title: 'Oops...',
  //           text: this.response.data.message,
  //           icon: 'warning',
  //           confirmButtonText: 'Ok',
  //         });
  //       }
  //     });
  // }

//   @HostListener('window:scroll', ['$event'])
//   getScrollPos(data: any) {
//     var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);

//     if (curr_pageYOffset == $(document).height() - $(window).height()) {
//       // ajax call get data from server and append to the div
//       this.invoiceloadlimit += 5;
//       this.httpclient
//         .post(environment.apiBaseUrl + 'getallsalesinvoice', [
//           {
//             api_key: environment.apikey,
//             user_id: this.user_id,
//             company_id: this.company_id,
//             // lastcusid: this.lastcusid,
//             invoiceloadlimit: this.invoiceloadlimit,
//           },
//         ])
//         .subscribe((res: any) => {
//           this.response = res;

//           if (this.response.success == true) {
//             console.log(this.response.data.yougive);

//             this.customerdata = this.response.data.customerdata;
           

//             // for (var i = 0; i < this.customerdata.length; i++) {
//             //   this.lastcusid = this.customerdata[i].customer_id;
//             // }
//           } else if (this.response.success == false) {
//             Swal.fire({
//               title: 'Oops...',
//               text: this.response.data.message,
//               icon: 'warning',
//               confirmButtonText: 'Ok',
//             });
//           }
//         });
//     }
// }
}
