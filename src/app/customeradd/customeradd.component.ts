import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
//import { Contacts } from '@capacitor-community/contacts'
import { environment } from "../../environments/environment";
@Component({
  selector: "app-customeradd",
  templateUrl: "./customeradd.component.html",
  styleUrls: ["./customeradd.component.scss"],
})
export class CustomeraddComponent implements OnInit {
  phoneNumbers: any;
  displayName: any;
  emails: any;
  organizationName: any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  user_id: any;
  company_id: any;
  stateslistdata: any;
  submittype: any;
  //Contacts: any = Contacts;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");

    this.getallStates();
  }
  //   import(){
  //     if(this.Contacts.getPermissions()){
  // //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAF0fKbjixO5qY53OrmMzeXjTaztv0NIwU
  // //console.log('Current position:', coordinates);
  //   this.Contacts.getContacts().then((result: any) => {
  //    // console.log(result);
  //     for (const contact of result.contacts) {

  //         this.displayName=contact.displayName;
  //         this.phoneNumbers=contact.phoneNumbers;
  //         this.emails=contact.emails;
  //         this.organizationName=contact.organizationName;
  //         this.httpclient
  //         .post(environment.apiBaseUrl + 'addcontactdetails', [
  //           {
  //             api_key: environment.apikey,
  //             user_id: this.user_id,
  //             company_id: this.company_id,
  //             name: this.displayName,
  //             mobile: this.phoneNumbers.number,
  //             email: this.emails.address,
  //             organizationName: this.organizationName
  //           },
  //         ])
  //         .subscribe((res: any) => {});
  //     }
  // });
  //   }
  //   }
  getallStates() {
    this.httpclient
      .post(environment.apiBaseUrl + "getallStates", [
        {
          api_key: environment.apikey,
        },
      ])
      .subscribe((res: any) => {
        this.stateslistdata = res.data;
      });
  }

  setsubmittype(type: any) {
    this.submittype = type;
  }

  addcustomer(data: any) {
    console.log(data);
    this.httpclient
      .post(environment.apiBaseUrl + "addnewcustomer", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          name: data.value.name,
          mobile: data.value.mobile,
          email: data.value.email,
          address: data.value.address,
          state: data.value.state,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        if (this.response.success == true) {
          localStorage.setItem("customer_id", this.response.data.customer_id);
          localStorage.setItem("customer_name", data.value.name);
          Swal.fire({
            title: "Success",
            text: this.response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            if (this.submittype == 1) {
              this.router.navigate(["/home"]);
            } else if (this.submittype == 2) {
              localStorage.setItem("cart_page_id", "2");
              this.router.navigate(["/customersale"]);
            }
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
}
