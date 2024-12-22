import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-yougot',
  templateUrl: './yougot.component.html',
  styleUrls: ['./yougot.component.scss'],
})
export class YougotComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  user_id: any;
  company_id: any;
  stateslistdata: any;
  yougottype: any = 0;
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

  addyougot(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'addyougot', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
          amount: data.value.amount,
          note: data.value.note,
          type: data.value.type,
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
