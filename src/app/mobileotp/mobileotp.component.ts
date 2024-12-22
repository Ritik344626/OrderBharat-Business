import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";
// import MessagingserviceComponent from '../messagingservice/messagingservice.component';
@Component({
  selector: "app-mobileotp",
  templateUrl: "./mobileotp.component.html",
  styleUrls: ["./mobileotp.component.scss"],
  // providers: [TokenService]
})
export class MobileotpComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router // private Messagingservice: MessagingserviceComponent
  ) {}

  storedmobile: any;
  storedotp: any;
  response: any;
  otpLoaderStatus = false;

  ngOnInit(): void {
    this.storedmobile = localStorage.getItem("mobileno");
    console.log(localStorage.getItem("mobileotp"));
    //  this.storedotp = localStorage.getItem('mobileotp');
    if (
      localStorage.getItem("user_id") == "" ||
      localStorage.getItem("user_id") == null
    ) {
    } else {
      this.router.navigate(["home"]);
    }
  }

  verifyotp(data: any) {
    this.otpLoaderStatus = true;
    if (this.storedotp == data.value.otp) {
      this.httpclient
        .post(environment.apiBaseUrl + "user_login_register", [
          { api_key: environment.apikey, mobile: this.storedmobile },
        ])
        .subscribe((res: any) => {
          this.response = res;
          this.otpLoaderStatus = false;

          if (this.response.success == true) {
            localStorage.setItem("loginstate", "true");
            localStorage.setItem("user_id", this.response.data.user_id);
            localStorage.setItem("company_id", this.response.data.company_id);

            if (this.response.data.isfirsttime == true) {
              this.router.navigate(["/step1"]);
            } else {
              this.router.navigate(["/home"]);
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
    } else {
      Swal.fire({
        title: "Oops...",
        text: "OTP not matched",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  }
}
