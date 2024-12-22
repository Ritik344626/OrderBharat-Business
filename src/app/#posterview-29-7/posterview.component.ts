import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
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

import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';




@Component({
  selector: 'app-posterview',
  templateUrl: './posterview.component.html',
  styleUrls: ['./posterview.component.scss'],
})
export class PosterviewComponent implements OnInit {
  @ViewChild('captureElement', { static: false }) captureElement: ElementRef;
  image: string;
  //@ViewChild("htmlContent") htmlContent: ElementRef;
  qrCodeData: string = '';
  qrCodeImage: string = '';
  backgroundImage: string;

  backgroundImagea: string;
  backImage: string;
  img: any;
  base64Data: string;
  converted_image: string;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }

  response: any;
  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = null;
  otherdata: any = [];
  userdetails: any = [];
  //image: any;
  user_id: any;
  company_id: any;

  base64File: any = null;

  name: any;
  phone: any;
  email: any;
  gstin: any;
  street: any;
  city: any;
  state: any;
  zip_code: any;
  country: any;
  imagedetails: any;

  qrcodelink: any;
  downloadButtonStatus = false;

  main_url: any;
  showQRCode = false;
  poster_category: string | null;
  poster_name: any;
  order_bharat_posters_id: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.poster_category = localStorage.getItem("poster_category");
    this.poster_name = localStorage.getItem("poster_name");
    this.order_bharat_posters_id = localStorage.getItem("order_bharat_posters_id");
    this.getshopdetails();
    this.getbackgroundimage();

 // this.backgroundImage = `https://orderbharat.com/uploads/posters/${this.poster_name}`;
  }

  getshopdetails() {
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
          this.userdetails = this.response.data.users;
          this.main_url = this.response.data.main_urlnew;


          

         //this.backgroundImage = `https://orderbharat.com/uploads/posters/${this.poster_name}`;

          //  console.log(this.businessdetails);
          //  console.log(this.main_url);

      //    console.log(this.userdetails);

        //  console.log(this.backgroundImage);
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

          // const imageUrl = this.response.data.imagedetails.image;

          // this.backgroundImage = `url('${imageUrl}')`;

          // console.log(this.backgroundImage = `url('${imageUrl}')`);  
          
          // this.base64Data=this.backgroundImage;
          // this.backgroundImagea= "data:image/jpeg;base64,"+this.base64Data;
          
          // console.log(this.backgroundImagea);  




          // this.backgroundImage = `url('data:image/jpeg;base64,${imageUrl}')`;


          // this.backgroundImagea = `wwwwwwwwwwww::` + `url('data:image/jpeg;base64,${imageUrl}')`;

          // console.log(this.backgroundImagea); 

     // this.otherdata = this.response.data;
    //  this.imagedetails = this.response.data.imagedetails.image;
    //  const img = new Image();
    //  img.src = this.imagedetails;
    //  console.log(this.img);
    //  const imageUrl = `https://orderbharat.com/uploads/posters/${this.img}`;
    //  this.backgroundImage = `url('${imageUrl}')`;

     
    // const imageBase64 = this.imagedetails; // Your base64 string here
     
     // Use the base64 image directly
    // this.backgroundImage = `url('data:image/png;base64,${imageBase64}')`;
     
     // Assuming you have an element to apply this background to, for example:
   //  const element = document.getElementById('your-element-id');
   //  element.style.backgroundImage = this.backgroundImage;
     

   // this.backgroundDiv.nativeElement.style.backgroundImage = `url('${imageUrl}')`;


         // this.businessdetails = this.response.data.businessdetails;
        //  this.userdetails = this.response.data.users;
        //  this.main_url = this.response.data.main_urlnew;

      //  this.backgroundImage = `https://orderbharat.com/uploads/posters/${this.img}`;

          //  console.log(this.businessdetails);
          //  console.log(this.main_url);

          //console.log(this.userdetails);

         // console.log(this.backgroundImage);
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


  upiIdCardDownload() {
    this.downloadButtonStatus = true;
 //   const cardTag = document.getElementById("upiIdCard");
    console.log("image download");

  }
  async download(dataUrl) {
    await Filesystem.requestPermissions();
    const savedFile = await Filesystem.writeFile({
      path: "MyUPI-Print.jpeg",
      data: dataUrl,
      directory: Directory.Documents,
    });
  }
  downloadQRCode() {
    this.showQRCode = true;
    setTimeout(() => {
      this.showQRCode = false;
    }, 2000);
  }

  // async share() {
  //   await Share.share({
  //     title: "Order Bharat QR Code",
  //     text: "QR Code",
  //     url: "https://gbosss.com/assets/order_bharat/qr/order-bharat-qr-code-"+this.company_id+".jpg",
  //     dialogTitle: "Share Order Bharat QR Code",
  //   });
  // }
  //myshopdetails?sd=281&ap=ttttttttttttttttttttttt



  // ngAfterViewInit() {
  //   this.qrcodelink = localStorage.getItem("qrcodelink");

  //   QRCode.toDataURL(this.qrCodeData)
  //     .then(url => {
  //       this.qrCodeImage = this.qrcodelink;

  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   setTimeout(() => {
  //     this.capture();
  //   }, 2000); // Adjust the delay as needed
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
  // this.httpclient
  //     .post(environment.apiBaseUrl + "getshopdetails", [
  //       {
  //         api_key: environment.apikey,
  //         user_id: this.user_id,
  //         company_id: this.company_id,
  //       },
  //     ])


  saveImage(imageUrl: string) {
    this.httpclient.get(imageUrl, { responseType: 'blob' }).subscribe(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;                
       //this.sendImageToServer(base64data);
      }
    }, error => {
      console.error('Error fetching the image:', error);
    });
  }


  // generateQRCode() {

  //  // this.qrcodelink = localStorage.getItem("qrcodelink");

  //   //this.qrCodeImage =this.qrcodelink;

  //   const urlToEncode = this.backgroundImage;
  //  // QRCode.toDataURL(urlToEncode)
  //    // .then(url => {
  //       this.backImage = urlToEncode;
  //   //  })
  //    // .catch(err => {
  //   //    console.error(err);
  //   //  });
  // }

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
