import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";
import MessagingserviceComponent from '../messagingservice/messagingservice.component';

@Component({
  selector: "app-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.scss"],
})
export class MobileComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private Messagingservice: MessagingserviceComponent
  ) {}

  response: any;
  otpLoaderStatus = false;

  ngOnInit(): void {
    if (
      localStorage.getItem("user_id") == "" ||
      localStorage.getItem("user_id") == null
    ) {
    } else {
      this.router.navigate(["home"]);
    }
  }

  sendotp(data: any) {
    this.otpLoaderStatus = true;

    this.httpclient
      .post(environment.apiBaseUrl + "user_otp_send", [
        { api_key: environment.apikey, mobile: data.value.mobile },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.otpLoaderStatus = false;
        if (this.response.success == true) {
          localStorage.setItem("mobileno", this.response.data.mobile);
          localStorage.setItem("mobileotp", this.response.data.otp);


          this.Messagingservice.gettoken();
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
