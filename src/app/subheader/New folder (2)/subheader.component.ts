import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-subheader",
  templateUrl: "./subheader.component.html",
  styleUrls: ["./subheader.component.scss"],
})
export class SubheaderComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}

  url: any = null;
  title: any;
  prdct_page_id: any = localStorage.getItem("prdct_page_id");

  ngOnInit() {
    this.url = this.location.path().substring(1);

    if (this.url == "customer") {
      this.title="Customer";      
    } 
    else if (this.url == "editcustomer") {
      this.title="Edit Customer"; 
    } else if (this.url == "customeradd") {

      this.title="Add Customer";

    } else if (this.url == "productview") {
      if (this.prdct_page_id == "1") {
        this.title="Product View";
        //this.router.navigate(["/products"]);
      } else if (this.prdct_page_id == "2") {
        this.title="Product View";
      }
    } else if (this.url == "productimageadd") {
      if (this.prdct_page_id == "1") {
        this.title="Add Product Image ";
        this.router.navigate(["/products"]);
      } else if (this.prdct_page_id == "2") {
        this.title="Add Product Image ";
      }
    } else if (this.url == "productadd") {
      this.title="Product Add";
    } else if (this.url == "editproduct") {
      this.title="Product Edit";
    } else if (this.url == "businessdetails") {
      this.title="Business Detais";
    } else if (this.url == "businessquery") {
      this.title="Business Query";
    } else if (this.url == "editprofile") {
      this.title="Profile Edit";
    } else if (this.url == "editlist") {
      this.title="List Edit";
    } else if (this.url == "subscription") {
      this.title="Subscription";

    } else if (this.url == "editbusinessname") {
      this.title="Business Name Edit ";
    } else if (this.url == "businesstype") {
      this.title="Business Type";
    } else if (this.url == "businesscategory") {
      this.title="Business Category";
    } else if (this.url == "editstreet") {
      this.title="Street Edit";
    } else if (this.url == "viewinvoice") {
      this.title="View Invoice";
    } else if (this.url == "invoicelist") {
      this.title="Invoice List";
    } else if (this.url == "orderlist") {
      this.title="Order List";
    } else if (this.url == "qrcodeview") {
      this.title="Qr Code View";

    } else if (this.url == "yougot") {
       this.title="Yougot";
    } else if (this.url == "yougive") {
      this.title="Yougive";
    } else if (this.url == "editbank") {
      this.title="Bank Edit ";
    } else if (this.url == "editemail") {
      this.title="Email Edit ";
    } else if (this.url == "editshortinfo") {
      this.title="Short Info Edit ";
    } else if (this.url == "edittac") {
      this.title="Terms and Conditions Edit";
    } else if (this.url == "editupiid") {
      this.title="UPI Id Edit ";


    } else if (this.url == "addwallet") {
      this.title="Add Wallet";
    } else if (this.url == "editdelivery") {
      this.title="Eedit Delivery";
    } else if (this.url == "editgst") {
      this.title="Edit GST";
    } else if (this.url == "invoicelistcustomer") {
      this.title="Invoice list";
    } else if (this.url == "appads") {
      this.title="App Ads";
    } else if (this.url == "appadsadd") {
      this.title="Add app ads";
    } else if (this.url == "adsbalanceadd") {
      this.title="Add ads balance";
    } else if (this.url == "adsaddimageupload") {
      this.title="Add ads image";
    } else if (this.url == "adsdetails") {
      this.title="Ads Details";
    } else if (this.url == "invoicepayment") {
      this.title="Invoice Payment";
    } else if (this.url == "orderview") {
      this.title="Order View";
    } else if (this.url == "addcategory") {
      this.title="Add CAtegory";
    } else if (this.url == "appadsadd") {
      this.title="App ads add";
    }

  }



  goBack() {
    if (this.url == "customer") {
      this.router.navigate(["/home"]);      
    } 
    else if (this.url == "editcustomer") {
      this.router.navigate(["/home"]);
    } else if (this.url == "customeradd") {
      this.router.navigate(["/home"]);
    } else if (this.url == "productview") {
      if (this.prdct_page_id == "1") {
        this.router.navigate(["/products"]);
      } else if (this.prdct_page_id == "2") {
        this.router.navigate(["/cataloguec"]);
      }
    } else if (this.url == "productimageadd") {
      if (this.prdct_page_id == "1") {
        this.router.navigate(["/products"]);
      } else if (this.prdct_page_id == "2") {
        this.router.navigate(["/cataloguec"]);
      }
    } else if (this.url == "productadd") {
      this.router.navigate(["/products"]);
    } else if (this.url == "editproduct") {
      this.router.navigate(["/productview"]);
    } else if (this.url == "businessdetails") {
      this.router.navigate(["/business"]);
    } else if (this.url == "businessquery") {
      this.router.navigate(["/businessdetails"]);
    } else if (this.url == "editprofile") {
      this.router.navigate(["/home"]);
    } else if (this.url == "editlist") {
      this.router.navigate(["/editprofile"]);
    } else if (this.url == "subscription") {
      this.router.navigate(["/home"]);
    } else if (this.url == "editbusinessname") {
      this.router.navigate(["/editprofile"]);
    } else if (this.url == "businesstype") {
      this.router.navigate(["/editprofile"]);
    } else if (this.url == "businesscategory") {
      this.router.navigate(["/editprofile"]);
    } else if (this.url == "editstreet") {
      this.router.navigate(["/editprofile"]);
    } else if (this.url == "viewinvoice") {
      this.router.navigate(["/invoicelist"]);
    } else if (this.url == "invoicelist") {
      this.router.navigate(["/home"]);
    } else if (this.url == "orderlist") {
      this.router.navigate(["/home"]);
    } else if (this.url == "qrcodeview") {
      this.router.navigate(["/editprofile"]);
    } else if (this.url == "yougot") {
      this.router.navigate(["/home"]);
    } else if (this.url == "yougive") {
      this.router.navigate(["/home"]);
    } else if (this.url == "editbank") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "editemail") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "editshortinfo") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "edittac") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "editupiid") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "addwallet") {
      this.router.navigate(["/wallet"]);
    } else if (this.url == "editdelivery") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "editgst") {
      this.router.navigate(["/editlist"]);
    } else if (this.url == "invoicelistcustomer") {
      this.router.navigate(["/home"]);
    } else if (this.url == "appads") {
      this.router.navigate(["/home"]);
    } else if (this.url == "appadsadd") {
      this.router.navigate(["/appads"]);
    } else if (this.url == "adsbalanceadd") {
      this.router.navigate(["/appads"]);
    } else if (this.url == "adsaddimageupload") {
      this.router.navigate(["/appads"]);
    } else if (this.url == "adsdetails") {
      this.router.navigate(["/appads"]);
    } else if (this.url == "invoicepayment") {
      this.router.navigate(["/invoicelist"]);
    } else if (this.url == "orderview") {
      this.router.navigate(["/orderlist"]);
    } else if (this.url == "addcategory") {
      this.router.navigate(["/products"]);
    } else if (this.url == "appadsadd") {
      this.router.navigate(["/home"]);
    }
  }
}
