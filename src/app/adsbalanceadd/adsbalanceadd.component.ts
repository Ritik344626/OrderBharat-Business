import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../Services/token.service';
// import { Checkout } from 'capacitor-razorpay';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-adsbalanceadd',
  templateUrl: './adsbalanceadd.component.html',
  styleUrls: ['./adsbalanceadd.component.scss'],
})
export class AdsbalanceaddComponent implements OnInit {
  addwal: any;
  isdes: any;
  mid: any;
  rzpOptions:any;
  order_id: any;
  res: any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  amount: any=0;
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  txntoken: any;
  orderid: any;
  upiid: any;
  payerAccount: any;
  customer_id:any;
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.customer_id = localStorage.getItem('customer_id');
  }
  submitquery() {
    window.location.href="https://vpayment.gbosss.com?user_id="+this.user_id+"&company_id="+this.company_id+"&customer_id="+this.customer_id+"&amount="+this.amount+"&type=1";

  //   if (parseInt(this.amount) >= 1) {
  //     this.isdes = true;
  //     console.log(this.user_id);
  //     $('#addwallt').css('color', 'blue');
  //     this.addwal =
  //       'Your Transaction is being processing. Do not press back button';
  //       this.httpclient
  //       .post(
  //         environment.apiBaseUrl + 'createorderrpay',
  //         [{
  //              user_id: this.user_id,
  //               amount: this.amount,
  //               company_id: this.company_id,
  //         }]
  //       )
  //       .subscribe(async (res: any) => {
  //         this.response = res;
  //         console.log(this.response);
  //         this.order_id=this.response.id;
  //         this.httpclient.post(
  //           environment.apiBaseUrl + 'createorderrpay1',
  //           [{
  //             order_id: this.order_id,
  //                user_id: this.user_id,
  //                 amount: this.amount,
  //                 company_id: this.company_id,
  //           }]
  //         ) .subscribe((res: any) => {});
  //         this.rzpOptions = {
  //           "key": "rzp_live_tTe07ycAvoYPxw", // Enter the Key ID generated from the Dashboard
  //           "amount": this.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //           "currency": "INR",
  //           "name": "Gobsss",
  //           "description": "Live",
  //           "image": "https://gbosss.com/assets/images/logonew.jpg",
  //           "order_id": this.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //           "callback_url": environment.apiBaseUrl + 'payusurl',
  //           "prefill": {
  //               "name": "GBOSSS",
  //               "email": "deykousik.dey@gmail.com",
  //               "contact": "9999999999"
  //           },
  //           "notes": {
  //               "address": "Razorpay Corporate Office"
  //           },
  //           "theme": {
  //               "color": "#3399cc"
  //           },
  //           "modal": {
  //             "ondismiss": function(){
  //                 console.log('Checkout form closed');
  //             }
  //           }
  //       };
  //     //   console.log(this.rzpOptions);
  //     //     this.rzp1 = new this.nativeWindow.Razorpay(this.rzpOptions);
  //     // this.rzp1.open();
    
  //     try {
  //       let data = await (Checkout.open(this.rzpOptions));
  //       return data.response;
  // //      var pay= setInterval(() => {
  // //       this.isdes = false;
  // //       console.log('3');
  // //       $('#addwallt').css('color', 'green');
  // //       this.addwal =
  // //         'Your Payment Successfully done';
  // //       var l=0;
  // //      // for(var t=0;t<=5;t++){
  // //       this.httpclient.post(
  // //         environment.apiBaseUrl + 'updaterpaystatus',
  // //         [{
  // //           order_id: this.order_id,
  // //              user_id: this.user_id,
  // //               amount: this.amount,
  // //               company_id: this.company_id,
  // //               type:1
  // //         }]
  // //       ).subscribe((res: any) => {
  // //   this.response=res;
  // //  console.log(this.response.items.length)
  // //  if(this.response.items.length>0){
  // //   l=0;
  // //  }
  // //  else{
  // //   l++;
  // //  }
  // //         this.httpclient.post(
  // //           environment.apiBaseUrl + 'updaterpaystatus',
  // //           [{
  // //                order_id: this.response.items[0].order_id,
  // //                txnid: this.response.items[0].id,
  // //                method:this.response.items[0].method,
  // //                currency:this.response.items[0].currency,
  // //                status:this.response.items[0].status,
  // //                user_id: this.user_id,
  // //                 amount: this.response.items[0].amount,
  // //                 company_id: this.company_id,
  // //                 type:2,
  // //                 t:1
  // //           }]
  // //         ) .subscribe((res: any) => {
  // //    // if(res=='success'){
  // //     this.res=res;
  // //           this.isdes = false;
  // //           console.log('3');
  // //           $('#addwallt').css('color', 'green');
  // //           this.addwal =
  // //             'Your Payment Successfully done';
  // //             if(this.res.success==true){
  // //               clearInterval(pay);
  // //           // this.router.navigateByUrl('/appads');
  // //             }
              
  // //    // }
  // //         }); 
  // //       // }
  // //       // else{
  // //       //   this.isdes = false;
  // //       //   console.log('4');
  // //       //   $('#addwallt').css('color', 'red');
  // //       //   this.addwal =
  // //       //     'Your Failed!';
  // //       // }
  // //       }); 
  // //     //}
  // //    },10000);
      
  //       console.log(JSON.stringify(data))
  //     } catch (error) {
        
  //       this.isdes = false;
  //       console.log(this.user_id);
  //       $('#addwallt').css('color', 'red');
  //       this.addwal =
  //         'Your Payment Failed!';
  //       //it's paramount that you parse the data into a JSONObject
  //       let errorObj = JSON.parse(error['code'])
  //       alert(errorObj.description);
  //       alert(errorObj.code);
        
  //       alert(errorObj.reason);
  //       alert(errorObj.step);
  //       alert(errorObj.source);
  //       alert(errorObj.metadata.order_id);
  //       alert(errorObj.metadata.payment_id);
        
  //     }
  //       })
         
    
  //       // const paymentPayload = {
  //       //   email: this.payuform.email,
  //       //   name: this.payuform.firstname,
  //       //   phone: this.payuform.phone,
  //       //   productInfo: this.payuform.productinfo,
  //       //   amount: this.payuform.amount,
  //       //   udf1:'',
  //       //   udf2:'',
  //       //   udf3:'',
  //       //   udf4:'',
  //       //   udf5:''
  //       // }
  //       // return this.httpclient.post<any>(environment.apiBaseUrl+'payugetdetails', [paymentPayload]).subscribe(
  //       //   data => {
  //       //   console.log(data);
  //       //   this.payuform.txnid = data.txnId;
  //       //   this.payuform.surl = data.sUrl;
  //       //   this.payuform.furl = data.fUrl;
  //       //   this.payuform.key = data.key;
  //       //   this.payuform.hash = data.hash;
  //       //   this.payuform.txnid = data.txnId;
  //       //     this.disablePaymentButton = false;
  //       // }, error1 => {
  //       //     console.log(error1);
  //       //   })
  //   } else {
  //     $('#addwallt').css('color', 'red');
  //     this.addwal = 'Minumum wallet balance 200';
  //     this.isdes = false;
  //     Swal.fire({
  //       title: 'Warning',
  //       text: 'Minumum wallet balance 200',
  //       icon: 'warning',
  //       confirmButtonText: 'Ok',
  //     });
  //   }
  }
  addwall(w: any) {
    this.amount = parseInt(w) + parseInt(this.amount);
  }
}
