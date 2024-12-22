import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { environment } from '../../environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-posterview',
  templateUrl: './posterview.component.html',
  styleUrls: ['./posterview.component.scss'],
})
export class PosterviewComponent implements OnInit {

  @ViewChild('captureElement', { static: false }) captureElement: ElementRef;
  image: string;

  logoImage: string = '';
  backgroundImage: string = '';
  overlayImage: string = '';
  texts: Array<{
    content: string;
    size: number;
    color: string;
    top: number;
    left: number;
  }> = [];
  newText: {
    content: string;
    size: number;
    color: string;
    top: number;
    left: number;
  } = { content: '', size: 14, color: '#000000', top: 40, left: 1 };
  // logo: { top: number; left: number; width: number; height: number } = {
  //   top: 82,
  //   left: 78,
  //   width: 80,
  //   height: 80,
  // }; // Initial position and size of the logo
  isDragging: boolean = false;
  currentText: any;
  offsetX: number = 0;
  offsetY: number = 0;

  public isControlsVisible = false;

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
  poster_name: any;

  //loader indicator
  loaded = false;

  qrcodelink: any;
  downloadButtonStatus = false;
  base64File: any = null;

  main_url: any;
  poster_category: string | null;
  order_bharat_posters_id: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('user_id')) {
      this.router.navigate(['/']);
    }
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');

    this.poster_name = localStorage.getItem("poster_name");
    this.poster_category = localStorage.getItem("poster_category");
    this.order_bharat_posters_id = localStorage.getItem("order_bharat_posters_id");
    this.getshopdetails();
    this.getbackgroundimage();
  }

  getshopdetails() {
    console.log(this.poster_name);
    console.log(this.poster_category);
  
    this.httpclient
      .post(environment.apiBaseUrl + 'getshopdetails', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        if (this.response.success) {
          this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;
          this.productcount = this.response.data.productcount;
          this.orderplaced = this.response.data.orderplaced;
          this.ordercompleted = this.response.data.ordercompleted;
  
          this.overlayImage = '/assets/images/overlayer.png';
         // this.backgroundImage = `https://orderbharat.com/uploads/posters/${this.poster_name}`;

        //  this.backgroundImage = `/assets/images/poster/15-august.jpg`;
  
          console.log(this.backgroundImage);
  
          this.newText.content =
            `${this.businessdetails.name}<br>
            <div class="phone-text" id="phone-text">
              <i class="fa fa-phone" aria-hidden="true"></i> &nbsp;${this.businessdetails.phone}
            </div>
            <span class="address-text">
              <i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp;${this.businessdetails.street}
            </span>`;
  
          setTimeout(() => {
            const phoneTexts = document.getElementsByClassName('phone-text');
            if (phoneTexts) {
              for (let i = 0; i < phoneTexts.length; i++) {
                phoneTexts[i].setAttribute('style', 'margin-top:10px; color:#2f2f2f;');
              }
            }
            const addressTexts = document.getElementsByClassName('address-text');
            if (addressTexts) {
              for (let i = 0; i < addressTexts.length; i++) {
                addressTexts[i].setAttribute('style', 'font-size: 13px; color: rgb(47, 47, 47);font-weight: normal;display: block;margin-top: 9px;');
              }
            }
          }, 0);
  
          if (this.businessdetails.name.length > 20) {
            this.bnm = this.businessdetails.name.substring(0, 20);
          } else {
            this.bnm = this.businessdetails.name;
          }
        } else if (!this.response.success) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }


  getbackgroundimage() {
    this.httpclient
      .post(environment.apiBaseUrl + "getbackgroundimage", [
        {
          api_key: environment.apikey,
          order_bharat_posters_id: this.order_bharat_posters_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {

          const base64Image = this.response.data.imagedetails.image;
          this.backgroundImage = `data:image/png;base64,${base64Image}`;

         
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
  
  async saveImage(image?: string) {
    const element = document.getElementById('image-container');
    if (element) {
      try {
        const canvas = await html2canvas(element, { useCORS: true });
  
        // Resize the captured canvas to 1024x1024
        const resizedCanvas = document.createElement('canvas');
        const resizedCtx = resizedCanvas.getContext('2d');
        const targetWidth = 1024;
        const targetHeight = 1024;
        resizedCanvas.width = targetWidth;
        resizedCanvas.height = targetHeight;
        resizedCtx?.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          targetWidth,
          targetHeight
        );
  
        // Convert the resized canvas to a data URL
        const resizedImage = resizedCanvas.toDataURL('image/png');
  
        // Create a link to download the resized image
        const link = document.createElement('a');
        link.href = resizedImage;
        link.download = 'image-overlay.png';
  
        // Append the link to the document body and programmatically click it
        document.body.appendChild(link);
        link.click();
  
        // Clean up: remove the link from the document body
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating or saving the image:', error);
      }
    } else {
      console.error('Element not found: image-container');
    }
  }
  
  // async saveAndShareImage() {
  //   const element = document.getElementById('image-container');
  //   if (!element) {
  //     console.error('Element not found: image-container');
  //     return;
  //   }

  //   const loading = await this.loadingController.create({
  //     message: 'Generating image...',
  //   });
  //   await loading.present();

  //   try {
  //     console.log('Capturing the element...');

  //     const canvas = await html2canvas(element, { useCORS: true });

  //     const resizedCanvas = document.createElement('canvas');
  //     const context = resizedCanvas.getContext('2d');
  //     resizedCanvas.width = 1024;
  //     resizedCanvas.height = 1024;

  //     if (!context) {
  //       throw new Error('Failed to get canvas context');
  //     }

  //     context.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);

  //     resizedCanvas.toBlob(async (blob) => {
  //       if (!blob) {
  //         throw new Error('Failed to convert canvas to Blob');
  //       }

  //       const reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = async () => {
  //         const result = reader.result as string;
  //         const base64Data = result.split(',')[1];
  //         const fileName = `order-bharat-${new Date().getTime()}.png`;

  //         const savedFile = await Filesystem.writeFile({
  //           path: fileName,
  //           data: base64Data,
  //           directory: Directory.Documents,
  //         });

  //         console.log('File saved:', savedFile);

  //         await Share.share({
  //           title: '',
  //           text: '',
  //           url: savedFile.uri,
  //           dialogTitle: 'Share this image',
  //         });

  //         console.log('Image shared successfully');
  //       };
  //     }, 'image/png');
  //   } catch (error) {
  //     console.error('Error generating or saving the image:', error);
  //   } finally {
  //     await loading.dismiss();
  //   }
  // }


  capture() { 
    html2canvas(this.captureElement.nativeElement, { useCORS: true })
      .then(canvas => {
        console.log('Capture complete');
        this.image = canvas.toDataURL('image/png');
        // Here you can add logic to send the image to the server
        this.saveImage(this.image);
      })
      .catch(error => {
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

  goBack() {
    if (this.poster_category) {
        this.router.navigate(['/posterslist']);
    } else {
        this.router.navigate(['/home']);
    }
  }



   
  }
