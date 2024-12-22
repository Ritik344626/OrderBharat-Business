import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
//import { SMS } from '@awesome-cordova-plugins/sms';
import { environment } from "../../environments/environment";
import { Share } from "@capacitor/share";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router // private sms: SMS
  ) {}

  response: any;
  otherdata: any = [];
  customer_id: any = [];
  customerdata: any = [];
  businessdetails: any = [];

  customermobile: any;

  salesdata: any = [];
  user_id: any;
  company_id: any;

  //loading indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.customer_id = localStorage.getItem("customer_id");
    this.getcustomerdetails();
    this.getallsales();
    this.getshopdetails();
    //  this. shareContent();
  }

  getcustomerdetails() {
    console.log(this.customer_id);
    this.httpclient
      .post(environment.apiBaseUrl + "getcustomerdetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.customerdata = this.response.data.customerdata;
          this.customermobile = this.customerdata.mobile;
          localStorage.setItem(
            "customer_name",
            this.customerdata.customer_name
          );
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

  getallsales() {
    // if ($(window).height() <= 600) {
    //   this.customerloadlimit = 5;
    //  }
    console.log(this.customer_id);
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + "getallsales", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
          //    customerloadlimit: this.customerloadlimit,
        },
      ])

      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.salesdata = this.response.data.salesdata;

          

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

  getshopdetails() {
    //   console.log(this.user_id);
    //  console.log(this.company_id);

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

  yougive(customer_id: any) {
    localStorage.setItem("customer_id", customer_id);
    this.router.navigate(["/yougive"]);
  }

  yougot(customer_id: any) {
    localStorage.setItem("customer_id", customer_id);
    this.router.navigate(["/yougot"]);
  }

  editcustomer(id: any) {
    localStorage.setItem("customer_id", id);
    this.router.navigate(["/editcustomer"]);
  }

  customersale() {
    localStorage.setItem("cart_page_id", "2");
    this.router.navigate(["/customersale"]);
  }

  // share() {
  //   SocialSharing.share(
  //     'https://gbosss.com/statement/appreminder/' + this.customer_id + '/' + this.user_id
  //   );

  // }

  // customersms() {
  //   SMS.hasPermission().then((res: any) => {
  //     // alert(res);
  //   });

  //   if (this.customermobile != 0 || this.customermobile != null) {
  //     SMS.send(this.customerdata.mobile, 'https://gbosss.com/statement/appreminder/' + this.customer_id + '/' + this.user_id, {
  //       android: { intent: 'INTENT' },
  //     });
  //   } else {
  //     Swal.fire({
  //       title: 'Oops...',
  //       text: 'Add customer mobile number first',
  //       icon: 'warning',
  //       confirmButtonText: 'Ok',
  //     });
  //   }
  // }

  invoicelist(customer_id: any) {
    localStorage.setItem("customer_id", customer_id);
    this.router.navigate(["/invoicelistcustomer"]);
  }

  goBack() {
    this.router.navigate(["/home"]);
  }

  // async function shareContent() {
  //   try {
  //     await Share.share({
  //       title: 'See cool stuff',
  //       text: 'Really awesome thing you need to see right meow',
  //       url: 'http://ionicframework.com/',
  //       dialogTitle: 'Share with buddies',
  //     });
  //     console.log('Sharing successful');
  //   } catch (error) {
  //     console.error('Error while sharing:', error.message);
  //   }
  // }

  // Call the function

  async share() {
    await Share.share({
      title: "Order Bharat Invoice",
      text: "Invoice",
      url:
        "https://gbosss.com/statement/appreminder/" +
        this.customer_id +
        "/" +
        this.user_id,
      dialogTitle: "Share Invoice",
    });
  }
}
