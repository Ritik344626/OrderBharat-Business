import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import {environment} from '../../environments/environment';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Share } from '@capacitor/share';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.scss'],
})
export class OrderviewComponent implements OnInit {
  data: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  order_id: any = [];
  customerdata: any = [];
  customerdata1: any = [];
  otherdata: any = [];
  orderstatus: any;

  salesdata: any = [];
  items: any = [];
  user_id: any;
  company_id: any;



  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.order_id = localStorage.getItem('order_id');   
    this.getallsales();
  }



  getallsales() {
    // if ($(window).height() <= 600) {
    //   this.customerloadlimit = 5;
    //  }
    console.log(this.user_id);
console.log(this.company_id);
console.log(this.order_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getorderdetails', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          order_id: this.order_id,
          //    customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        console.log(res);
        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.salesdata = this.response.data.salesdata;
          this.items = this.response.data.items;
         this.data= this.salesdata[0];
          
         console.log(this.data);

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
    
  //   SocialSharing.share('Order Bharat Business Invoice', 'Invoice', '',  'https://gbosss.com/order/pdf/'+this.order_id+'/'+this.company_id);
  // }



  submitquery(data: any) {
    console.log(this.user_id);
    console.log(data.value.orderstatus);
    this.httpclient
      .post(environment.apiBaseUrl + 'updateorderstatus', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,       
          order_id: this.order_id,
          orderstatus: data.value.orderstatus          
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
            this.router.navigate(['/orderlist']);
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
 
  async share()
  {
    await Share.share({
      title: 'Order Bharat order copy',
      text: 'Order copy',
      url:  'https://gbosss.com/order/pdf/'+this.order_id+'/'+this.company_id,
      dialogTitle: 'Share Order copy',
    });
  }
}
