import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {PaymentModel} from '../../shared/models/payment.model';
import {PayumoneyPaymentService} from '../payumoney-payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: 'payemnt-form.component.html',
  styleUrls: ['payment-form.component.scss']
})

export class PaymentFormComponent {

  //paymentModel: PaymentModel = new PaymentModel();
  //paymentForm = new FormGroup({
    firstname :any;
    lastname : any;
    email : any;
    phone : any;
    amount : any;
    productinfo : any;
    paymentForm: any;
  //});
  dt1:any;
  constructor(private paymentService: PayumoneyPaymentService) {}

  onSubmit() {

    this.firstname = 'sder';
    this.lastname = 'ffrgt';
    this.email = 'ss@gmail.com';
    this.phone = '8958475866';
    this.amount = 1;
   this.productinfo = '44';
 this.dt1={firstname:this.firstname,lastname:this.lastname,email:this.email,phone:this.phone,amount:this.amount,productinfo:this.productinfo}

    //console.log('Payment Model : ' + JSON.stringify(this.paymentModel,));
    this.paymentService.createPayment(this.dt1).subscribe(
      res => {
        this.onSuccessPayment(res);
      },
      err => {
        this.onFailurePayment(err);
      }
    );
  }

  onSuccessPayment(response: any) {
    console.log('Success Payment : ' + response);
    if (response.url) {
      // Render PayUmoney payment gateway page
      window.location.href = response.url;
    }
  }

  onFailurePayment(error: any) {
    console.log('Failure Payment : ' + error);
  }
}
