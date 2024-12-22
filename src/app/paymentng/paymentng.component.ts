import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../Services/token.service';
// import { Checkout } from 'capacitor-razorpay';
import { AlertController } from '@ionic/angular';
import {environment} from '../../environments/environment';
function _window():any{
  return window;
}
@Component({
  selector: 'app-paymentng',
  templateUrl: './paymentng.component.html',
  styleUrls: ['./paymentng.component.scss'],
})

export class PaymentngComponent implements OnInit {
  response: any;
  amount: any=100;
  order_id: any;
  user_id: any;
  company_id: any;

  get nativeWindow():any{
    return _window();
  }
 RazorpayCheckout:any;
  public payuform: any = {};
  disablePaymentButton: boolean = true;
  // rzpOptions: {
  //   key: string; amount: string; // 50000 paise = INR 500
  //   name: string; description: string; image: string; order_id: string; handler: (response: any) => void; prefill: { name: string; email: string; }; notes: { address: string; }; theme: { color: string; };
  // };
  rzp1: any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}
 
  rzpOptions:any;
  confirmPayment() {
    this.httpclient
    .post(
      environment.apiBaseUrl + 'createorderrpay',
      [{
           user_id: this.user_id,
            amount: this.amount,
            company_id: this.company_id,
      }]
    )
    .subscribe((res: any) => {
      this.response = res;
      console.log(this.response);
      this.order_id=this.response.id;
      this.httpclient.post(
        environment.apiBaseUrl + 'createorderrpay1',
        [{
          order_id: this.order_id,
             user_id: this.user_id,
              amount: this.amount,
              company_id: this.company_id,
        }]
      ) .subscribe((res: any) => {});
      this.rzpOptions = {
        "key": "rzp_live_tTe07ycAvoYPxw", // Enter the Key ID generated from the Dashboard
        "amount": this.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Gobsss",
        "description": "Live",
        "image": "https://gbosss.com/assets/images/logonew.jpg",
        "order_id": this.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": environment.apiBaseUrl + 'payusurl',
        "prefill": {
            "name": "GBOSSS",
            "email": "deykousik.dey@gmail.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
  //   console.log(this.rzpOptions);
  //     this.rzp1 = new this.nativeWindow.Razorpay(this.rzpOptions);
  // this.rzp1.open();

  try {
    // let data = (Checkout.open(this.rzpOptions));
    // console.log(data+"AcmeCorp");
    this.httpclient.post(
      environment.apiBaseUrl + 'updaterpaystatus',
      [{
        order_id: this.order_id,
           user_id: this.user_id,
            amount: this.amount,
            company_id: this.company_id,
            type:1
      }]
    ).subscribe((res: any) => {
this.response=res;
console.log(this.response.items[0]);
      this.httpclient.post(
        environment.apiBaseUrl + 'updaterpaystatus',
        [{
             order_id: this.response.items[0].order_id,
             txnid: this.response.items[0].id,
             method:this.response.items[0].method,
             currency:this.response.items[0].currency,
             status:this.response.items[0].status,
             user_id: this.user_id,
              amount: this.response.items[0].amount,
              company_id: this.company_id,
              type:2
        }]
      ) .subscribe((res: any) => {
  
        
      }); 
    }); 
    // console.log(JSON.stringify(data))
  } catch (error: any) {
    //it's paramount that you parse the data into a JSONObject
    let errorObj = JSON.parse(error['code'])
    alert(errorObj.description);
    alert(errorObj.code);
    
    alert(errorObj.reason);
    alert(errorObj.step);
    alert(errorObj.source);
    alert(errorObj.metadata.order_id);
    alert(errorObj.metadata.payment_id);
    
  }
    })
     

    // const paymentPayload = {
    //   email: this.payuform.email,
    //   name: this.payuform.firstname,
    //   phone: this.payuform.phone,
    //   productInfo: this.payuform.productinfo,
    //   amount: this.payuform.amount,
    //   udf1:'',
    //   udf2:'',
    //   udf3:'',
    //   udf4:'',
    //   udf5:''
    // }
    // return this.httpclient.post<any>(environment.apiBaseUrl+'payugetdetails', [paymentPayload]).subscribe(
    //   data => {
    //   console.log(data);
    //   this.payuform.txnid = data.txnId;
    //   this.payuform.surl = data.sUrl;
    //   this.payuform.furl = data.fUrl;
    //   this.payuform.key = data.key;
    //   this.payuform.hash = data.hash;
    //   this.payuform.txnid = data.txnId;
    //     this.disablePaymentButton = false;
    // }, error1 => {
    //     console.log(error1);
    //   })
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id'); 
    this.httpclient.post(
      environment.apiBaseUrl + 'updaterpaystatus',
      [{
        order_id: this.order_id,
           user_id: this.user_id,
            amount: this.amount,
            company_id: this.company_id,
            type:1
      }]
    ).subscribe((res: any) => {
this.response=res;
console.log(this.response.items[0]);
      this.httpclient.post(
        environment.apiBaseUrl + 'updaterpaystatus',
        [{
             order_id: this.response.items[0].order_id,
             txnid: this.response.items[0].id,
             method:this.response.items[0].method,
             currency:this.response.items[0].currency,
             status:this.response.items[0].status,
             user_id: this.user_id,
              amount: this.response.items[0].amount,
              company_id: this.company_id,
              type:2
        }]
      ) .subscribe((res: any) => {
  
        
      }); 
    }); 
  }

}
