import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  user_id: any = localStorage.getItem('user_id');
  company_id: any = localStorage.getItem('company_id');
  visitor_id: any = localStorage.getItem('visitor_id');
  
  customer_id: any = 0;
  cartdata: any;
  tmp_cartdata: any = {};
  customerdata: any;
  totalamount: any = 0;
  quantity: any = 0;
  response: any;
  friendlist: any = [];
  
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.visitor_id= localStorage.getItem('visitor_id');  
     // this.getvisitordetails();
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


  friendschat(id: any) {
    localStorage.setItem('visitor_friends_id', id);
    this.router.navigate(['/friendschat']);
  }
  
  getallfriendlist() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getallfriend', [
        {
          api_key: environment.apikey,
          visitor_id: this.visitor_id,
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


  searchfriend(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'searchfriendname', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
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
