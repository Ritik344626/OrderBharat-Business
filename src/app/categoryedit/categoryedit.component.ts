import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-categoryedit',
  templateUrl: './categoryedit.component.html',
  styleUrls: ['./categoryedit.component.scss'],
})
export class CategoryeditComponent  implements OnInit {

  name: any;
  category_id: string | null;
  categorydata: any;

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
    this.category_id = localStorage.getItem('category_id');  
      this.getcategorydetails();
  }
  submitquery(data: any) {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'editcategoryname', [
        {
          api_key: environment.apikey,
          category_id: this.category_id,
        //  company_id: this.company_id,       
          categoryname: data.value.categoryname,
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
            this.router.navigate(['/categorylist']);
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

  getcategorydetails() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getcategorydetails', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          category_id: this.category_id
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
       //   this.otherdata = this.response.data;
          this.categorydata = this.response.data.categorydata;

         console.log(this.categorydata[0].category_name);

          if (this.categorydata[0].category_name != 0) {
            this.name = this.categorydata[0].category_name;
          } else {
            this.name = null;
          }

          console.log(this.name);

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
