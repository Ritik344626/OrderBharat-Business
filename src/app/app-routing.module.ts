import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//login
import { IndexComponent } from "./index/index.component";
import { HomeComponent } from "./home/home.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomeraddComponent } from "./customeradd/customeradd.component";
import { CustomersaleComponent } from "./customersale/customersale.component";
import { ProductaddComponent } from "./productadd/productadd.component";
import { ProductsComponent } from "./products/products.component";
import { BusinessComponent } from "./business/business.component";
import { BusinessdetailsComponent } from "./businessdetails/businessdetails.component";
import { MoneyComponent } from "./money/money.component";
// import { SaleComponent } from './sale/sale.component';
import { MobileotpComponent } from "./mobileotp/mobileotp.component";
import { MobileComponent } from "./mobile/mobile.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { AddnewsaleComponent } from "./addnewsale/addnewsale.component";
import { EditcustomerComponent } from "./editcustomer/editcustomer.component";
import { EditproductComponent } from "./editproduct/editproduct.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";
import { BusinessqueryComponent } from "./businessquery/businessquery.component";
//import { NotificationComponent } from "./notification/notification.component";
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
import { AppadsaddComponent } from "./appadsadd/appadsadd.component";
import { MessageComponent } from "./message/message.component";
import { AdsbalanceaddComponent } from "./adsbalanceadd/adsbalanceadd.component";
import { AdsaddimageuploadComponent } from "./adsaddimageupload/adsaddimageupload.component";
import { AdsdetailsComponent } from "./adsdetails/adsdetails.component";
import { OrderviewComponent } from "./orderview/orderview.component";
import { PaymentngComponent } from "./paymentng/paymentng.component";
// import {PaymentFormComponent} from './payumoney-payment/payment-form/payment-form.component';
// import {PayumoneyPaymentComponent} from './payumoney-payment/payumoney-payment.component';
// import {PaymentSuccessComponent} from './payumoney-payment/payment-success/payment-success.component';
// import {PaymentFailureComponent} from './payumoney-payment/payment-failure/payment-failure.component';
import { ProductbulkeditComponent } from "./productbulkedit/productbulkedit.component";
import { WalletComponent } from "./wallet/wallet.component";
import { AddwalletComponent } from "./addwallet/addwallet.component";
import { AddupiidComponent } from "./addupiid/addupiid.component";
import { CategorylistComponent } from "./categorylist/categorylist.component";
import { AddcategoryComponent } from "./addcategory/addcategory.component";
import { CategoryimageuploadComponent } from "./categoryimageupload/categoryimageupload.component";
import { CategoryeditComponent } from "./categoryedit/categoryedit.component";
import { OfferComponent } from "./offer/offer.component";

import { EditprivacyComponent } from "./editprivacy/editprivacy.component";
import { EditrefundComponent } from "./editrefund/editrefund.component";
import { EditcontactComponent } from "./editcontact/editcontact.component";
import { QrcodepagewebPage } from "./qrcodepageweb/qrcodepageweb.page";
import { PosterviewComponent } from "./posterview/posterview.component";
import { PosterslistComponent } from "./posterslist/posterslist.component";



const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "",
  //   pathMatch: "full",
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: "", component: IndexComponent },
  { path: "home", component: HomeComponent },
  { path: "bulkproductedit", component: ProductbulkeditComponent },
  { path: "editprofile", component: EditprofileComponent },
  { path: "editcustomer", component: EditcustomerComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customeradd", component: CustomeraddComponent },
  { path: "editproduct", component: EditproductComponent },
  { path: "customersale", component: CustomersaleComponent },
  { path: "business", component: BusinessComponent },
  { path: "businessdetails", component: BusinessdetailsComponent },
  { path: "businessquery", component: BusinessqueryComponent },
  { path: "money", component: MoneyComponent },
  { path: "productadd", component: ProductaddComponent },
  { path: "products", component: ProductsComponent },
  // { path: 'addneworder', component: SaleComponent },
  { path: "addneworder", component: AddnewsaleComponent },
  { path: "mobileotp", component: MobileotpComponent },
  { path: "mobile", component: MobileComponent },
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "productview", component: ProductviewComponent },
  { path: "productimageadd", component: ProductimageaddComponent },
  { path: "offers", component: CataloguecComponent },

  { path: "yougive", component: YougiveComponent },
  { path: "yougot", component: YougotComponent },
  {
    path: "customerpaymenthistory",
    component: CustomerpaymenthistoryComponent,
  },
  { path: "paymentlist", component: PaymentlistComponent },
  { path: "invoicepayment", component: InvoicepaymentComponent },

  { path: "editlist", component: EditlistComponent },
  { path: "subscription", component: SubscriptionComponent },
  { path: "chats", component: ChatsComponent },

  { path: "friends", component: FriendsComponent },
  { path: "invite", component: InviteComponent },
  { path: "chatdetails", component: ChatdetailsComponent },
  { path: "posts", component: PostsComponent },
  { path: "invitepending", component: InvitependingComponent },
  { path: "friendschat", component: FriendschatComponent },
  { path: "postsadd", component: PostsaddComponent },

  { path: "editbusinessname", component: EditbusinessnameComponent },
  { path: "editphone", component: EditphoneComponent },
  { path: "editemail", component: EditemailComponent },
  { path: "editaddress", component: EditaddressComponent },
  { path: "editstreet", component: EditstreetComponent },
  { path: "businesstype", component: BusinesstypeComponent },
  { path: "businesscategory", component: BusinesscategoryComponent },
  { path: "shortinfo", component: ShortinfoComponent },

  { path: "editshortinfo", component: EditshortinfoComponent },
  { path: "edittac", component: EdittacComponent },
  { path: "editdelivery", component: EditdeliveryComponent },
  // { path: "notification", component: NotificationComponent },

  { path: "editgst", component: EditgstComponent },
  { path: "editbank", component: EditbankComponent },
  { path: "step1", component: Step1Component },
  { path: "step2", component: Step2Component },

  { path: "editpassword", component: EditpasswordComponent },
  { path: "invoicelist", component: InvoicelistComponent },

  { path: "viewinvoice", component: ViewinvoiceComponent },
  { path: "orderlist", component: OrderlistComponent },
  { path: "qrcodeview", component: QrcodeviewComponent },
  { path: "invoicelistcustomer", component: InvoicelistcustomerComponent },

  { path: "pagecontact", component: PagecontactComponent },
  { path: "pageabout", component: PageaboutComponent },
  { path: "pagefaq", component: PagefaqComponent },
  { path: "pagetac", component: PagetacComponent },
  { path: "pageprivacy", component: PageprivacyComponent },
  { path: "refund", component: RefundComponent },
  { path: "appads", component: AppadsComponent },
  { path: "appadsadd", component: AppadsaddComponent },
  { path: "message", component: MessageComponent },
  { path: "adsbalanceadd", component: AdsbalanceaddComponent },
  { path: "adsaddimageupload", component: AdsaddimageuploadComponent },

  { path: "adsdetails", component: AdsdetailsComponent },
  { path: "orderview", component: OrderviewComponent },
  { path: "paymentng", component: PaymentngComponent },
  { path: "wallet", component: WalletComponent },
  { path: "addwallet", component: AddwalletComponent },
  { path: "editupiid", component: AddupiidComponent },

  { path: "addcategory", component: AddcategoryComponent },

  { path: "categorylist", component: CategorylistComponent },
  { path: "categoryimageupload", component: CategoryimageuploadComponent },
  { path: "categoryedit", component: CategoryeditComponent },
  { path: "offer", component: OfferComponent },

  { path: "editprivacy", component: EditprivacyComponent },
  { path: "editrefund", component: EditrefundComponent },
  { path: "editcontact", component: EditcontactComponent },
  { path: "qrcodepageweb", component: QrcodepagewebPage },
  { path: "posterview", component: PosterviewComponent },
  { path: "posterslist", component: PosterslistComponent },
  


  
  {
    path: 'qrcodepageweb',
    loadChildren: () => import('./qrcodepageweb/qrcodepageweb.module').then(m => m.QrcodepagewebPageModule)
  }














];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
