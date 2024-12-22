import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import MessagingserviceComponent from "../messagingservice/messagingservice.component";
//import { environment } from '../environments/environment';
import { environment } from "../../environments/environment";
import { MessagingServiceService } from "../Services/messaging-service.service";
// import { IonRouterOutlet, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';
// const { App } = Plugins;

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  bnm: any;
 // categoriesWithPosters: any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private Messagingservice: MessagingServiceService // private platform: Platform, // private routerOutlet: IonRouterOutlet
  ) {
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   // if (!this.routerOutlet.canGoBack()) {
    //   //   App.exitApp();
    //   // }
    //   App.exitApp();
    // });
  }
  categoriesWithPosters: any[] = [];
  loading: boolean = true;
  response: any;
  auth: any = false;
  otherdata: any = [];
  customerdata: any = [];
  yougive: any = [];

  businessdetails: any = [];
  user_id: any;
  company_id: any;

  lastcusid: any;
  customerloadlimit: any;
  productcount: any;
  orderplaced: any;
  ordercompleted: any;

  //loader indicator
  loaded = false;

  // prev_pageYOffset: any = 0;

  ngOnInit(): void {
    if (
      localStorage.getItem("user_id") == "" ||
      localStorage.getItem("user_id") == null
    ) {
      this.router.navigate(["/"]);
    }
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");

    localStorage.removeItem("order_bharat_posters_id");

    this.getshopdetails();

    this.getallposters();

  this.Messagingservice.gettoken().subscribe(
    (token) => {
      console.log('Token received:', token);
      console.log('token:'+token);
      console.log('user_id:'+localStorage.getItem("user_id"));
      console.log('uid:'+localStorage.getItem("user_id"));



      this.httpclient
      .post(environment.apiBaseUrl + 'addnotification', [
        {
          token: token,
          user_id: localStorage.getItem("user_id"),
          uid: localStorage.getItem("user_id")
      
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        console.log(this.response);
      });

      console.error('wordking');
    },
    (error) => {
      console.error('Error getting token:', error);
    }
  );
    //this.getallcustomer();
    // this.presentLoading();
    this.auth = true;
    // this.Messagingservice.gettoken();
  }

  getallcustomer() {
    if ($(window).height() <= 600) {
      this.customerloadlimit = 5;
    }

    this.httpclient
      .post(environment.apiBaseUrl + "getallcustomer", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.customerdata = this.response.data.customerdata;
          //  this.yougive = this.response.data.yougive;
          // for (var i = 0; i < this.customerdata.length; i++) {
          //   this.lastcusid = this.customerdata[i].customer_id;
          // }
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

  editcustomer(id: any) {
    localStorage.setItem("customer_id", id);
    this.router.navigate(["/editcustomer"]);
  }

  customer(id: any) {
    localStorage.setItem("customer_id", id);
    this.router.navigate(["/customer"]);
  }

  editprofile() {
    this.router.navigate(["/editprofile"]);
  }

  subscription() {
    this.router.navigateByUrl("/subscription");
  }

  // presentLoading() {
  //   this.subscription = this.platform.backButton.subscribeWithPriority(
  //     9999,
  //     () => {
  //       // do nothing
  //     }
  //   );

  //   this.subscription.unsubscribe();

  //   // const loading = await this.loadingController
  //   //   .create({
  //   //     spinner: 'circles',
  //   //     keyboardClose: true,
  //   //     message: 'Please Wait',
  //   //   })
  //   //   .then((res) => {
  //   //     res.onDidDismiss().then((d) => {
  //   //       this.platform.backButton.observers.pop();
  //   //     });
  //   //     return res.present();
  //   //   });
  //   // return loading;
  // }

  getshopdetails() {
    console.log(this.company_id);

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
          this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;
          this.productcount = this.response.data.productcount;
          this.orderplaced = this.response.data.orderplaced;
          this.ordercompleted = this.response.data.ordercompleted;


          
          
        //  this.Messagingservice.gettoken();

      //    console.log(this.Messagingservice.gettoken());
          

          if (this.businessdetails.name.length > 20) {
            this.bnm = this.businessdetails.name.substring(0, 20);
          } else {
            this.bnm = this.businessdetails.name;
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

  getallposters() {
    console.log(this.company_id);
    this.loading = true;  // Start loader

    this.httpclient
      .post(environment.apiBaseUrl + "getallposters", [
        {
          api_key: environment.apikey
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.categoriesWithPosters = this.response.data.categories_with_posters;
        } else if (this.response.success == false) {
          // Handle error case
        }

        this.loading = false;  // Stop loader
      }, (error) => {
        // Handle error case
        this.loading = false;  // Stop loader even if there's an error
      });
  }




  searchcustomer(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "searchcustomerbyname", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customername: data.target.value,
          customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.customerdata = this.response.data.customerdata;

          // for (var i = 0; i < this.customerdata.length; i++) {
          //   this.lastcusid = this.customerdata[i].customer_id;
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

  @HostListener("window:scroll", ["$event"])
  getScrollPos(data: any) {
    var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);

    if (curr_pageYOffset == $(document).height() - $(window).height()) {
      // ajax call get data from server and append to the div
      this.customerloadlimit += 5;
      this.httpclient
        .post(environment.apiBaseUrl + "getallcustomer", [
          {
            api_key: environment.apikey,
            user_id: this.user_id,
            company_id: this.company_id,
            // lastcusid: this.lastcusid,
            customerloadlimit: this.customerloadlimit,
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {
            console.log(this.response.data.yougive);

            this.customerdata = this.response.data.customerdata;

            // for (var i = 0; i < this.customerdata.length; i++) {
            //   this.lastcusid = this.customerdata[i].customer_id;
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

    // if (this.prev_pageYOffset < curr_pageYOffset) {
    //   this.prev_pageYOffset = curr_pageYOffset;
    //   console.log('Current position: ' + curr_pageYOffset);
    // }

    // if (this.prev_pageYOffset == curr_pageYOffset) {
    //   console.log('Load New');
    // }
  }


///////////////////////////////////////////////////////

posterview(id: any) {

  console.log(id);
 localStorage.setItem("order_bharat_posters_id", id);
  this.router.navigate(["/posterview"]);
}


posterlist(id: any) {
  console.log(id);
 localStorage.setItem("poster_category", id);
  this.router.navigate(["/posterslist"]);
}

qrcodeview() {  
  this.router.navigate(["/qrcodeview"]);
}


}
