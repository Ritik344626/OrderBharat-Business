import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss'],
})
export class ViewinvoiceComponent implements OnInit {

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

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.sales_id = localStorage.getItem('sales_id');   
    this.getallsales();
  }


dueamt:any=0;
  getallsales() {
    // if ($(window).height() <= 600) {
    //   this.customerloadlimit = 5;
    //  }
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
       this.dueamt=  parseInt(this.salesdata[0].total)-parseInt(this.salesdata[0].paid);
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

  // share() {
    
  //   SocialSharing.share(
  //     'Order Bharat Business Invoice',
  //     'Invoice',
  //     '',
  //     ' https://gbosss.com/sales/pdf/'+this.sales_id+'/'+this.company_id
  //   );
   
  // }
}
