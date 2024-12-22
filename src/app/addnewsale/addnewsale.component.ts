import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-addnewsale',
  templateUrl: './addnewsale.component.html',
  styleUrls: ['./addnewsale.component.scss'],
})
export class AddnewsaleComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  user_id: any = localStorage.getItem('user_id');
  company_id = localStorage.getItem('company_id');
  products: any = [];
  otherdata: any = [];
  quantity: any = 0;
  response: any;
  productloadlimit: any;

  ngOnInit(): void {
    this.getallproducts();
    this.getshopdetails();
  }
  productview(product_id: any) {
    localStorage.setItem('product_id', product_id);
    this.router.navigate(['/productview']);
  }
  getallproducts() {
    if ($(window).height() <= 700) {
      this.productloadlimit = 10;
    }

    this.httpclient
      .post(environment.apiBaseUrl + 'getallproducts', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          productloadlimit: this.productloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.products = this.response.data.products;
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

  searchproduct(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'searchproductbyname', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          productname: data.target.value,
          productloadlimit: this.productloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.products = this.response.data.products;
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

  @HostListener('window:scroll', ['$event'])
  getScrollPos(data: any) {
    var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);

    if (curr_pageYOffset == $(document).height() - $(window).height()) {
      // ajax call get data from server and append to the div
      this.productloadlimit += 10;

      this.httpclient
        .post(environment.apiBaseUrl + 'getallproducts', [
          {
            api_key: environment.apikey,
            user_id: this.user_id,
            company_id: this.company_id,
            productloadlimit: this.productloadlimit,
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {
            this.products = this.response.data.products;
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
  }

  getshopdetails() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getshopdetails', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
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

  addtocart(id: any, price: any, polarity: any, type: any) {
    this.quantity = $('#quantity' + id).val();

    if (type == 1) {
      if (polarity == 1) {
        if (this.quantity <= 0) {
          this.quantity = 1;
        } else {
          this.quantity -= 1;
          if (this.quantity <= 0) {
            this.quantity = 1;
          }
        }
      } else if (polarity == 2) {
        this.quantity = Number(this.quantity) + 1;
      }
    } else if (type == 2) {
      this.quantity = this.quantity.replace(/[a-zA-Z]/g, '');
      this.quantity = this.quantity.replace(
        /[-_!@^&\/\\#,;+()$~%.'":*?<>{}]/g,
        ''
      );

      if (this.quantity == 0) {
        this.quantity = 1;
      }
    }

    $('#quantity' + id).val(this.quantity);

    this.httpclient
      .post(environment.apiBaseUrl + 'addtocart', [
        {
          api_key: environment.apikey,
          site_id: this.user_id,
          product_id: id,
          price: price,
          qty: this.quantity,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          // this.products = this.response.data.products;
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


  newproduct_id: any;
  bdate:any=[];
  vendor_id: any = localStorage.getItem('vendor_id');
  visitor_id: any = localStorage.getItem('visitor_id');
  addbookingdate(pid: any,i:any) {
   // this.newproduct_id = $('#newproduct_id').val();     

// console.log(this.vendor_id);
// console.log(this.visitor_id);
// console.log(data.value.date);
// console.log(this.newproduct_id);
// console.log(this.user_id);

    this.httpclient
      .post(environment.apiBaseUrl + 'addbookingdate', [
        {
          api_key: environment.apikey,
          vendor_id: this.user_id,
          visitor_id: 0,
          date: this.bdate[i],
          product_id: pid,
         // user_id: this.user_id
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
            this.router.navigate(['/customersale']);
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
