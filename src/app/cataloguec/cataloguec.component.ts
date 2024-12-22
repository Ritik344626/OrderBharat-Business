import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';

//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import { environment } from '../../environments/environment';




//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
//import { environment } from "../../environments/environment";

import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cataloguec',
  templateUrl: './cataloguec.component.html',
  styleUrls: ['./cataloguec.component.scss'],
})
export class CataloguecComponent implements OnInit {

  //iscart: boolean=false;
 // tcart: number;
     upload:any=false;
     isModalOpen = false;
 selectedFile: any;
 uploadProgress: any;
token_key:any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    public loadingController: LoadingController
  ) {
 this.getKey();
  }
  async getKey()
{
 // this.token_key=await   this.Token.getApiKey();
 this.token_key='$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO';
}
  user_id: any = localStorage.getItem('user_id');
  company_id: any = localStorage.getItem('company_id');
  businessdetails: any = [];
  userdetails: any = [];
  likenumber: any = [];
  products: any;
  response: any;
  auth: any = false;
  upload_id:any;
  api_key:any;

  customer_id: any = 0;
  cartdata: any;
  tmp_cartdata: any = {};
  customerdata: any;
  totalamount: any = 0;
  quantity: any = 0;


  ngOnInit(): void {  
   // this.getproductdetails();
//    this.getshopdetails();
   // this.getlikenumber();
  }

   productview(id: any) {
    localStorage.setItem('product_id', id);
    this.router.navigate(['/productview']);
  }

  // share() {
  //   SocialSharing.share(
  //     this.businessdetails.name,
  //     'Order Bharat Business ' + this.businessdetails.name,
  //     '',
  //     'https://gbosss.com/storepage?store=' + this.userdetails.api_key
  //   );
    
  // }


  async presentLoading1(base64String: any) {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    let formData = new FormData();
    this.Token.getApiKey().then((apiKey) => {
      this.httpclient
        .post(environment.apiBaseUrl + "uploadofferimage", [
          {
            api_key: apiKey,
            base64image: base64String,
            user_id: this.user_id,
            company_id: this.company_id,
           // product_id: this.product_id,
          },
        ])
        .subscribe(
          (res: any) => {
            this.response = res;
            this.upload = true;
            if (this.response.success == true) {
              // this.category = this.response.data.category;
              console.log(this.response.data);
              this.upload = true;
              this.isModalOpen = false;
            } else if (this.response.success == false) {
            }

            loading.dismiss();
          },
          (error) => {
            loading.dismiss();
          }
        );
    });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();

    if (this.selectedFile) {
      //     this.user_id = localStorage.getItem('user_id');
      // this.company_id = localStorage.getItem('company_id');
      // this.customer_id = localStorage.getItem('order_user_id');

      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("api_key", this.token_key);
      //  formData.append('user_id', this.user_id);
      // formData.append('company_id', this.company_id);
      // formData.append('customer_id', this.customer_id);

      this.httpclient
        .post(environment.apiBaseUrl + "uploadofferFile", formData, {
          reportProgress: true,
          observe: "events",
        })
        .subscribe(
          (event) => {
            if (event.type === 1) {
              if (event.total) {
                this.uploadProgress = Math.round(
                  (100 * event.loaded) / event.total
                );
              }
            } else if (event.type === 4) {
              console.log("File uploaded successfully:", event.body);
              loading.dismiss(); // Dismiss the loader after API response
              this.upload = true;
              this.isModalOpen = false;
              var re: any = event.body;
              this.upload_id = re.data.id;
              localStorage.setItem("upload_id", this.upload_id);
              this.upload_id = localStorage.getItem("upload_id");
              this.uploadstatusproductimage();
            }
          },
          (error) => {
            loading.dismiss(); // Dismiss the loader in case of an error
            console.error("Error uploading file:", error);
          }
        );
    } else {
      loading.dismiss(); // Dismiss the loader if no file is selected
      console.error("No file selected.");
    }
  }
  // token_key(arg0: string, token_key: any) {
  //   throw new Error('Method not implemented.');
  // }

  uploadstatusproductimage() {
    const formData = new FormData();
    formData.append("api_key", this.token_key);
    formData.append("company_id", this.company_id);
    formData.append("upload_id", this.upload_id);
    //formData.append("product_id", this.product_id);
    this.httpclient;
    // .post(environment.apiBaseUrl  + 'updateFileuploaddata', [
    //   {
    //     api_key: this.Token.apikey(),
    //  //  user_id: this.user_id,
    //     company_id: this.company_id,
    //   //  customer_id: this.customer_id,
    // //  company_id: this.vendor_id,
    //   //  customer_id: this.visitor_id,
    //     upload_id: this.upload_id
    //   },
    // ])

    this.httpclient
      .post(environment.apiBaseUrl + "offerdataupdate", formData, {
        reportProgress: true,
        observe: "events",
      })

      .subscribe((res: any) => {
        this.response = res;

        if (this.response.body && this.response.body.success == true) {
          //this.businessdetails = this.response.data.businessdetails;
          console.log("upload success:  ::::",this.response);

       

        }  else if (this.response.success == false) {
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }
}





