import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}
  user_id: any = localStorage.getItem('user_id');
  company_id: any = localStorage.getItem('company_id');
  notifactiondata: any;
  response: any;


  ngOnInit(): void {

    console.log(this.company_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getnotification', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.notifactiondata = this.response.data.notifactiondata;
        } else if (this.response.success == false) {
          // Swal.fire({
          //   title: 'Oops...',
          //   text: this.response.data.message,
          //   icon: 'warning',
          //   confirmButtonText: 'Ok',
          // });
        }
      });
  }


}
