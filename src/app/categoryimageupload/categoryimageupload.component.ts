import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

import { environment } from "../../environments/environment";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { LoadingController } from "@ionic/angular";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-categoryimageupload',
  templateUrl: './categoryimageupload.component.html',
  styleUrls: ['./categoryimageupload.component.scss'],
})
export class CategoryimageuploadComponent  implements OnInit {

  name: any;
  category_id: any;
  categorydata: any;
  image: string;
  upload: any = false;
  isModalOpen = false;
  selectedFile: any;
  uploadProgress: any;
  token_key: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.getKey();
  }

  async getKey() {
    // this.token_key=await   this.Token.getApiKey();
    this.token_key =
      "$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO";
  }


  businessname: any;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  businessdetails: any = [];
  loaded = false;
  auth: any = false;
  upload_id: any;
  api_key: any;


  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');  
    this.category_id = localStorage.getItem('category_id');  
      this.getcategorydetails();
  }
  // submitquery(data: any) {
  //   console.log(this.user_id);
  //   this.httpclient
  //     .post(environment.apiBaseUrl + 'editcategoryname', [
  //       {
  //         api_key: environment.apikey,
  //         category_id: this.category_id,
  //       //  company_id: this.company_id,       
  //         categoryname: data.value.categoryname,
  //       },
  //     ])
  //     .subscribe((res: any) => {
  //       this.response = res;

  //       if (this.response.success == true) {
  //         Swal.fire({
  //           title: 'Success',
  //           text: this.response.data.message,
  //           icon: 'success',
  //           confirmButtonText: 'Ok',
  //         }).then(() => {
  //           this.router.navigate(['/categorylist']);
  //         });
  //       } else if (this.response.success == false) {
  //         Swal.fire({
  //           title: 'Oops...',
  //           text: this.response.data.message,
  //           icon: 'warning',
  //           confirmButtonText: 'Ok',
  //         });
  //       }
  //     });
  // }

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
        this.loaded = true;
        if (this.response.success == true) {
       //   this.otherdata = this.response.data;
          this.categorydata = this.response.data.categorydata;



          if (this.categorydata[0].image_name != null) {
            this.image =
              "https://gbosss.com/assets/images/gallery/" +
              this.categorydata[0].image_name;
          } else {
            this.image = "assets/images/demo.jpg";
          }
          
        //  console.log(this.categorydata[0].category_name);

        //   if (this.categorydata[0].category_name != 0) {
        //     this.name = this.categorydata[0].category_name;
        //   } else {
        //     this.name = null;
        //   }

        //   console.log(this.name);

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


  async presentLoading1(base64String: any) {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    let formData = new FormData();
    this.Token.getApiKey().then((apiKey) => {
      this.httpclient
        .post(environment.apiBaseUrl + "uploadstatusproductimage", [
          {
            api_key: apiKey,
            base64image: base64String,
            user_id: this.user_id,
            company_id: this.company_id,
            category_id: this.category_id,
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
        .post(environment.apiBaseUrl + "uploadCategory", formData, {
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
    formData.append("category_id", this.category_id);
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
      .post(environment.apiBaseUrl + "uploadstatuscategoryimage", formData, {
        reportProgress: true,
        observe: "events",
      })

      .subscribe((res: any) => {
        this.response = res;

        if (this.response.body && this.response.body.success == true) {
          //this.businessdetails = this.response.data.businessdetails;
          console.log("upload success:  ::::",this.response);

         // this.getproductdetail();
         // this.getshopdetails();

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
