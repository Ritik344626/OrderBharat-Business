import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {


  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}
  user_id: any = localStorage.getItem('user_id');
  company_id: any = localStorage.getItem('company_id');
  businessquery: any;
  response: any;


  ngOnInit(): void {

    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getallbusinessquery', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
           console.log(this.response.data.businessquery);
          this.businessquery = this.response.data.businessquery;
          
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
