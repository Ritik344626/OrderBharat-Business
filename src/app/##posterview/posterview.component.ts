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
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import { Share } from "@capacitor/share";




@Component({
  selector: 'app-posterview',
  templateUrl: './posterview.component.html',
  styleUrls: ['./posterview.component.scss'],
})
export class PosterviewComponent  implements OnInit {
  @ViewChild('captureElement', { static: false }) captureElement: ElementRef;
  image: string;

  logoImage: string = '';
  backgroundImage: string = '';
  overlayImage: string=''
  texts: Array<{ content: string, size: number, color: string, top: number, left: number }> = [];
  newText: { content: string, size: number, color: string, top: number, left: number } = { content: '', size: 14, color: '#000000', top: 40, left: 1 };
  logo: { top: number, left: number, width: number, height: number } = { top: 82, left: 78, width: 80, height: 80 }; // Initial position and size of the logo
  isDragging: boolean = false;
  currentText: any;
  offsetX: number = 0;
  offsetY: number = 0;


  public isControlsVisible = false; // Controls visibility state

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
  bnm: any;

  //loader indicator
  loaded = false;

  qrcodelink: any;
  downloadButtonStatus = false;
  base64File: any = null;

  main_url: any;


  // prev_pageYOffset: any = 0;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
   // private Messagingservice: MessagingserviceComponent // private platform: Platform, // private routerOutlet: IonRouterOutlet
  ) {
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   // if (!this.routerOutlet.canGoBack()) {
    //   //   App.exitApp();
    //   // }
    //   App.exitApp();
    // });
  }
  ngOnInit(){
    if (
      localStorage.getItem("user_id") == "" ||
      localStorage.getItem("user_id") == null
    ) {
      this.router.navigate(["/"]);
    }
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");

    this.getshopdetails();
  }

  getshopdetails() {
    console.log(this.company_id)
 
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

        

         
            this.overlayImage= "/assets/images/overlayer.png";
            this.logoImage= "/assets/images/002.png";

          
            this.backgroundImage= "/assets/images/poster/15-august.jpg";
          
          
          this.newText.content=this.businessdetails.name+'<br> '+
          '<div class="phone-text" id="phone-text"> <i class="fa fa-phone" aria-hidden="true"></i>  &nbsp;'+this.businessdetails.phone+'</div><span class="address-text"> <i class="fa fa-map-marker" aria-hidden="true"></i>  &nbsp;'+this.businessdetails.street + '</span>';
      
          setTimeout(() => {
            var phoneTexts:any = document.getElementsByClassName('phone-text');
            if (phoneTexts) {
                for (let i = 0; i < phoneTexts.length; i++) {
                  
                    phoneTexts[i].style = 'margin-top:10px; color:#2f2f2f;';
                }
            }
            var addressTexts:any = document.getElementsByClassName('address-text');
            if (addressTexts) {
                for (let i = 0; i < addressTexts.length; i++) {
                  addressTexts[i].style = 'font-size: 11px; color: rgb(47, 47, 47);font-weight: normal;display: block;width: 80%;';
                }
            }
        }, 0);
        
      
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
  startDragging(event: any, text: any) {
    event.preventDefault();
    this.isDragging = true;
    this.currentText = text;

    if (event.type === 'touchstart') {
      this.offsetX = event.touches[0].clientX - text.left;
      this.offsetY = event.touches[0].clientY - text.top;
    } else {
      const rect = event.target.getBoundingClientRect();
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
    }
  }

  drag(event: any) {
    if (this.isDragging && this.currentText) {
      if (event.type === 'touchmove') {
        event.preventDefault();
        const touch = event.touches[0];
        this.currentText.left = touch.clientX - this.offsetX;
        this.currentText.top = touch.clientY - this.offsetY;
      } else {
        const container = document.getElementById('image-container');
        const rect = container?.getBoundingClientRect();

        if (rect) {
          this.currentText.left = event.clientX - rect.left - this.offsetX;
          this.currentText.top = event.clientY - rect.top - this.offsetY;
        }
      }
    }
  }

  stopDragging() {
    this.isDragging = false;
    this.currentText = null;
  }

async saveImage() {
  const element = document.getElementById('image-container');
  if (element) {
    try {
      console.log('Capturing the element...');

      // Capture the element as a canvas
      const canvas = await html2canvas(element, { useCORS: true });

      // Resize the captured canvas to 1024x1024
      const resizedCanvas = document.createElement('canvas');
      const resizedCtx = resizedCanvas.getContext('2d');
      const targetWidth = 1024;
      const targetHeight = 1024;
      resizedCanvas.width = targetWidth;
      resizedCanvas.height = targetHeight;
      resizedCtx?.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, targetWidth, targetHeight);

      // Convert the resized canvas to a data URL
      const resizedImage = resizedCanvas.toDataURL('image/png');

      // Check the generated image URL
      console.log('Generated image URL:', resizedImage);

      await Share.share({
        title: 'Shared Image',
        text: 'Check out this image!',
        url: resizedImage,
        dialogTitle: 'Share this image'
      });

      // const base64Data = resizedImage.split(',')[1];
      // const fileName = 'qr-code.png';

      // const result = await Filesystem.writeFile({
      //   path: fileName,
      //   data: base64Data,
      //   directory: Directory.Cache,
      // });
      

      // // Save the image to the device
      // const fileName = `image-overlay-${new Date().getTime()}.png`;
      // const result = await Filesystem.writeFile({
      //   path: fileName,
      //   data: base64Data,
      //   directory: Directory.Documents,
      //   encoding: Encoding.UTF8,
      // });

      // console.log('File saved:', result);
      //     // Create a link to download the resized image
      //     const link = document.createElement('a');
      //     link.href = resizedImage;
      //     link.download = 'image-overlay.png';

      //     // Append the link to the document body and programmatically click it
      //     document.body.appendChild(link);
      //     link.click();

      //     // Clean up: remove the link from the document body
      //     document.body.removeChild(link);

      // Notify the user or handle the saved file as needed

    } catch (error) {
      console.error('Error generating or saving the image:', error);
    }
  } else {
    console.error('Element not found: image-container');
  }
}

  // changeColor(event: Event): void {
  //   if (this.currentText) {
  //     const input = event.target as HTMLInputElement;
  //     this.currentText.color = input.value;
  //   }
  // }

  // changeFontSize(event: Event): void {
  //   if (this.currentText) {
  //     const input = event.target as HTMLInputElement;
  //     this.currentText.size = +input.value;
  //   }
  // }
  

 CardDownload() {
    this.downloadButtonStatus = true;
    const cardTag = document.getElementById("upiIdCard");
    console.log("image download");

  }
  async download(dataUrl) {
    await Filesystem.requestPermissions();
    const savedFile = await Filesystem.writeFile({
      path: "order-bharat-images.jpeg",
      data: dataUrl,
      directory: Directory.Documents,
    });
  }

  capture() {
    //  console.log('Starting capture');
      html2canvas(this.captureElement.nativeElement).then(canvas => {
        console.log('Capture complete');
        this.image = canvas.toDataURL('image/png');
      }).catch(error => {
        console.error('Error capturing the image:', error);
      });
    }
  
  async reloadAndShare() {
    if (!this.image) {
      await this.capture();
    }

    const base64Data = this.image.split(',')[1];

    const fileName = 'qr-code.png';

    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache,
      });

      const uri = result.uri;

      await Share.share({
        title: 'Order Bharat QR Code',
        text: 'Order Bharat QR Code scan and order now!',
        url: uri,
        dialogTitle: 'Share Order Bharat QR Code',
      });
    } catch (error) {
      console.error('Error sharing the image:', error);
    }
  }
}
