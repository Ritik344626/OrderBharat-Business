import { Component, HostListener, OnInit,ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import MessagingserviceComponent from "../messagingservice/messagingservice.component";
import { environment } from "../../environments/environment";
declare var $: any;
import html2canvas from 'html2canvas';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-posterview',
  templateUrl: './posterview.component.html',
  styleUrls: ['./posterview.component.scss'],
})
export class PosterviewComponent  implements OnInit {
  backgroundImage: string = 'https://cubepos.in/dist/img/hero_image.png';
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null;
  textToAdd: string = 'Sample Text';
  textSize: number = 30;
  textColor: string = '#ffffff';
  textX: number = 50;
  textY: number = 50;
  texts: Array<{ content: string, size: number, color: string, top: number, left: number }> = [];
  newText: { content: string, size: number, color: string, top: number, left: number } = { content: '', size: 14, color: '#000000', top: 0, left: 0 };
 

  bnm: any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private platform: Platform
   // private Messagingservice: MessagingserviceComponent // private platform: Platform, // private routerOutlet: IonRouterOutlet
  ) {
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   // if (!this.routerOutlet.canGoBack()) {
    //   //   App.exitApp();
    //   // }
    //   App.exitApp();
    // });
  }

  response: any;
  auth: any = false;
  otherdata: any = [];
  customerdata: any = [];
  yougive: any = [];

  businessdetails: any = [];
  user_id: any;
  company_id: any;

  lastcusid: any;
  customerloadlimit: any;
  productcount: any;
  orderplaced: any;
  ordercompleted: any;

  //loader indicator
  loaded = false;

  // prev_pageYOffset: any = 0;

  ngOnInit(): void {

    // this.platform.ready().then(() => {
    //   this.loadImage();
    // });
    // if (
    //   localStorage.getItem("user_id") == "" ||
    //   localStorage.getItem("user_id") == null
    // ) {
    //   this.router.navigate(["/"]);
    // }
    // this.user_id = localStorage.getItem("user_id");
    // this.company_id = localStorage.getItem("company_id");

    this.getshopdetails();
   // this.getallcustomer();
    // this.presentLoading();
 //   this.auth = true;
    // this.Messagingservice.gettoken();
  }

  getshopdetails() {
    console.log(this.company_id);

    this.httpclient
      .post(environment.apiBaseUrl + "getshopdetails", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;
          this.productcount = this.response.data.productcount;
          this.orderplaced = this.response.data.orderplaced;
          this.ordercompleted = this.response.data.ordercompleted;
          
          

          if (this.businessdetails.name.length > 20) {
            this.bnm = this.businessdetails.name.substring(0, 20);
          } else {
            this.bnm = this.businessdetails.name;
          }
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

  // ngAfterViewInit() {
  //   this.platform.ready().then(() => {
  //     this.loadImage();
  //   });
  // }

  loadImage() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    const image = new Image();
    ///assets/images/poster/15-august-short.jpg
    image.src = 'assets/images/poster/15-august.jpg'; // Path to your image
    image.onload = () => {
      this.ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  addTextToImage() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.loadImage();
      this.ctx.font = `${this.textSize}px Arial`;
      this.ctx.fillStyle = this.textColor;
      this.ctx.fillText(this.textToAdd, this.textX, this.textY);
    }
  }

  saveImage() {
    const canvas = this.canvas.nativeElement;
    const dataUrl = canvas.toDataURL('image/png');
    this.downloadImage(dataUrl, 'text-image.png');
  }

  downloadImage(dataUrl: string, filename: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
  textEvent()
  {
    
  }
  addText() {
    this.texts.push({ ...this.newText });
    // Reset newText for next input
    this.newText = { content: '', size: 14, color: '#000000', top: 0, left: 0 };
  }
 
  async saveImageText() {
    const element = document.getElementById('image-container');
    console.log(element);
    if (element) {
      try {
       const canvas = await html2canvas(element, { useCORS: true });
       const image = canvas.toDataURL('image/png');
 
        // Create a link to download the image
        const link = document.createElement('a');
        link.href = image;
        link.download = 'image-overlay.png';
        link.click();
        this.texts=[];
      } catch (error) {
        console.error('Error generating the image:', error);
      }
    } else {
      console.error('Element not found: image-container');
    }
  }
  onXCoordinateChange(event: any) {
    this.newText.left = event.detail.value;
  }

  onYCoordinateChange(event: any) {
    this.newText.top = event.detail.value;
  }
}
