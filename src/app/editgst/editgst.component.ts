import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-editgst',
  templateUrl: './editgst.component.html',
  styleUrls: ['./editgst.component.scss'],
})
export class EditgstComponent implements OnInit {
  

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  businessgst: any;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  businessdetails: any = [];
  gstin: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id'); 
    this.getshopdetails();    
  }
  submitquery(data: any) {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'editbusinessgst', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,       
          businessgst: data.value.businessgst,
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
            this.router.navigate(['/editprofile']);
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
       //   this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;

          if (this.businessdetails.gstin != 0) {
            this.gstin = this.businessdetails.gstin;
          } else {
            this.gstin = null;
          }
        //  this.bankdetails = this.response.data.bankdetails;
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