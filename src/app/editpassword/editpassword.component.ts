import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.scss'],
})
export class EditpasswordComponent implements OnInit {

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  password: any;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');   
  }
  submitquery() {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'editpassword', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,       
          password: this.password,
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
}