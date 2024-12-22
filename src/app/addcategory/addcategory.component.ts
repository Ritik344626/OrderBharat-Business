import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss'],
})
export class AddcategoryComponent implements OnInit {

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
  ) { }

  response: any;
//  barcodetext: any = null;
  user_id: any;
  company_id: any;
  producttype: any = '';
  online_price: any;
  catenm: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
  }


  submitquery(data: any) {
    console.log(this.user_id);
    console.log(this.company_id);
    console.log(this.catenm);
    this.httpclient
      .post(environment.apiBaseUrl + 'addcategory', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          catenm: data.value.catenm         
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
            this.router.navigate(['/products']);
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
