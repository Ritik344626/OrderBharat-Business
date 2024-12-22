import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { PreviousRouteService } from "../previous-route.service";

@Component({
  selector: "app-subheader",
  templateUrl: "./subheader.component.html",
  styleUrls: ["./subheader.component.scss"],
})
export class SubheaderComponent implements OnInit {
  constructor(
    private location: Location,
    private router: Router,
    private previousRouteService: PreviousRouteService
  ) {}
  title: any;
  url: any = null;
  prdct_page_id: any = localStorage.getItem("prdct_page_id");

  ngOnInit() {
    console.log(
      "previous url:::::",
      this.previousRouteService.getPreviousUrl()
    );
    this.url = this.location.path().substring(1);
    if (this.url == "customer") {
      this.title = "Customer";
    } else if (this.url == "editcustomer") {
      this.title = "Edit customer";
    } else if (this.url == "customeradd") {
      this.title = "Add customer";
    } else if (this.url == "productview") {
      if (this.prdct_page_id == "1") {
        this.title = "Product view";
        //this.router.navigate(["/products"]);
      } else if (this.prdct_page_id == "2") {
        this.title = "Product view";
      }
    } else if (this.url == "productimageadd") {
      if (this.prdct_page_id == "1") {
        this.title = "Add product image ";
        this.router.navigate(["/products"]);
      } else if (this.prdct_page_id == "2") {
        this.title = "Add product image ";
      }
    } else if (this.url == "productadd") {
      this.title = "Product add";
    } else if (this.url == "products") {
      this.title = "Product list";
    } else if (this.url == "editproduct") {
      this.title = "Product edit";
    } else if (this.url == "businessdetails") {
      this.title = "Business detais";
    } else if (this.url == "businessquery") {
      this.title = "Business query";
    } else if (this.url == "editprofile") {
      this.title = "Profile edit";
    } else if (this.url == "editlist") {
      this.title = "List edit";
    } else if (this.url == "subscription") {
      this.title = "Subscription";
    } else if (this.url == "editbusinessname") {
      this.title = "Business name edit ";
    } else if (this.url == "businesstype") {
      this.title = "Business type";
    } else if (this.url == "businesscategory") {
      this.title = "Business category";
    } else if (this.url == "editstreet") {
      this.title = "Street edit";
    } else if (this.url == "viewinvoice") {
      this.title = "View invoice";
    } else if (this.url == "invoicelist") {
      this.title = "Invoice list";
    } else if (this.url == "orderlist") {
      this.title = "Order list";
    } else if (this.url == "qrcodeview") {
      this.title = "Qr code view";
    } else if (this.url == "yougot") {
      this.title = "Yougot";
    } else if (this.url == "yougive") {
      this.title = "Yougive";
    } else if (this.url == "editbank") {
      this.title = "Bank edit ";
    } else if (this.url == "editemail") {
      this.title = "Email edit ";
    } else if (this.url == "editshortinfo") {
      this.title = "Short info edit ";
    } else if (this.url == "edittac") {
      this.title = "Terms and conditions edit";
    } else if (this.url == "editupiid") {
      this.title = "UPI id edit ";
    } else if (this.url == "addwallet") {
      this.title = "Add wallet";
    } else if (this.url == "editdelivery") {
      this.title = "Edit delivery";
    } else if (this.url == "editgst") {
      this.title = "Edit GST";
    } else if (this.url == "invoicelistcustomer") {
      this.title = "Invoice list";
    } else if (this.url == "appads") {
      this.title = "App ads";
    } else if (this.url == "appadsadd") {
      this.title = "Add app ads";
    } else if (this.url == "adsbalanceadd") {
      this.title = "Add ads balance";
    } else if (this.url == "adsaddimageupload") {
      this.title = "Add ads image";
    } else if (this.url == "adsdetails") {
      this.title = "Ads details";
    } else if (this.url == "invoicepayment") {
      this.title = "Invoice payment";
    } else if (this.url == "orderview") {
      this.title = "Order view";
    } else if (this.url == "addcategory") {
      this.title = "Add category";
    } else if (this.url == "appadsadd") {
      this.title = "App ads add";
    } else if (this.url == "offers") {
      this.title = "Offers";
    } else if (this.url == "bulkproductedit") {
      this.title = "Bulk product edit";
    } else if (this.url == "categorylist") {
      this.title = "Category list";
    } else if (this.url == "categoryimageupload") {
      this.title = "Category image upload";
    } else if (this.url == "categoryedit") {
      this.title = "Category edit";
    }
    else if (this.url == "notification") {
      this.title = "Notification";
    }
    else if (this.url == "message") {
      this.title = "Message";
    }
    else if (this.url == "pagetac") {
      this.title = "Terms and conditions";
    }
    else if (this.url == "pageprivacy") {
      this.title = "Privacy policy";
    }
    else if (this.url == "refund") {
      this.title = "Refund policy";
    }

    else if (this.url == "pageabout") {
      this.title = "About us";
    }

    else if (this.url == "pagefaq") {
      this.title = "FAQ";
    }

    else if (this.url == "pagecontact") {
      this.title = "Contact us";
    }

    else if (this.url == "editprivacy") {
      this.title = "Privacy policy edit";
    }

    else if (this.url == "editrefund") {
      this.title = "Return & refund edit";
    }
    else if (this.url == "editcontact") {
      this.title = "Contact us edit";
    }


    
  }

  goBack() {
    if (this.url == "pagecontact") {
      this.router.navigate(["/home"]);
    } else if (this.url == "editcustomer") {
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
      if (this.previousRouteService.getPreviousUrl() != "editproduct") {
        this.router.navigate([this.previousRouteService.getPreviousUrl()]);
      } else {
        this.router.navigate(["/products"]);
      }
      this.router.navigate(["/products"]);
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
      this.router.navigate(["/categorylist"]);
    } else if (this.url == "appadsadd") {
      this.router.navigate(["/home"]);
    } else if (this.url == "products") {
      this.router.navigate(["/home"]);
    } else if (this.url == "bulkproductedit") {
      this.router.navigate(["/home"]);
    } else if (this.url == "categorylist") {
      this.router.navigate(["/products"]);
    } else if (this.url == "categoryimageupload") {
      this.router.navigate(["/categorylist"]);
    } else if (this.url == "categoryedit") {
      this.router.navigate(["/categorylist"]);
    }

    else if (this.url == "customer") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "notification") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "message") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "pagetac") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "pageprivacy") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "refund") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "pageabout") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "pagefaq") {
      this.router.navigate(["/home"]);
    }
    else if (this.url == "pagecontact") {
      this.router.navigate(["/home"]);
    }

    else if (this.url == "editprivacy") {
      this.router.navigate(["/home"]);
    }
    else if (this.url == "editrefund") {
      this.router.navigate(["/home"]);
    }
    else if (this.url == "editcontact") {
      this.router.navigate(["/home"]);
    }


    

    

    
  }
}
