import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
declare var $: any;
////import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-adsaddimageupload',
  templateUrl: './adsaddimageupload.component.html',
  styleUrls: ['./adsaddimageupload.component.scss'],
})
export class AdsaddimageuploadComponent implements OnInit {

 

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}


  adsin: any = '1';
  adsinv1: any;
  adsinv2: any;
  adsinv3: any;
  adsinv4: any;

  adsinv: boolean = false;
  ads_name: any;
  response: any;
  user_id: any;
  company_id: any; 
  gstregtype: any = '';
  stateslistdata: any;
  topcategorylistdata: any;
  reffer_id: any;
  value: any;
  app_ads_id:any;
  shopname: any;
  shopphone: any;
  appsname: any;
  appslink: any;

  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = [];
  bankdetails: any = [];
  otherdata: any = [];
  image: any;
  base64File1: any = null;
  base64File2: any = null;
  base64File3: any = null;

  name: any;
  phone: any;
  email: any;
  gstin: any;
  street: any;
  city: any;
  state: any;
  zip_code: any;
  country: any;
  start_date: any;
  end_date: any;
  location_km: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.app_ads_id=localStorage.getItem('app_ads_id');
    this.getprofiledetail();
    this.getshopdetails();
    this.getadsdetails();
  }


 getprofiledetail() {
   console.log(this.company_id);
  this.httpclient
    .post(environment.apiBaseUrl + 'getprofiledetail', [
      {
        api_key: environment.apikey,
        user_id: this.user_id,
        company_id: this.company_id,
      },
    ])
    .subscribe((res: any) => {
      this.response = res;

      if (this.response.success == true) {
        this.profiledata = this.response.data.profiledata;
        this.imagedata = this.response.data.imagedata;

        if (this.profiledata.name != 0) {
          this.name = this.profiledata.name;
        } else {
          this.name = null;
        }

        if (this.profiledata.phone != 0) {
          this.phone = this.profiledata.phone;
        } else {
          this.phone = null;
        }

        if (this.profiledata.email != 0) {
          this.email = this.profiledata.email;
        } else {
          this.email = null;
        }

        if (this.profiledata.gstin != 0) {
          this.gstin = this.profiledata.gstin;
        } else {
          this.gstin = null;
        }

        if (this.profiledata.state != 0) {
          this.state = this.profiledata.state;
        } else {
          this.state = null;
        }

        if (this.profiledata.street != 0) {
          this.street = this.profiledata.street;
        } else {
          this.street = null;
        }

        if (this.profiledata.city != 0) {
          this.city = this.profiledata.city;
        } else {
          this.city = null;
        }

        if (this.profiledata.zip_code != 0) {
          this.zip_code = this.profiledata.zip_code;
        } else {
          this.zip_code = null;
        }

        if (this.profiledata.country != 0) {
          this.country = this.profiledata.country;
        } else {
          this.country = null;
        }

        if (this.imagedata != null) {
          this.image =
            'https://gbosss.com/assets/images/business/' +
            this.imagedata.image;
        } else {
          this.image = 'assets/images/demo.jpg';
        }
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

getshopdetails() {
  this.httpclient
    .post(environment.apiBaseUrl + 'getshopdetails', [
      {
        api_key: environment.apikey,
        user_id: this.user_id,
        company_id: this.company_id,
      },
    ])
    .subscribe((res: any) => {
      this.response = res;

      if (this.response.success == true) {
        this.otherdata = this.response.data;
        this.businessdetails = this.response.data.businessdetails;
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

// chooseimage1() {
//   Chooser
//     .getFiles('image/*')
//     .then((file:any) => {
//       this.base64File1 = file.dataURI;
//       $('#uploadbtn').css('display', 'block');
//     })
//     .catch((error: any) => console.error(error));
// }
// chooseimage2() {
//   Chooser
//     .getFiles('image/*')
//     .then((file:any) => {
//       this.base64File2 = file.dataURI;
//       $('#uploadbtn').css('display', 'block');
//     })
//     .catch((error: any) => console.error(error));
// }
// chooseimage3() {
//   Chooser
//     .getFiles('image/*')
//     .then((file: any) => {
//       this.base64File3 = file.dataURI;
//       $('#uploadbtn').css('display', 'block');
//     })
//     .catch((error: any) => console.error(error));
// }
productdata: any = [];
getadsdetails() {
  this.httpclient
    .post(environment.apiBaseUrl + 'getadsdetail', [
      {
        api_key: environment.apikey,
        user_id: this.user_id,
        company_id: this.company_id,
        app_ads_id: this.app_ads_id,
       
      },
    ])
    .subscribe((res: any) => {
      this.response = res;

      if (this.response.success == true) {
        this.productdata = this.response.data.adslist[0];
  this.ads_name=this.productdata.add_name;
        if (this.productdata.banner_image_id) {
          this.base64File1 =
            'https://gbosss.com/assets/images/businessads/' +
            this.productdata.banner_image_id;
        } else if (!this.productdata.banner_image_id) {
          this.base64File1 = 'assets/images/demo.jpg';
        }
        if (this.productdata.enquiry_image_id) {
          this.base64File2 =
            'https://gbosss.com/assets/images/businessads/' +
            this.productdata.enquiry_image_id;
        } else if (!this.productdata.enquiry_image_id) {
          this.base64File2 = 'assets/images/demo.jpg';
        }
        if (this.productdata.add_image) {
          this.base64File3 =
            'https://gbosss.com/assets/images/businessads/' +
            this.productdata.add_image;
        } else if (!this.productdata.add_image) {
          this.base64File3 = 'assets/images/demo.jpg';
        }
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
    submitquery() {    
      this.httpclient
        .post(environment.apiBaseUrl + 'uploadadsimg', [
          { api_key: environment.apikey, 
            user_id: this.user_id,
            ads_name:this.ads_name,
            company_id: this.company_id,
            app_ads_id: this.app_ads_id,
            banner_image_id: this.base64File1,
            enquiry_image_id: this.base64File2,
            add_image: this.base64File3,
           
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {  
            Swal.fire({
              title: 'Success',
              text: 'Banner Uploaded',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigate(['/appads']);
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
