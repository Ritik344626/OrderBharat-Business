import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
//import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';

@Component({
  selector: 'app-postsadd',
  templateUrl: './postsadd.component.html',
  styleUrls: ['./postsadd.component.scss'],
})
export class PostsaddComponent implements OnInit {

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }
  response: any;
  productdata: any = [];
  user_id: any;
  company_id: any;
  product_id: any;

  base64File: any = null;
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.product_id = localStorage.getItem('product_id');

  //  this.getproductdetail();
  }

  // getproductdetail() {
  //   this.httpclient
  //     .post(environment.apiBaseUrl + 'getproductdetail', [
  //       {
  //         api_key: environment.apikey,
  //         user_id: this.user_id,
  //         company_id: this.company_id,
  //         product_id: this.product_id,
  //       },
  //     ])
  //     .subscribe((res: any) => {
  //       this.response = res;

  //       if (this.response.success == true) {
  //         this.productdata = this.response.data.productdata;

  //         if (this.productdata.image) {
  //           this.base64File =
  //             'https://gbosss.com/assets/images/gallery/' +
  //             this.productdata.image;
  //         } else if (!this.productdata.image) {
  //           this.base64File = 'assets/images/demo.jpg';
  //         }
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

  // chooseimage() {
  //   this.chooser
  //     .getFile('image/*')
  //     .then((file) => {
  //       this.base64File = file.dataURI;
  //       $('#uploadbtn').css('display', 'block');
  //     })
  //     .catch((error: any) => console.error(error));
  // }

  // uploadimage() {
  //   this.httpclient
  //     .post(environment.apiBaseUrl + 'uploadproductimg', [
  //       {
  //         api_key: environment.apikey,
  //         user_id: this.user_id,
  //         company_id: this.company_id,
  //         product_id: this.product_id,
  //         product_img: this.base64File,
  //       },
  //     ])
  //     .subscribe((res: any) => {
  //       this.response = res;

  //       if (this.response.success == true) {
  //         $('#uploadbtn').css('display', 'none');

  //         Swal.fire({
  //           title: 'Success',
  //           text: this.response.data.message,
  //           icon: 'success',
  //           confirmButtonText: 'Ok',
  //         }).then(() => {
  //           this.router.navigate(['/products']);
  //         });
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

  // chats() {
  //   this.router.navigate(['/chats']);
  // }

  // friends() {
  //   this.router.navigate(['/friends']);
  // }

  // invite() {
  //   this.router.navigate(['/invite']);
  // }
  posts() {
    this.router.navigate(['/posts']);
  }
  // invitepending() {
  //   this.router.navigate(['/invitepending']);
  // }

 
}
