import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-yougive',
  templateUrl: './yougive.component.html',
  styleUrls: ['./yougive.component.scss'],
})
export class YougiveComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  user_id: any;
  company_id: any;
  stateslistdata: any;
  yougivetype: any = 0;
  customer_id: any = [];
  customerdata: any = [];

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.customer_id = localStorage.getItem('customer_id');
    this.getcustomerdetails();
  }

  getcustomerdetails() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getcustomerdetail', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.customerdata = this.response.data.customerdata;
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

  addyoupay(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'addyoupay', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
          amount: data.value.amount,
          type: data.value.yougivetype,
          note: data.value.note,
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
            this.router.navigate(['/customer']);
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
