import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { TokenService } from '../Services/token.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';
// import { environment } from '../../environments/environment';
//import Swal from 'sweetalert2';
import {
  IonHeader,
  IonToolbar,
  IonFab,
  IonContent,
  IonTitle,
  IonButton,
  IonSearchbar,
  IonItem,
  IonList,
  IonLabel,
  //IonInput,
} from '@ionic/angular/standalone';
declare var google: {
  maps: {
    places: { AutocompleteService: new () => any };
    Geocoder: new () => any;
  };
};

@Component({
  selector: 'app-appadsadd',
  templateUrl: './appadsadd.component.html',
  styleUrls: ['./appadsadd.component.scss'],
  standalone: true,

  imports: [
    //IonInput,
    FormsModule,
    IonicModule,
    CommonModule,
  ],
})
export class AppadsaddComponent implements OnInit {
  places: any[] = [];
  query: string;
  placesSub: Subscription | undefined;
  private _places = new BehaviorSubject<any[]>([]);
  name: any;

  get search_places() {
    return this._places.asObservable();
  }
  // selectedDate: string | undefined;
  // selectedRange: number = 50;

  kmRange = { lower: 0, upper: 50 }; // Initial range values

  constructor(
    // private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    private zone: NgZone
  ) {}

  adsin: any = '1';
  adsinv1: any;
  adsinv2: any;
  adsinv3: any;
  adsinv4: any;

  adsinv: boolean = false;
  ads_name: any;
  response: any;
  user_id: any;
  company_id: any;
  gstregtype: any = '';
  stateslistdata: any;
  topcategorylistdata: any;
  reffer_id: any;
  value: any;

  shopname: any;
  shopphone: any;
  appsname: any;
  appslink: any;

  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = [];
  bankdetails: any = [];
  otherdata: any = [];
  image: any;
  base64File: any = null;

  title: any;
  latLng: any;
  lagLngi: any;
  lagLng: any;
  start_date: any;
  end_date: any;
  location_km: any;
  maxprice: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
    this.getprofiledetail();
    this.getshopdetails();
    this.placesSub = this.search_places.subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // chkgstin() {
  //   if(this.adsin == 1){
  //     this.adsinv = true;
  //     this.adsinv1 = false;
  //     this.adsinv2 = false;
  //     this.adsinv3 = false;
  //   }
  //   else if(this.adsin == 2){
  //     this.adsinv1 = false;
  //     this.adsinv = true;
  //     this.adsinv2 = false;
  //     this.adsinv3 = true;
  //   }
  //   else if(this.adsin == 3){
  //     this.adsinv2 = false;
  //     this.adsinv = false;
  //     this.adsinv1 = true;
  //     this.adsinv3 = false;
  //   }
  //   else if(this.adsin == 4){
  //     this.adsinv2 = true;
  //     this.adsinv = false;
  //     this.adsinv1 = false;
  //     this.adsinv3 = false;
  //   }
  //   else {
  //     this.adsinv = true;
  //     this.adsinv1 = false;
  //     this.adsinv2 = false;
  //     this.adsinv3 = false;
  //   }
  // }

  onItemChange(value: any) {
    console.log(' Value is : ', value);
  }

  getprofiledetail() {
    console.log(this.company_id);
    // this.httpclient
    //   .post(environment.apiBaseUrl + 'getprofiledetail', [
    //     {
    //       api_key: environment.apikey,
    //       user_id: this.user_id,
    //       company_id: this.company_id,
    //     },
    //   ])
    //   .subscribe((res: any) => {
    //     this.response = res;

    //     if (this.response.success == true) {
    //       this.profiledata = this.response.data.profiledata;
    //       this.imagedata = this.response.data.imagedata;

    //       if (this.profiledata.name != 0) {
    //         this.name = this.profiledata.name;
    //       } else {
    //         this.name = null;
    //       }

    //       //   if (this.profiledata.phone != 0) {
    //       //     this.phone = this.profiledata.phone;
    //       //   } else {
    //       //     this.phone = null;
    //       //   }

    //       //   if (this.profiledata.email != 0) {
    //       //     this.email = this.profiledata.email;
    //       //   } else {
    //       //     this.email = null;
    //       //   }

    //       //   if (this.profiledata.gstin != 0) {
    //       //     this.gstin = this.profiledata.gstin;
    //       //   } else {
    //       //     this.gstin = null;
    //       //   }

    //       //   if (this.profiledata.state != 0) {
    //       //     this.state = this.profiledata.state;
    //       //   } else {
    //       //     this.state = null;
    //       //   }

    //       //   if (this.profiledata.street != 0) {
    //       //     this.street = this.profiledata.street;
    //       //   } else {
    //       //     this.street = null;
    //       //   }

    //       //   if (this.profiledata.city != 0) {
    //       //     this.city = this.profiledata.city;
    //       //   } else {
    //       //     this.city = null;
    //       //   }

    //       //   if (this.profiledata.zip_code != 0) {
    //       //     this.zip_code = this.profiledata.zip_code;
    //       //   } else {
    //       //     this.zip_code = null;
    //       //   }

    //       //   if (this.profiledata.country != 0) {
    //       //     this.country = this.profiledata.country;
    //       //   } else {
    //       //     this.country = null;
    //       //   }

    //       //   if (this.imagedata != null) {
    //       //     this.image =
    //       //       'https://gbosss.com/assets/images/business/' +
    //       //       this.imagedata.image;
    //       //   } else {
    //       //     this.image = 'assets/images/demo.jpg';
    //       //   }
    //       // } else if (this.response.success == false) {
    //       //   Swal.fire({
    //       //     title: 'Oops...',
    //       //     text: this.response.data.message,
    //       //     icon: 'warning',
    //       //     confirmButtonText: 'Ok',
    //       //   });
    //     }
    //   });
  }

  getshopdetails() {
    // this.httpclient
    //   .post(environment.apiBaseUrl + 'getshopdetails', [
    //     {
    //       api_key: environment.apikey,
    //       user_id: this.user_id,
    //       company_id: this.company_id,
    //     },
    //   ])
    //   .subscribe((res: any) => {
    //     this.response = res;
    //     if (this.response.success == true) {
    //       this.otherdata = this.response.data;
    //       this.businessdetails = this.response.data.businessdetails;
    //     } else if (this.response.success == false) {
    //       Swal.fire({
    //         title: 'Oops...',
    //         text: this.response.data.message,
    //         icon: 'warning',
    //         confirmButtonText: 'Ok',
    //       });
    //     }
    //   });
  }

  submitquery() {
    // this.httpclient
    //   .post(environment.apiBaseUrl + 'addads', [
    //     {
    //       api_key: environment.apikey,
    //       user_id: this.user_id,
    //       company_id: this.company_id,
    //       ads_name: this.ads_name,
    //       start_date: this.start_date,
    //       adsin: this.adsin,
    //       end_date: this.end_date,
    //       appsname: this.appsname,
    //       appslink: this.appslink,
    //       location_km: this.location_km,
    //       maxprice: this.maxprice,
    //     },
    //   ])
    //   .subscribe((res: any) => {
    //     this.response = res;
    //     if (this.response.success == true) {
    //       this.router.navigate(['/appads']);
    //     } else if (this.response.success == false) {
    //       Swal.fire({
    //         title: 'Oops...',
    //         text: this.response.data.message,
    //         icon: 'warning',
    //         confirmButtonText: 'Ok',
    //       });
    //     }
    //   });
  }

  // priceRange() {
  //   console.log('Selected Range:', this.priceRange);
  // }
  async onSearchChange(event: any) {
    console.log(event);
    this.query = event.detail.value;
    if (this.query.length > 0) await this.getPlaces();
  }
  async getPlaces() {
    try {
      let service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: this.query,
        },
        (predictions: any[] | null) => {
          let autoCompleteItems: any = [];
          this.zone.run(() => {
            if (predictions != null) {
              predictions.forEach(async (prediction) => {
                console.log('prediction: ', prediction);
                let latLng: any = await this.geoCode(prediction.description);
                let places = {
                  title: prediction.structured_formatting.main_text,
                  address: prediction.description,
                  lat: latLng.lat,
                  lng: latLng.lng,
                };
                console.log('places: ', places);
                autoCompleteItems.push(places);
              });
              // this.places = autoCompleteItems;
              // console.log('final places', this.places);
              // rxjs behaviorSubject
              this._places.next(autoCompleteItems);
            }
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  geoCode(address: any) {
    let latlng = { lat: '', lng: '' };
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: address },
        (
          results: {
            geometry: {
              location: {
                lat(): string;
                lng: () => string;
              };
            };
          }[]
        ) => {
          console.log('results: ', results);
          latlng.lat = results[0].geometry.location.lat();
          latlng.lng = results[0].geometry.location.lng();
          resolve(latlng);
        }
      );
    });
  }
  selectedAddress(selectedPlace: { address: string; lat: any; lng: any }) {
    this.query = selectedPlace.address;
    this.latLng = selectedPlace.lat;
    this.lagLngi = selectedPlace.lng;
    console.log(this.query);

    this._places.next([]);
  }

  ngOnDestroy(): void {
    if (this.placesSub) this.placesSub.unsubscribe();
  }

  editprofileaddress(data: any) {
    console.log(data);
    //   this.httpclient

    //     .post(this.Token.baseurl() + 'editprofileaddress', [
    //       {
    //         api_key: this.Token.apikey(),
    //         //   visitor_id: this.visitor_id,
    //         address: this.query,
    //         state: this.latLng,
    //         city_id: this.lagLngi,
    //         //  pincode: data.value.pincode,

    //         // address: data.value.address,
    //         // state: data.value.state,
    //         // city_id: data.value.city_id,
    //         // pincode: data.value.pincode,
    //       },
    //     ])
    //     .subscribe((res: any) => {
    //       this.response = res;

    //       if (this.response.success == true) {
    //         // Swal.fire({
    //         //   title: 'Success',
    //         //   text: this.response.data.message,
    //         //   icon: 'success',
    //         //   confirmButtonText: 'Ok',
    //         // }).then(() => {
    //         //   this.router.navigate(['/aboutme']);
    //         // });

    //         this.router.navigate(['/aboutme']);
    //       } else if (this.response.success == false) {
    //         // Swal.fire({
    //         //   title: 'Oops...',
    //         //   text: this.response.data.message,
    //         //   icon: 'warning',
    //         //   confirmButtonText: 'Ok',
    //         // });
    //       }
    //     });
  }
}
