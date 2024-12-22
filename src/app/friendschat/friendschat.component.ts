import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-friendschat',
  templateUrl: './friendschat.component.html',
  styleUrls: ['./friendschat.component.scss'],
})
export class FriendschatComponent implements OnInit {
  visitor_friends_id: any;
  // company_id: any = localStorage.getItem('company_id');
  vendor_id: any;
   visitorfrienddata: any = [];
   massagedata: any;
   user_id: any; 
   response: any;
   visitor_id: any;
  // vendor_id: any; 
 
   constructor(
     private Token: TokenService,
     private httpclient: HttpClient,
     private router: Router
   ) { }
 
  
   ngOnInit(): void {
    this.visitor_id= localStorage.getItem('visitor_id');   
    this.visitor_friends_id= localStorage.getItem('visitor_friends_id');    
    this.vendor_id= localStorage.getItem('vendor_id');    
    this.getfrienddetail();
    this.getallvisitormassage();
  }

  getfrienddetail() {
 //   console.log(this.visitor_friends_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getfrienddetail1', [
        {
          api_key: environment.apikey,
          visitor_friends_id: this.visitor_friends_id,
         // vendor_id: this.vendor_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
       //   this.otherdata = this.response.data;
          this.visitorfrienddata = this.response.data.visitorfrienddata;
        } else if (this.response.success == false) {
        //  Swal.fire({
        //    title: 'Oops...',
         //   text: this.response.data.message,
         //   icon: 'warning',
        //    confirmButtonText: 'Ok',
        //  });
        }
      });
  }

  getallvisitormassage() {

  ////  console.log(this.visitor_friends_id);
  //  console.log(this.vendor_id);
  //  console.log(this.visitor_id);


    this.httpclient
      .post(environment.apiBaseUrl + 'getallfriendmassage', [
        {
          api_key: environment.apikey,
          visitor_friends_id: this.visitor_friends_id,
          visitor_id: this.visitor_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
       //   visitor_id: this.visitor_id,
          this.massagedata = this.response.data.massagedata;
        } else if (this.response.success == false) {
        //  Swal.fire({
         //   title: 'Oops...',
         //   text: this.response.data.message,
         //   icon: 'warning',
         //   confirmButtonText: 'Ok',
         // });
        }
      });
  }

  addchatmsg(data: any) {   
    
    this.httpclient
      .post(environment.apiBaseUrl + 'addfriendchatmsg', [
        {
          api_key: environment.apikey,

          visitor_friends_id: this.visitor_friends_id,
          visitor_id: this.visitor_id,
          chatmsg: data.value.chatmsg,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          // Swal.fire({
          //   title: 'Success',
          //   text: this.response.data.message,
          //   icon: 'success',
          //   confirmButtonText: 'Ok',
          // }).then(() => {
          //   location.reload(); 
          // //  this.router.navigate(['/friendschat']);
          // });
          location.reload();

        } else if (this.response.success == false) {
        //  Swal.fire({
        //    title: 'Oops...',
        //    text: this.response.data.message,
        //    icon: 'warning',
        //    confirmButtonText: 'Ok',
        //  });
        }
      });
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

}
