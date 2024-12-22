import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import MessagingserviceComponent from "../messagingservice/messagingservice.component";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router // private Messagingservice: MessagingserviceComponent
  ) {}

  user_id: any;
  company_id: any;
  loginstate: any;
  response: any;
  otpLoaderStatus = false;

  ngOnInit(): void {
    this.loginstate = localStorage.getItem("loginstate");

    if (this.loginstate === "true") {
      this.router.navigate(["/home"]);
    }
  }

  // localStorage.setItem('user_id', this.response.data.user_id);
  // localStorage.setItem('company_id', this.response.data.company_id);

  sendotp(data: any) {
    this.otpLoaderStatus = true;
    this.httpclient
      .post(environment.apiBaseUrl + "user_otp_send", [
        {
          api_key: environment.apikey,
          mobile: data.value.mobile,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.otpLoaderStatus = false;

        if (this.response.success == true) {
          localStorage.setItem("mobileno", this.response.data.mobile);
          localStorage.setItem("mobileotp", this.response.data.otp);
          this.router.navigate(["/mobileotp"]);
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
