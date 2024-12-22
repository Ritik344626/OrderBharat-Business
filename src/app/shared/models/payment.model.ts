export class PaymentModel {
  firstname: any;
  lastname: any;
  email: any;
  phone: any;
  amount: any;
  productinfo: any;
  txnid: number;
  surl: string;
  furl: string;

  constructor() {
    this.furl = 'https://gbosss.com/api/payufurl';
    this.surl = 'https://gbosss.com/api/payusurl';
    this.txnid = this.getRandomInt();
  }

  getRandomInt() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
