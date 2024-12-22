import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
 
 
  user_id: any;
  company_id: any;

  customer_id: any = 0;
  cartdata: any;
  tmp_cartdata: any = {};
  customerdata: any;
  totalamount: any = 0;
  quantity: any = 0;
  response: any;
  friendlist: any = [];
  visitor_id: any = [];
  visitor_friend_id: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.visitor_id= localStorage.getItem('visitor_id');      
      this.getallfriendlist();     
       
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

  invitepending() {
    this.router.navigate(['/invitepending']);
  }

  inviteme(visitor_id: any) {
   console.log (visitor_id);    
   // this.user_id= localStorage.getItem('user_id');
   // this.router.navigate(['/chatdetails']);
  
   this.httpclient
   .post(environment.apiBaseUrl + 'addinviteme', [
     {      
       api_key: environment.apikey,
       visitor_id: visitor_id,
       company_id: this.company_id,
     },
   ])
   .subscribe((res: any) => {
     this.response = res;
     if (this.response.success == true) {
      this.customerdata = this.response.data.customerdata;
     // localStorage.setItem('company_id', this.response.data.company_id);
    //  this.router.navigate(['/invite']);
      location.reload();
    }  else if (this.response.success == false) {
       Swal.fire({
         title: 'Oops...',
         text: this.response.data.message,
         icon: 'warning',
         confirmButtonText: 'Ok',
       });
     }
   });
  }

  getallfriendlist() {
console.log(this.company_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getallinvitefriend', [
        {
          api_key: environment.apikey,
         company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.friendlist = this.response.data.friendlist;
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


  searchinvitefriend(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'searchinvitefriendname', [
        {
          api_key: environment.apikey,
          visitor_id: this.visitor_id,
         // user_id: this.user_id,
         company_id: this.company_id,
          friendname: data.target.value,
       //   customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
this.friendlist = this.response.data.friendlist;
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


}
