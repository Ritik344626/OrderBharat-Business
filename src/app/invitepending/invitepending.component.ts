import { Component, HostListener,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-invitepending',
  templateUrl: './invitepending.component.html',
  styleUrls: ['./invitepending.component.scss'],
})
export class InvitependingComponent implements OnInit {
  
  company_id: any = localStorage.getItem('company_id');
  auth: any = false;
  customer_id: any = 0;
  cartdata: any;
  tmp_cartdata: any = {};
  customerdata: any;
  totalamount: any = 0;
  quantity: any = 0;
  response: any;
  friendlist: any = [];
  visitor_id:  any;
  visitor_friend_id: any;
  lastcusid: any;
  customerloadlimit: any;


  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {  
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

    getallfriendlist() {
      console.log(this.company_id);
      this.httpclient
        .post(environment.apiBaseUrl + 'getallpendingfriendlist', [
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
            // Swal.fire({
            //   title: 'Oops...',
            //   text: this.response.data.message,
            //   icon: 'warning',
            //   confirmButtonText: 'Ok',
            // });
          }
        });
    }
  
  
    searchfriend(data: any) {
      console.log(this.visitor_id);
      this.httpclient
        .post(environment.apiBaseUrl + 'searchfriendname', [
          {
            api_key: environment.apikey,
            visitor_id: this.visitor_id,
           // user_id: this.user_id,
           // company_id: this.company_id,
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


    
   accept(visitor_id: any) {
    // console.log (this.user_id);
      localStorage.setItem('visitor_friend_id', visitor_id);
    // this.user_id= localStorage.getItem('user_id');
    // this.router.navigate(['/chatdetails']);
    this.visitor_friend_id= localStorage.getItem('visitor_friend_id'); 

    console.log(this.visitor_id),
    console.log(this.visitor_friend_id),

    this.httpclient
    .post(environment.apiBaseUrl + 'acceptnowinviteme', [
      {      
        api_key: environment.apikey,
        visitor_id: this.visitor_id,
        visitor_friends_id: this.visitor_friend_id, 
      },
    ])
    .subscribe((res: any) => {
      this.response = res;
      if (this.response.success == true) {
      // this.customerdata = this.response.data.customerdata;
      // localStorage.setItem('company_id', this.response.data.company_id);
      // this.router.navigate(['/invitepending']);
      location.reload();
     }  else if (this.response.success == false) {

      Swal.fire({
        title: 'Oops...',
        text: this.response.data.message,
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then(() => {
        this.router.navigate(['/friends']);
      });
      }
    });
   }
 
  //  @HostListener('window:scroll', ['$event'])
  //  getScrollPos(data: any) {
  //    var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);
 
  //    if (curr_pageYOffset == $(document).height() - $(window).height()) {
  //      // ajax call get data from server and append to the div
  //      this.customerloadlimit += 5;
  //      this.httpclient
  //        .post(environment.apiBaseUrl + 'getallpendingfriendlist', [
  //          {
  //            api_key: environment.apikey,
  //            visitor_id: this.visitor_id,
  //            // lastcusid: this.lastcusid,
  //            customerloadlimit: this.customerloadlimit,
  //          },
  //        ])
  //        .subscribe((res: any) => {
  //          this.response = res;
 
  //          if (this.response.success == true) {
  //            console.log(this.response.data.yougive);
 
  //            this.friendlist = this.response.data.friendlist;
            
 
  //            // for (var i = 0; i < this.customerdata.length; i++) {
  //            //   this.lastcusid = this.customerdata[i].customer_id;
  //            // }
  //          } else if (this.response.success == false) {
  //            Swal.fire({
  //              title: 'Oops...',
  //              text: this.response.data.message,
  //              icon: 'warning',
  //              confirmButtonText: 'Ok',
  //            });
  //          }
  //        });
  //    }
 
     // if (this.prev_pageYOffset < curr_pageYOffset) {
     //   this.prev_pageYOffset = curr_pageYOffset;
     //   console.log('Current position: ' + curr_pageYOffset);
     // }
 
     // if (this.prev_pageYOffset == curr_pageYOffset) {
     //   console.log('Load New');
     // }
   }
//}
