import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-editbusinessname',
  templateUrl: './editbusinessname.component.html',
  styleUrls: ['./editbusinessname.component.scss'],
})
export class EditbusinessnameComponent implements OnInit {
  name: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  businessname: any;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  businessdetails: any = [];

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');  
      this.getshopdetails();
  }
  submitquery(data: any) {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'editbusinessname', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,       
          businessname: data.value.businessname,
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

          if (this.businessdetails.name != 0) {
            this.name = this.businessdetails.name;
          } else {
            this.name = null;
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
