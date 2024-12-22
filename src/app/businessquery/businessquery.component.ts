import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-businessquery',
  templateUrl: './businessquery.component.html',
  styleUrls: ['./businessquery.component.scss'],
})
export class BusinessqueryComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  querymsg: any;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.business_info_category_id = localStorage.getItem(
      'business_info_category_id'
    );
    this.business_details_id = localStorage.getItem('business_details_id');
  }

  submitquery() {
    this.httpclient
      .post(environment.apiBaseUrl + 'addbusinessquery', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          business_info_category_id: this.business_info_category_id,
          business_details_id: this.business_details_id,
          querymsg: this.querymsg,
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
            this.router.navigate(['/business']);
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
