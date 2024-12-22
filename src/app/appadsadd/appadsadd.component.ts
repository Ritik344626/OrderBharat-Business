import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../Services/token.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

declare var Razorpay: any;
declare var google;
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

@Component({
  selector: 'appadsadd.component',
  templateUrl: 'appadsadd.component.html',
  styleUrls: ['appadsadd.component.scss'],
})
export class AppadsaddComponent implements OnInit {
  user_id: any = localStorage.getItem('user_id');
  company_id: any = localStorage.getItem('company_id');

  places: any[] = [];
  selectedLocation: any[] = [];
  query: string;
  placesSub: Subscription;
  private _places = new BehaviorSubject<any[]>([]);
  kmRange = { lower: 1, upper: 50 };
  selectKm = 10;
  businessdetails: any = [];
  map = null;
  markerPlace = [];
  markerPlaceCircle = [];
  start_date: any;
  end_date: any;
  location_km: any;
  maxprice: number;
  discount = 0;
  days: number = 0;
  gstPrice: number = 0;
  finalPrice: number = 0;

  strokeColor: any = [];
  response: any;
  currentLocation: any = {};
  address = '';
  state = '';
  pincode = '';
  loaded = false;
  otherdata: any;
  private searchSubject = new Subject<string>();
  searchSub: Subscription;
  subscription: number;

  get search_places() {
    return this._places.asObservable();
  }
  constructor(
    private zone: NgZone,
    private platform: Platform,
    private router: Router,
    public httpclient: HttpClient
  ) {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((query) => {
        this.onSearchChange(query);
      });
    this.platform = platform;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }

  ngOnInit(): void {
    this.getshopdetails();

    this.loadMap();
    this.start_date = new Date().toISOString();
    let days = 30;
    this.end_date = new Date(
      new Date().getTime() + days * 24 * 60 * 60 * 1000
    ).toISOString();

    console.log(this.start_date);
    console.log(this.end_date);
    this.placesSub = this.search_places.subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onSubscriptionChange(event: any) {
    console.log('Subscription changed:', event.detail.value);
    this.subscription = event.detail.value;

    const startDate = new Date();
    this.start_date = startDate.toISOString();
    const endDate = new Date(
      startDate.getTime() + this.subscription * 24 * 60 * 60 * 1000
    );

    this.end_date = endDate.toISOString();
    this.priceCalculation(this.start_date, this.end_date, this.selectKm);
  }
  loadMap() {
    const myLatLng = { lat: 20.5937, lng: 78.9629 };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      document.getElementById('map').classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    this.markerPlaceCircle.push(
      new google.maps.Circle({
        strokeColor: '#85b4f5',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#cadaee',
        fillOpacity: 0.35,
        map: this.map,
        center: marker.position,
        radius: Math.sqrt(this.selectKm) * 1000,
      })
    );
    this.map.setZoom(12);
    this.map.setCenter(marker.position);
    this.markerPlace.push(
      new google.maps.Marker({
        position: marker.position,
        center: marker.position,
        map: this.map,
        zoom: 10,
        title: marker.title,
        // icon: {
        //   url: 'https://toppng.com/uploads/preview/simple-location-map-pin-icon-blue-location-icon-11562928973mg6je', // url
        //   scaledSize: new google.maps.Size(40, 40), // scaled size
        // },
      })
    );
  }
  removeMarker() {
    if (this.markerPlace.length > 0) {
      this.markerPlace.forEach((mark) => {
        mark.setMap(null);
      });
    }
    if (this.markerPlaceCircle.length > 0) {
      this.markerPlaceCircle.forEach((mark) => {
        mark.setMap(null);
      });
    }
  }
  renderMarkers() {
    this.removeMarker();
    this.selectedLocation.forEach((marker) => {
      this.addMarker(marker);
    });
  }
  async onSearchInput(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  async onSearchChange(query: string) {
    if (query.length > 0) {
      await this.getPlaces(query);
    }
  }

  async getPlaces(query: string) {
    try {
      let service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: query,
        },
        (predictions) => {
          let autoCompleteItems = [];
          this.zone.run(() => {
            if (predictions != null) {
              predictions.forEach(async (prediction) => {
                let addr: any = await this.geoCode(prediction.description);
                let places = {
                  title: prediction.structured_formatting.main_text,
                  address: addr.address,
                  position: {
                    lat: addr.lat,
                    lng: addr.lng,
                  },
                };
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

  geoCode(address) {
    let addr = { address: '', state: '', pincode: '', lat: '', lng: '' };
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results) => {
        addr.address = results[0].formatted_address;
        addr.lat = results[0].geometry.location.lat();
        addr.lng = results[0].geometry.location.lng();
        resolve(addr);
      });
    });
  }
  selectedAddress(selectedPlace) {
    this.selectedLocation = [selectedPlace];

    this.currentLocation = {
      latitude: selectedPlace.position.lat,
      longitude: selectedPlace.position.lng,
    };
    console.log(this.currentLocation);
    this.query = selectedPlace.title;
    this.renderMarkers();

    this._places.next([]);
  }
  async removeLocation(location) {
    this.selectedLocation = await this.selectedLocation.filter((loc) => {
      return loc.title != location.title;
    });
    console.log(location);
    this.renderMarkers();
    // setTimeout(this.renderMarkers(), 4000);
  }
  onChangedRange($event) {
    this.selectKm = $event.detail.value;
    console.log(this.selectKm);
    this.renderMarkers();
  }

  priceCalculation(start_date, end_date, seletedKm) {
    //define two date object variables to store the date values
    var date1 = new Date(start_date);
    var date2 = new Date(end_date);

    //calculate time difference
    var time_difference = date2.getTime() - date1.getTime();
    //calculate days difference by dividing total milliseconds in a day
    this.days = Math.round(time_difference / (1000 * 3600 * 24));
    // days and price calculation
    if(this.days == 360){
      this.days = 360;
    }
    console.log(this.days)

    let perLocation = Math.round(this.days * this.priceFix(seletedKm, this.days));
    console.log(perLocation,'price from function')
    // location selection based on final price
    let price = Math.round(perLocation  + 13.3334 * this.days);
    this.discount = 0;
    this.maxprice = price;

    // Price               = 15000
    // Discount 10%=    1100
    // GST 18%        =   2502
    // Final Price = 16402

    // if (this.maxprice > 4000) {
    //   this.discount = ((this.maxprice - 4000) * 10) / 100;
    // }
    // this.gstPrice = ((this.maxprice - this.discount) * 18) / 100;
    // this.finalPrice = Math.round(this.maxprice - this.discount + this.gstPrice);

    
    this.gstPrice = ((this.maxprice) * 18) / 100;
    this.finalPrice = Math.round(this.maxprice + this.gstPrice);

    // console.log('priceFix::', finalPrice);
  }

  priceFix(kmRange: any, days:number): any {
    let price:number;

    if(days == 30){
      price = 10
    }
    else if(days == 90){
      price = 9.3334
    }
    else if(days == 180){
      price = 8.6667
    }
    else if(days == 360){
      price = 8.3334
    }
    //first 1 km
    if (kmRange == 1) {
      return 13.3334;
    } else {
      //first 1 km above calculation
      return price * (kmRange - 1);
    }
  }

  // 20km
  // 1*16.67
  // 50-1=19*10=190+16.67=206.67

  submitquery(event) {
    event.preventDefault();

    var options = {
      description: 'Order Bharat',
      image: 'https://gbosss.com/assets/images/logonew.jpg',
      currency: 'INR',
      key: 'rzp_test_FtINxmNlZ53qqU',
      // order_id: "order_9A33XWu170gUtm",
      amount: this.finalPrice * 100,
      prefill: {
        email: this.businessdetails.email,
        contact: +91 + this.businessdetails.phone,
      },
      name: 'Orderbharat ',
      theme: {
        color: '#3880ff',
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'Pay using UPI',
              instruments: [
                {
                  method: 'upi',
                },
              ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: false, // Should Checkout show its default blocks?
          },
        },
      },
      modal: {
        ondismiss: function () {
          alert('dismissed');
        },
      },
      handler: (response) => {
        console.log(response.razorpay_payment_id);
        this.pay(response.razorpay_payment_id);

        // this.paymentSuccess(response.razorpay_payment_id);
      },
    };

    this.platform.ready().then(() => {
      Razorpay.open(options);
    });
  }
  ngOnDestroy(): void {
    if (this.placesSub) this.placesSub.unsubscribe();
  }
  async pay(payment_id: any) {
    //note
    //latutute, landitute , state , address, pincode
    var location = await this.findLocationInfo(this.currentLocation);
    console.log('location:::', location);
    const startDate = new Date(this.start_date);
    const endDate = new Date(this.end_date);
    const address = {
      api_key: environment.apikey,
      start_date:
        startDate.getDate() +
        '-' +
        (startDate.getMonth() + 1) +
        '-' +
        startDate.getFullYear(),
      end_date:
        endDate.getDate() +
        '-' +
        (endDate.getMonth() + 1) +
        '-' +
        endDate.getFullYear(),
      days_number: this.days,
      redius: this.selectKm,
      maxprice: this.maxprice,
      discount: this.discount,
      gstprice: this.gstPrice,
      finalprice: this.finalPrice,
      company_id: this.company_id,
      user_id: this.user_id,
      payment_id: payment_id,
      latitude: this.currentLocation.latitude,
      longitude: this.currentLocation.longitude,
      address: this.address,
      state: this.state,
      pincode: this.pincode,
      status: '2',
    };
    console.log(address);
    this.httpclient
      .post(environment.apiBaseUrl + 'addadsdetails', address)
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          //     this.otherdata = this.response.data;
          // this.app_ads = this.response.data.app_ads;
          this.router.navigate(['/appads']);
          console.log(this.response.data.app_ads);
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.currentLocation = position.coords;
    var address = await this.findAddress(this.currentLocation);
    let addr = {
      address: address,
      title: address,
      position: {
        lat: this.currentLocation.latitude,
        lng: this.currentLocation.longitude,
      },
    };
    this.selectedLocation = [addr];
    this.query = this.selectedLocation[0].title;
    this.renderMarkers();
  }

  findAddress(selectedPlace) {
    var address = new Promise((resolve) => {
      this.httpclient
        .post(environment.apiBaseUrl + 'getfulladdress', [
          {
            api_key: environment.apikey,
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
          },
        ])
        .subscribe((res: any) => {
          console.log(res.data.address);
          resolve(res.data.address);
        });
    });
    return address;
  }

  findLocationInfo(selectedPlace) {
    console.log('selectedLocation:::', selectedPlace);
    var location = new Promise((resolve) => {
      this.httpclient
        .post(environment.apiBaseUrl + 'getfulladdress', [
          {
            api_key: environment.apikey,
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
          },
        ])
        .subscribe((res: any) => {
          console.log('getfull address api:::', res);
          var addr = { pincode: '', state: '', address: '' };
          addr.pincode = res.data.pincode;
          addr.address = res.data.address;
          addr.state = res.data.state_name;
          this.address = res.data.address;
          this.state = res.data.state_name;
          this.pincode = res.data.pincode;
          resolve(addr);
        });
    });
    return location;
  }

  getshopdetails() {
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
        this.loaded = true;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;
          // this.logo_images = this.response.data.logo_images;
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  // paymentSuccess( payment_id: any) {

  //     this.httpclient
  //     .post(environment.apiBaseUrl + 'addadsdetails',
  //       {
  //    api_key: environment.apikey,
  //    start_date: this.start_date,
  //    end_date: this.end_date,
  //    days_number: this.days,
  //    pickup_address: this.query,
  //    redius: this.selectKm,
  //    maxprice: this.maxprice,
  //    discount: this.discount,
  //    gstprice: this.gstPrice,
  //    finalprice: this.finalPrice,
  //    payment_id: payment_id,
  //    user_id: this.user_id,
  //    company_id: this.company_id
  //       },
  //     )
  //     .subscribe((res: any) => {
  //       this.response = res;

  //       if (this.response.success == true) {
  //    //     this.otherdata = this.response.data;
  //        // this.app_ads = this.response.data.app_ads;
  //         console.log(this.response.data.app_ads);
  //       } else if (this.response.success == false) {
  //         Swal.fire({
  //           title: 'Oops...',
  //           text: this.response.data.message,
  //           icon: 'warning',
  //           confirmButtonText: 'Ok',
  //         });
  //       }
  //     });

  //   // this.httpclient
  //   //   .post(environment.apiBaseUrl + "updateonlinepaymentdetails", [
  //   //     {
  //   //       api_key: environment.apikey,
  //   //      // order_id: order.order_id,
  //   //    //   order_status: true,
  //   //       payment_id: payment_id,
  //   //     },
  //   //   ])
  //   //   .subscribe((res: any) => {
  //   //     this.response = res;
  //   //   });
  // }
}
