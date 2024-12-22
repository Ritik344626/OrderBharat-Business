import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-pagetac",
  templateUrl: "./pagetac.component.html",
  styleUrls: ["./pagetac.component.scss"],
})
export class PagetacComponent implements OnInit {
  page_id: any = [];
  response: any;
  page: any;

  //loader indicator
  loaded = false;

  visitor_id: any = localStorage.getItem("visitor_id");
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.page_id = 4;
    this.getpagedetails();
  }

  getpagedetails() {
    console.log(this.page_id);
    this.httpclient
      .post(environment.apiBaseUrl + "getapppagesetails", [
        {
          api_key: environment.apikey,
          page_id: this.page_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.page = this.response.data.page;
          console.log(this.page);
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

  home() {
    this.router.navigate(["/scannapp"]);
  }
}
