import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {


  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}


  gstin: any = '2';
  isreg: boolean = false;
  gstnumber: any;
  businesscategory: any = '';
  businesstype: any = '';
  topbusinesscategory: any;


  businessestreet: any;
  pincode: any;
  state: any;
  city_id: any = '';
  response: any;
  user_id: any;
  company_id: any; 
  gstregtype: any = '';
  stateslistdata: any;
  topcategorylistdata: any;
  reffer_id: any;
  value: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');

    this.getallStates();
    this.cityalltopcategorylist();
  }

  chkgstin() {
    if(this.gstin == 1){
      this.isreg = true;
    } else if(this.gstin == 2){
      this.isreg = false;
    }
  }

  onItemChange(value: any){
    console.log(" Value is : ", value );
 }



  getallStates() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getallStates', [
        {
          api_key: environment.apikey,
        },
      ])
      .subscribe((res: any) => {
        this.stateslistdata = res.data;
      });
  }


  cityalltopcategorylist() {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'getalltopcategory', [
        {
          api_key: environment.apikey,
        },
      ])
      .subscribe((res: any) => {
        console.log(res.data);
        this.topcategorylistdata = res.data;
      });
  }

    submitquery() {    
      this.httpclient
        .post(environment.apiBaseUrl + 'updatedetailsstep2', [
          { api_key: environment.apikey, 
            user_id: this.user_id,
            company_id: this.company_id,
            gstnumber: this.gstnumber,
            businesscategory: this.businesscategory,
            businesstype: this.businesstype,
            topbusinesscategory: this.topbusinesscategory,
            gstregtype: this.gstregtype,
            reffer_id: this.reffer_id,
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {           
            this.router.navigate(['/home']);
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
