import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';
import { environment } from "../../environments/environment";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { LoadingController } from "@ionic/angular";
import { DatePipe } from "@angular/common";

declare var $: any;

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"],
})
export class EditprofileComponent implements OnInit {
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
  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = [];
  otherdata: any = {};
  image: any;
  user_id: any;
  company_id: any;

  base64File: any = null;

  name: any;
  phone: any;
  email: any;
  gstin: any;
  street: any;
  city: any;
  state: any;
  zip_code: any;
  country: any;
  auth: any = false;
  upload_id: any;
  api_key: any;

  //loaded indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");

    this.getprofiledetail();
    this.getshopdetails();
  }

  getprofiledetail() {
    this.httpclient
      .post(environment.apiBaseUrl + "getprofiledetail", [
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
              "https://gbosss.com/assets/order_bharat/" + this.imagedata.image;
          } else {
            this.image = "assets/images/demo.jpg";
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

  // chooseimage() {
  //   Chooser
  //     .getFiles('image/*')
  //     .then((file: any) => {
  //       this.base64File = file.dataURI;
  //       this.image = file.dataURI;
  //       $('#uploadbtn').css('display', 'block');
  //       this.uploadimage();
  //     })
  //     .catch((error: any) => console.error(error));
  // }

  uploadimage() {
    $("#uploadbtn").css("display", "none");
    this.httpclient
      .post(environment.apiBaseUrl + "uploadprofileimg", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          image: this.base64File,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          $("#uploadbtn").css("display", "none");

          Swal.fire({
            title: "Success",
            text: this.response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
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

  editprofiledetail(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "editprofiledetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          name: data.value.name,
          phone: data.value.phone,
          email: data.value.email,
          image: this.base64File,
          gstin: data.value.gstin,
          street: data.value.street,
          city: data.value.city,
          state: data.value.state,
          zip_code: data.value.zip_code,
          country: data.value.country,
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
          }).then(() => {
            this.router.navigate(["/home"]);
          });
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
        this.loaded = true;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;
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

  scannapp() {
    this.router.navigate(["/scannapp"]);
  }

  editprofile() {
    this.router.navigate(["/editprofile"]);
  }
  ///////////////////////////////////////////
  editname() {
    this.router.navigate(["/editname"]);
  }

  editphone() {
    this.router.navigate(["/editphone"]);
  }

  editemail() {
    this.router.navigate(["/editemail"]);
  }

  editaddress() {
    this.router.navigate(["/editaddress"]);
  }

  editpincode() {
    this.router.navigate(["/editpincode"]);
  }

  editgender() {
    this.router.navigate(["/editgender"]);
  }

  editinterested() {
    this.router.navigate(["/editinterested"]);
  }
  editshortinfo() {
    this.router.navigate(["/editshortinfo"]);
  }
  editaboutme() {
    this.router.navigate(["/editaboutme"]);
  }

  editlist() {
    this.router.navigate(["/editlist"]);
  }

  async takePicturePhoto() {
    const image = await Camera.getPhoto({
      quality: 50,
      source: CameraSource.Photos,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    var stringLength = image.base64String?.length;
    var sizeInBytes =
      4 *
      Math.ceil(stringLength == undefined ? 1000 : stringLength / 3) *
      0.5624896334383812;
    var sizeInKb = sizeInBytes / 1000;
    if (sizeInKb < 1500) {
      this.presentLoading1(image.base64String);
    } else {
      // this.msgTost("Maximum size of profile picture is 1Mb");
    }
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
        .post(environment.apiBaseUrl + "uploadstatus", [
          {
            api_key: apiKey,
            base64image: base64String,
            user_id: this.user_id,
            company_id: this.company_id,
            //  customer_id: this.customer_id
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
              this.updateFileuploaddata();
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

  updateFileuploaddata() {
    const formData = new FormData();
    formData.append("api_key", this.token_key);
    formData.append("company_id", this.company_id);
    formData.append("upload_id", this.upload_id);
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
      .post(environment.apiBaseUrl + "updatelogodata", formData, {
        reportProgress: true,
        observe: "events",
      })

      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.businessdetails = this.response.data.businessdetails;
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
}
