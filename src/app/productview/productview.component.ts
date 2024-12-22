import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import { environment } from "../../environments/environment";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { LoadingController } from "@ionic/angular";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-productview",
  templateUrl: "./productview.component.html",
  styleUrls: ["./productview.component.scss"],
})
export class ProductviewComponent implements OnInit {
  businessdetails: any;
  users: any;
  // loadingController: any;

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

  response: any;
  productdata: any = {};
  user_id: any;
  company_id: any;
  product_id: any;

  name: any;
  prdctdetails: any;
  price: any;
  mrp_rate: any;
  online_price: any;
  image: any;
  status: any;
  auth: any = false;
  upload_id: any;
  api_key: any;

  //loader indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.product_id = localStorage.getItem("product_id");

    this.getproductdetail();
    this.getshopdetails();
  }

  getproductdetail() {
    this.httpclient
      .post(environment.apiBaseUrl + "getproductdetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          product_id: this.product_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.productdata = this.response.data.productdata;

          if (this.productdata.name != 0) {
            this.name = this.productdata.name;
          } else {
            this.name = null;
          }

          console.log(this.productdata.description );
          if (this.productdata.description != 0) {
            this.prdctdetails = this.productdata.description;
          } else {
            this.prdctdetails = null;
          }

          if (this.productdata.price != 0) {
            this.price = this.productdata.price;
          } else {
            this.price = null;
          }

          if (this.productdata.online_price != 0) {
            this.online_price = this.productdata.online_price;
          } else {
            this.online_price = null;
          }

          if (this.productdata.mrp_rate != 0) {
            this.mrp_rate = this.productdata.mrp_rate;
          } else {
            this.mrp_rate = null;
          }

          if (this.productdata.image != null) {
            this.image =
              "https://gbosss.com/assets/order_bharat/" +
              this.productdata.image;
          } else {
            this.image = "assets/images/demo.jpg";
          }

          this.status = this.productdata.status;
        } else if (this.response.success == false) {
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }

  activedeactiveproduct(status: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "activedeactiveproduct", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          product_id: this.product_id,
          status: status,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          Swal.fire({
            title: "Success",
            text: this.response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          });

          if (status == 0) {
            this.status = 0;
          } else {
            this.status = 1;
          }
        } else if (this.response.success == false) {
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }

  editproduct() {
    localStorage.setItem("product_id", this.product_id);
    this.router.navigate(["/editproduct"]);
  }

  
  getshopdetails() {
    this.httpclient
      .post(environment.apiBaseUrl + "getshopdetails", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.businessdetails = this.response.data.businessdetails;
          console.log(this.businessdetails);
          this.users = this.response.data.users;

          console.log(this.users);
        } else if (this.response.success == false) {
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }

  // share() {
  //   SocialSharing.share(
  //     'Shop name: '+this.businessdetails.name+' Product name: ' + this.name+'. ',
  //     '',
  //     '',
  //     'https://gbosss.com/storepage?store=' +
  //     this.users.api_key +
  //       '&route=product&path=' +
  //       this.product_id
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
        .post(environment.apiBaseUrl + "uploadstatusproductimage", [
          {
            api_key: apiKey,
            base64image: base64String,
            user_id: this.user_id,
            company_id: this.company_id,
            product_id: this.product_id,
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
        .post(environment.apiBaseUrl + "uploadFileSlip", formData, {
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
    formData.append("product_id", this.product_id);
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
      .post(environment.apiBaseUrl + "uploadstatusproductimage", formData, {
        reportProgress: true,
        observe: "events",
      })

      .subscribe((res: any) => {
        this.response = res;

        if (this.response.body && this.response.body.success == true) {
          //this.businessdetails = this.response.data.businessdetails;
          console.log("upload success:  ::::",this.response);

          this.getproductdetail();
          this.getshopdetails();

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

//https://gbosss.com/storepage?store=f60c27f8be16241bcc1cb6b57c371d97&route=product&path=2414
