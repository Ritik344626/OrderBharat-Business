import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-editbank',
  templateUrl: './editbank.component.html',
  styleUrls: ['./editbank.component.scss'],
})
export class EditbankComponent implements OnInit {
  auth: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  accountname: any;
  accountnumbar: any;
  ifccode: any;
  opening_balance: any;
  bank_name: any;
  branch_area: any;
  bank_address: any;
  accounttype: any = 0;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  stateslistdata: any;
  bankdata: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
  }
  
  // searchifccode(data: any) {
//     var ifsc = require('ifsc');

// ifsc.validate('KKBK0000261'); // returns true
// ifsc.validate('BOTM0XEEMRA'); // returns false

// ifsc.fetchDetails('KKBK0000261').then(function(res) {
//    console.log(res);
// });

// console.log(ifsc.bank.PUNB); 

// prints PUNB
// Prints the entire JSON from https://ifsc.razorpay.com/KKBK0000261
// res is an object, not string
  //   this.httpclient
  //     .post(environment.apiBaseUrl + 'ch', [
  //       {
  //         api_key: environment.apikey,
  //         user_id: this.user_id,
  //       },
  //     ])
  //     .subscribe((res: any) => {
  //       this.response = res;
  //       console.log(this.response);
  //       if (this.response == 1) {
  //         this.auth = true;
  //       } else if (this.response == 0) {
  //         this.auth = false;
  //         Swal.fire({
  //           title: 'Oops...',
  //           text: 'Service not available!',
  //           icon: 'warning',
  //           confirmButtonText: 'Ok',
  //         });
  //       }
  //     });
  // }
  
  submitquery() {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'editbusinessbank', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,       
          accountname: this.accountname,
          ifccode: this.ifccode,
          opening_balance: this.opening_balance,
          accountnumbar: this.accountnumbar,
          accounttype: this.accounttype,
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
            this.bank_name = this.response.data.bank_name;
            this.branch_area = this.response.data.branch_area;
            this.bank_address = this.response.data.bank_address;
            // this.router.navigate(['/editprofile']);
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
