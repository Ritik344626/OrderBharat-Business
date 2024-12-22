import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {

   // user_id: any = localStorage.getItem('user_id');
  //  company_id: any = localStorage.getItem('company_id');
  user_id: any;
  company_id: any;

    cartdata: any;
    tmp_cartdata: any = {};
    customerdata: any;
    totalamount: any = 0;
    quantity: any = 0;
    response: any;
    businesslist: any = [];
    friendlist: any = [];
 
    constructor(
      private Token: TokenService,
      private httpclient: HttpClient,
      private router: Router
      
    ) { }
  
    ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');      
      this.getallcustomerlist();        
    } 

  chats() {
    this.router.navigate(['/chats']);
  }

  friends() {
    this.router.navigate(['/friends']);
  }

  invite() {
    this.router.navigate(['/invite']);
  }

  posts() {
    this.router.navigate(['/posts']);
  }

  chatdetails(id: any) {
    localStorage.setItem('visitor_id', id);
    this.router.navigate(['/chatdetails']);
  }
  invitepending() {
    this.router.navigate(['/invitepending']);
  }

  
  getallcustomerlist() {
    console.log(this.company_id);
        this.httpclient
          .post(environment.apiBaseUrl + 'getallcustomerlist', [
            {
              api_key: environment.apikey,
             company_id: this.company_id,
            },
          ])
          .subscribe((res: any) => {
            this.response = res;
            console.log(res);
            if (this.response.success == true) {
              this.friendlist = this.response.data.friendlist;
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

  searchshop(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'searchshopbyname', [
        {
          api_key: environment.apikey,
      //   user_id: this.user_id,
       //   company_id: this.company_id,
          shopname: data.target.value,
       //   customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
this.businesslist = this.response.data.businesslist;
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

  shopdetails(id: any) {
    localStorage.setItem('shop_id', id);
    this.router.navigate(['/cataloguec']);
  }

}
