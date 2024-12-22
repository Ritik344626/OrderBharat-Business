import { CUSTOM_ELEMENTS_SCHEMA,ErrorHandler,NO_ERRORS_SCHEMA,NgModule,} from "@angular/core";
//import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from "@angular/router";
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';





//import { File } from '@ionic-native/file/ngx';
//import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';


//import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppComponent } from "./app.component";
import { LongPressDirective } from "./long-press.directive";

import { IndexComponent } from "./index/index.component";
import { HomeComponent } from "./home/home.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomeraddComponent } from "./customeradd/customeradd.component";
import { CustomersaleComponent } from "./customersale/customersale.component";
import { MoneyComponent } from "./money/money.component";
import { ProductaddComponent } from "./productadd/productadd.component";
import { ProductsComponent } from "./products/products.component";
import { SaleComponent } from "./sale/sale.component";
import { MobileotpComponent } from "./mobileotp/mobileotp.component";
import { MobileComponent } from "./mobile/mobile.component";
import { HeaderComponent } from "./header/header.component";
import { SubheaderComponent } from "./subheader/subheader.component";
import { FooterComponent } from "./footer/footer.component";
import { AddnewsaleComponent } from "./addnewsale/addnewsale.component";
import { EditcustomerComponent } from "./editcustomer/editcustomer.component";
import { EditproductComponent } from "./editproduct/editproduct.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";
import { BusinessComponent } from "./business/business.component";
import { BusinessdetailsComponent } from "./businessdetails/businessdetails.component";
import { BusinessqueryComponent } from "./businessquery/businessquery.component";
import { ProductviewComponent } from "./productview/productview.component";
import { ProductimageaddComponent } from "./productimageadd/productimageadd.component";
import { CataloguecComponent } from "./cataloguec/cataloguec.component";
import { YougiveComponent } from "./yougive/yougive.component";
import { YougotComponent } from "./yougot/yougot.component";
import { CustomerpaymenthistoryComponent } from "./customerpaymenthistory/customerpaymenthistory.component";
import { PaymentlistComponent } from "./paymentlist/paymentlist.component";
import { InvoicepaymentComponent } from "./invoicepayment/invoicepayment.component";
import { EditlistComponent } from "./editlist/editlist.component";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { YPipe } from "./y.pipe";

import { ChatsComponent } from "./chats/chats.component";
import { FriendsComponent } from "./friends/friends.component";
import { InviteComponent } from "./invite/invite.component";
import { ChatdetailsComponent } from "./chatdetails/chatdetails.component";
import { PostsComponent } from "./posts/posts.component";
import { InvitependingComponent } from "./invitepending/invitepending.component";
import { FriendschatComponent } from "./friendschat/friendschat.component";
import { PostsaddComponent } from "./postsadd/postsadd.component";

import { EditbusinessnameComponent } from "./editbusinessname/editbusinessname.component";
import { EditphoneComponent } from "./editphone/editphone.component";
import { EditemailComponent } from "./editemail/editemail.component";
import { EditaddressComponent } from "./editaddress/editaddress.component";
import { EditstreetComponent } from "./editstreet/editstreet.component";
import { BusinesstypeComponent } from "./businesstype/businesstype.component";
import { BusinesscategoryComponent } from "./businesscategory/businesscategory.component";
import { ShortinfoComponent } from "./shortinfo/shortinfo.component";

import { EditshortinfoComponent } from "./editshortinfo/editshortinfo.component";
import { EditdeliveryComponent } from "./editdelivery/editdelivery.component";
import { EdittacComponent } from "./edittac/edittac.component";
//import { NotificationComponent } from "./notification/notification.component";

import { EditgstComponent } from "./editgst/editgst.component";
import { EditbankComponent } from "./editbank/editbank.component";
import { Step1Component } from "./step1/step1.component";
import { Step2Component } from "./step2/step2.component";
import { ScaninvoiceComponent } from "./scaninvoice/scaninvoice.component";
import { EditpasswordComponent } from "./editpassword/editpassword.component";
import { InvoicelistComponent } from "./invoicelist/invoicelist.component";
import { ViewinvoiceComponent } from "./viewinvoice/viewinvoice.component";
import { OrderlistComponent } from "./orderlist/orderlist.component";
import { QrcodeviewComponent } from "./qrcodeview/qrcodeview.component";
import { InvoicelistcustomerComponent } from "./invoicelistcustomer/invoicelistcustomer.component";

import { PagecontactComponent } from "./pagecontact/pagecontact.component";
import { PageaboutComponent } from "./pageabout/pageabout.component";
import { PagefaqComponent } from "./pagefaq/pagefaq.component";
import { PagetacComponent } from "./pagetac/pagetac.component";
import { PageprivacyComponent } from "./pageprivacy/pageprivacy.component";
import { RefundComponent } from "./refund/refund.component";
import { AppadsComponent } from "./appads/appads.component";
import { AdsdetailsComponent } from "./adsdetails/adsdetails.component";
import { AppadsaddComponent } from "./appadsadd/appadsadd.component";
import { MessageComponent } from "./message/message.component";
import { AdsbalanceaddComponent } from "./adsbalanceadd/adsbalanceadd.component";
import { AdsaddimageuploadComponent } from "./adsaddimageupload/adsaddimageupload.component";
import MessagingserviceComponent from "./messagingservice/messagingservice.component";
import { OrderviewComponent } from "./orderview/orderview.component";
import { PaymentngComponent } from "../app/paymentng/paymentng.component";
import { PayumoneyPaymentComponent } from "./payumoney-payment/payumoney-payment.component";
import { PaymentFormComponent } from "./payumoney-payment/payment-form/payment-form.component";
import { PaymentFailureComponent } from "./payumoney-payment/payment-failure/payment-failure.component";
import { PaymentSuccessComponent } from "./payumoney-payment/payment-success/payment-success.component";
import { ProductbulkeditComponent } from "./productbulkedit/productbulkedit.component";
import { WalletComponent } from "./wallet/wallet.component";
import { AddwalletComponent } from "./addwallet/addwallet.component";
import { AddupiidComponent } from "./addupiid/addupiid.component";
import { AddcategoryComponent } from "./addcategory/addcategory.component";
import { CategorylistComponent } from "./categorylist/categorylist.component";
import { CategoryimageuploadComponent } from "./categoryimageupload/categoryimageupload.component";

import { CategoryeditComponent } from "./categoryedit/categoryedit.component";
import { OfferComponent } from "./offer/offer.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { TokenService } from "./Services/token.service";
import { HttpService } from "./shared/sharedService/httpService";
import { IonicErrorHandler } from "./Services/ionic-error-handler";

import { EditprivacyComponent } from "./editprivacy/editprivacy.component";
import { EditrefundComponent } from "./editrefund/editrefund.component";
import { EditcontactComponent } from "./editcontact/editcontact.component";

import { PosterviewComponent } from "./posterview/posterview.component";
import { PosterslistComponent } from "./posterslist/posterslist.component";

//import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    CustomerComponent,
    CustomeraddComponent,
    CustomersaleComponent,
    MoneyComponent,
    ProductaddComponent,
    ProductsComponent,
    SaleComponent,
    MobileotpComponent,
    MobileComponent,
    HeaderComponent,
    SubheaderComponent,
    FooterComponent,
    AddnewsaleComponent,
    EditcustomerComponent,
    EditproductComponent,
    EditprofileComponent,
    BusinessComponent,
    BusinessdetailsComponent,
    BusinessqueryComponent,
    ProductviewComponent,
    ProductimageaddComponent,
    CataloguecComponent,
    YougiveComponent,
    YougotComponent,
    CustomerpaymenthistoryComponent,
    PaymentlistComponent,
    InvoicepaymentComponent,
    SubscriptionComponent,
    YPipe,
    EditlistComponent,
    ChatsComponent,
    FriendsComponent,
    InviteComponent,
    ChatdetailsComponent,
    PostsComponent,
    InvitependingComponent,
    FriendschatComponent,
    PostsaddComponent,

    EditbusinessnameComponent,
    EditphoneComponent,
    EditemailComponent,
    EditaddressComponent,
    EditstreetComponent,
    BusinesstypeComponent,
    BusinesscategoryComponent,
    ShortinfoComponent,

    EditshortinfoComponent,
    EditdeliveryComponent,
    EdittacComponent,
    // NotificationComponent,
    EditgstComponent,
    EditbankComponent,
    Step1Component,
    Step2Component,
    ScaninvoiceComponent,
    EditpasswordComponent,
    InvoicelistComponent,
    ViewinvoiceComponent,
    OrderlistComponent,
    QrcodeviewComponent,
    InvoicelistcustomerComponent,
    AdsdetailsComponent,
    PagecontactComponent,
    PageaboutComponent,
    PagefaqComponent,
    PagetacComponent,
    PageprivacyComponent,
    RefundComponent,
    AppadsComponent,
    AppadsaddComponent,
    MessageComponent,
    AdsbalanceaddComponent,
    AdsaddimageuploadComponent,
    OrderviewComponent,
    PaymentngComponent,
    PayumoneyPaymentComponent,
    PaymentFormComponent,
    PaymentFailureComponent,
    PaymentSuccessComponent,
    ProductbulkeditComponent,
    WalletComponent,
    AddwalletComponent,
    AddupiidComponent,
    AddcategoryComponent,
    CategorylistComponent,
    CategoryimageuploadComponent,
    CategoryeditComponent,
    LongPressDirective,
    OfferComponent,
    EditprivacyComponent,
    EditrefundComponent,
    EditcontactComponent,
    PosterviewComponent,
    PosterslistComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // SweetAlert2Module.forRoot()
    RouterModule.forRoot([
      { path: "", component: PaymentngComponent },
      { path: "mobileotp", component: MobileotpComponent },
    ]),
  ],
  providers: [
   // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MessagingserviceComponent, useValue: false },
    { provide: TokenService, useValue: true },
    { provide: HttpService, useValue: false },    
    //File,
    //FileTransfer
  ],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
