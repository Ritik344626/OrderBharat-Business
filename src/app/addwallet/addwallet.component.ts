import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-addwallet',
  templateUrl: './addwallet.component.html',
  styleUrls: ['./addwallet.component.scss'],
})
export class AddwalletComponent implements OnInit {
  response: any;

  user_id: any = localStorage.getItem('user_id');
  company_id = localStorage.getItem('company_id');
  addwal: any;
  isdes: any;
  orderid: any;
  version: any;
  xclientid: any;
  xclientsecret: any;
  upi: any='testsuccess@gocash';
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}
  amount: any=10;
  ngOnInit() {}
  addwallet() {
      this.httpclient
      .post(environment.apiBaseUrl + 'cashfreeordercreate', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          upi: this.upi,
          amount:this.amount
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        if (this.response.status == true) {
          this.orderid = this.response.order_id;
          this.version = this.response.version;
          this.xclientid = this.response.xclientid;
           this.xclientsecret=this.response.xclientsecret;
          window.location.href = this.response.url;

                          let myVar = setInterval(() => {
                  console.log('bop');

                  this.httpclient
                    .post(
                      'https://sandbox.cashfree.com/pg/orders/'+this.orderid,
                      {
                        body: {
                          order_id: this.orderid,
                        },
                        head: { 'x-client-id': this.xclientid, 'x-client-secret': this.xclientsecret,'x-api-version':this.version },
                      }
                    )
                    .subscribe((res: any) => {
                      this.response = res;
                      console.log(this.response);
                      if (
                        this.response.body.resultInfo.resultStatus == 'F' &&
                        this.response.body.resultInfo.resultCode == '227'
                      ) {
                        $('#addwallt').css('color', 'red');
                        this.addwal = 'Transaction Fail! Try again';
                        this.isdes = false;
                        Swal.fire({
                          title: 'Warning',
                          text: this.response.body.resultInfo.resultMsg,
                          icon: 'warning',
                          confirmButtonText: 'Ok',
                        });
                        clearInterval(myVar);
                      } else if (
                        this.response.body.resultInfo.resultStatus == 'S'
                      ) {
                        this.addwal = '';
                        this.isdes = false;
                         this.httpclient.post(environment.apiBaseUrl + 'updateorderstatuscashfree',
                            {
                              STATUS: this.response.order_status,
                              orderid: this.orderid,
                              user_id: this.user_id,
                              company_id: this.company_id,
                              amount: this.amount,
                              type:1
                            }
                          )
                          .subscribe((res: any) => {});
                        clearInterval(myVar);
                        Swal.fire({
                          title: 'Success',
                          text: this.response.body.resultInfo.resultMsg,
                          icon: 'success',
                          confirmButtonText: 'Ok',
                        }).then(() => {
                          this.router.navigate(['/enterwallet']);
                        });
                      }
                    });
                }, 10000);
        }
      });
}
}
