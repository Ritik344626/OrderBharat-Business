import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-chatdetails',
  templateUrl: './chatdetails.component.html',
  styleUrls: ['./chatdetails.component.scss'],
})
export class ChatdetailsComponent implements OnInit {

 // company_id: any = localStorage.getItem('company_id');
 user_id: any;
 company_id: any;
  visitorfrienddata: any = [];
  massagedata: any; 
  response: any;
  visitor_id: any;
 // vendor_id: any; 

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }

//  user_id: any;


  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id'); 
    this.visitor_id= localStorage.getItem('visitor_id');    
    this.getfrienddetail();
    this.getallvisitormassage();
  }
  getfrienddetail() {
    console.log(this.visitor_id);   

    this.httpclient
      .post(environment.apiBaseUrl + 'getfrienddetail', [
        {
          api_key: environment.apikey,
        //  company_id: this.company_id,
          visitor_id: this.visitor_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
       //   this.otherdata = this.response.data;
          this.visitorfrienddata = this.response.data.visitorfrienddata;
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

  getallvisitormassage() {

    console.log(this.company_id);
    console.log(this.visitor_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getallvisitormassage', [
        {
          api_key: environment.apikey,
          company_id: this.company_id,
          visitor_id: this.visitor_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          console.log(this.company_id);
          this.company_id=this.company_id,
          this.massagedata = this.response.data.massagedata;
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

  addchatmsg(data: any) {   
    
    this.httpclient
      .post(environment.apiBaseUrl + 'addchatmsg', [
        {
          api_key: environment.apikey,

          company_id: this.company_id,
          visitor_id: this.visitor_id,
          chatmsg: data.value.chatmsg,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
        //  Swal.fire({
        //    title: 'Success',
        //    text: this.response.data.message,
         //   icon: 'success',
         //   confirmButtonText: 'Ok',
        //  })
         // .then(() => {
        //    location.reload(); 
           // this.router.navigate(['/chatdetails']);
        //  });
       this.router.navigate(['/chatdetails']);
          location.reload();
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



  chatblock(visitor_id: any) {
    console.log (visitor_id);
    console.log (this.company_id);        
    this.httpclient
    .post(environment.apiBaseUrl + 'chatblock', [
      {      
        api_key: environment.apikey,
        visitor_id: visitor_id,
        company_id: this.company_id,
      },
    ])
    .subscribe((res: any) => {
      this.response = res;
      if (this.response.success == true) {
      this.router.navigate(['/chats']);      
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

   chatreport(visitor_id: any) {
    console.log (visitor_id);        
    this.httpclient
    .post(environment.apiBaseUrl + 'chatreport', [
      {      
        api_key: environment.apikey,
        visitor_id: visitor_id,
        company_id: this.company_id,
      },
    ])
    .subscribe((res: any) => {
      this.response = res;
      if (this.response.success == true) {
      this.router.navigate(['/chats']);      
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

}
