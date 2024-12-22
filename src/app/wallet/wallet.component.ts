import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  user_id: any;
  company_id: any;
  sales_id: any;
  response: any;
  wallet: any;
  isw: any;
  wallet_data: any = [];

   constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}


  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.sales_id = localStorage.getItem('sales_id');   
this.httpclient
      .post(environment.apiBaseUrl + 'getshopdetails', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          //    customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        if (res && res.data.userdetails) {
          this.response = res;
          this.isw = true;
          this.wallet = res.data.userdetails.wallet_money;
          if (parseInt(res.data.userdetails.wallet_money) > 1) {
            this.isw = false;
          }
        }      
    
      });
    this.httpclient
      .post(environment.apiBaseUrl + 'wallet_history', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          //    customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        if (res && res.data.length) {
          this.response = res;
          this.isw = true;
          this.wallet_data = this.response.data;
        }
        
        
    
      });
  }

  addwallet() {
     this.router.navigate(['/addwallet']);
  }

}
