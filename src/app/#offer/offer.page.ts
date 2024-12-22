import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatustimerService } from '../statustimer.service';
import Swiper from 'swiper';
// import { E } from '#node_modules/memfs/lib/internal/errors';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
//import * as cloudinary from 'cloudinary-core';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  imageArray: string[] = [];
  isModalStatus: any;
  selectedStatus: any;
  visiableProgress: any = false;
  statusProgress: any = 0;
  counter: any = 0;
  selectedUser: any = '';
  count: number = 1;
  currentSlideIndex: number = 0;
  upload: any = false;
  isModalOpen = false;
  selectedFile: any;
  uploadProgress: any;
  token_key: any;
  upload_id: any;
  response: any;
  company_id: any = localStorage.getItem('company_id');
  visitor_id: any = localStorage.getItem('visitor_id');
 // cl = cloudinary.Cloudinary.new({ cloud_name: 'dtaplgncy' });
  visitorId: any;
  username: any;
  myOfferUrl: any;
  ismystatus: boolean = false;
  loaded = false;
  imagesdetails: any;



  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private _statusTimer: StatustimerService,
    private modalcontroller: ModalController,
    public loadingController: LoadingController,
   
  ) {
    this.isModalStatus = false;
    this.generateRandomImages(15);
    this.getKey();
  }

  async getKey()
	{
 this.token_key='$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO';
  }

  ngOnInit() {
    this.visitorId = localStorage.getItem('visitor_id');
    this.username = localStorage.getItem('username')
    this.getmyofferlist();
  }


  generateRandomImages(count: number): void {
    for (let i = 0; i < count; i++) {
      // Use placeholder image services (e.g., Lorem Picsum)
      const imageUrl = `https://picsum.photos/200/300?random=${i}`;
      this.imageArray.push(imageUrl);
    }
  }
  openStatusModal(_status: any, _selectedStatus: any, imageIndex: number) {
    this.isModalStatus = _status;
    if (_status) {
      this.selectedStatus = _selectedStatus.filter((_, index: number) => index >= imageIndex);
      this.startStatusTimer(3000 * this.selectedStatus.length);
      this.counter = 0;
    }
    this.count = 1;
    this.selectedUser = this.selectedStatus[0];
  }
  startStatusTimer(_time: any): void {
    this._statusTimer.startTimer(
      _time, (secondsRemaining) => {
        var incrment = this.imageArray.length / _time;
        this.statusProgress = this.statusProgress + 0.003;
      },
      () => {
        //start
        this.visiableProgress = true;
        this.statusProgress = 0;
      },
      () => {
        //end
        if (this.selectedStatus.length == 1) {
          this.isModalStatus = false;
        }
      }
    );
  }
  slideChange() {
    this.statusProgress = 0;
    console.log("change");
    this.count++;
    if (this.count == this.selectedStatus.length + 1) {
      this.isModalStatus = false;
    }
  }

  home() {
    this.router.navigate(['/scannapp']);
  }

  // setOpen(isOpen: boolean) {
  //   this.isModalOpen = isOpen;
  // }
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile)

  //   if (this.selectedFile) {
  //     const reader = new FileReader();

  //     reader.onload = function (e) {
  //       const image = e.target.result;
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }



  // async onSubmit() {
  //   const loading = await this.loadingController.create({
  //     cssClass: "my-custom-class",
  //     message: "Please wait...",
  //   });
  //   await loading.present();

  //   if (this.selectedFile) {
  //     //     this.user_id = localStorage.getItem('user_id');
  //     // this.company_id = localStorage.getItem('company_id');
  //     // this.customer_id = localStorage.getItem('order_user_id');

  //     const formData = new FormData();
  //     formData.append("file", this.selectedFile);
  //     formData.append("api_key", this.token_key);
  //     //  formData.append('user_id', this.user_id);
  //     // formData.append('company_id', this.company_id);
  //     // formData.append('customer_id', this.customer_id);

  //     this.httpclient
  //       .post(environment.apiBaseUrl + "uploadofferFile", formData, {
  //         reportProgress: true,
  //         observe: "events",
  //       })
  //       .subscribe(
  //         (event) => {
  //           if (event.type === 1) {
  //             if (event.total) {
  //               this.uploadProgress = Math.round(
  //                 (100 * event.loaded) / event.total
  //               );
  //             }
  //           } else if (event.type === 4) {
  //             console.log("File uploaded successfully:", event.body);
  //             loading.dismiss(); // Dismiss the loader after API response
  //             this.upload = true;
  //             this.isModalOpen = false;
  //             var re: any = event.body;
  //             this.upload_id = re.data.id;
  //             localStorage.setItem("upload_id", this.upload_id);
  //             this.upload_id = localStorage.getItem("upload_id");
  //             this.uploadstatusproductimage();
  //           }
  //         },
  //         (error) => {
  //           loading.dismiss(); // Dismiss the loader in case of an error
  //           console.error("Error uploading file:", error);
  //         }
  //       );
  //   } else {
  //     loading.dismiss(); // Dismiss the loader if no file is selected
  //     console.error("No file selected.");
  //   }
  // }

  // async onSubmit() {

  //   try {
  //     const image = await this.selectedFile
  //     const file = image;
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/<cloud_name>/image/upload?upload_preset=lgsidl7h&api_key=941959362381614`;

  //     const response = await fetch(cloudinaryUploadUrl, {
  //       method: 'POST',
  //       body: formData
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.url);
  //       this.uploadstatusproductimage(data.url)
  //       this.myOfferUrl = data.url;
  //       // Handle success, you can get the uploaded image URL from the response
  //     } else {
  //       console.error('Upload failed with status:', response.status);
  //       const errorResponse = await response.text();
  //       console.error('Error response:', errorResponse);
  //     }
  //   } catch (error) {
  //     console.error('Error selecting image or uploading:', error);
  //   }
  // }

  getOffersList() {
    const inputData = {
      api_key: this.Token.apikey(),
      visitor_id: this.visitorId
    }
    this.httpclient
      .post(environment.apiBaseUrl + "offeruploadimagelist", inputData, {
      }).subscribe((res: any) => {
        this.response = res;
        console.log(res);
      })
  }


  // uploadstatusproductimage(imageUrl) {
  //   const formData = new FormData();
  //   formData.append("api_key", this.Token.apikey());
  //   formData.append("visitor_id", this.visitorId);
  //   formData.append("username", this.username);
  //   formData.append("offerimageUrl", imageUrl);
  //   //formData.append("product_id", this.product_id);
  //   this.httpclient;
  //   // .post(environment.apiBaseUrl  + 'updateFileuploaddata', [
  //   //   {
  //   //     api_key: this.Token.apikey(),
  //   //  //  user_id: this.user_id,
  //   //     company_id: this.company_id,
  //   //   //  customer_id: this.customer_id,
  //   // //  company_id: this.vendor_id,
  //   //   //  customer_id: this.visitor_id,
  //   //     upload_id: this.upload_id
  //   //   },
  //   // ])

  //   this.httpclient
  //     .post(environment.apiBaseUrl + "offerupload", formData, {
  //     }).subscribe((res: any) => {
  //       this.response = res;

  //       // if (res.success == true) {
  //       //this.businessdetails = this.response.data.businessdetails;
  //       console.log("upload success:  ::::", this.response);
  //       this.modalcontroller.dismiss()
  //       this.ismystatus = true;
  //       // } else if (this.response.success == false) {
  //       //   Swal.fire({
  //       //     title: "Oops...",
  //       //     text: this.response.data.message,
  //       //     icon: "warning",
  //       //     confirmButtonText: "Ok",
  //       //   });
  //       // }
  //     });
  // }



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
        .post("https://gbosss.com/Api_Orderbharatbusiness/uploadofferuserFile", formData, {
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
    formData.append("visitor_id", this.visitor_id);
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
          this.modalcontroller.dismiss()
          this.ismystatus = true;

          this.getmyofferlist();

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


  getmyofferlist() {
    this.httpclient
      .post(environment.apiBaseUrl + "getmyofferlist", [
        {
          api_key: environment.apikey,
          visitor_id: this.visitor_id,
       //   company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.ismystatus = true;
          this.imagesdetails = this.response.data.visitor;
          

          this.myOfferUrl=this.imagesdetails.image_name;

          // this.otherdata = this.response.data;
          // this.businessdetails = this.response.data.businessdetails;

          // this.logo_images = this.response.data.logo_images;



          // if (this.myOfferUrl != null) {
          //   this.image =
          //     "https://gbosss.com/assets/order_bharat/offer/" +
          //     this.logo_images;
          // } else {
          //   this.image = "assets/images/demo.jpg";
          // }


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
