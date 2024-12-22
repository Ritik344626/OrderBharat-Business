import { Component, OnInit, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
// import { Geolocation } from "@capacitor/geolocation";
import { environment } from "../../environments/environment";
// const { Geolocation } = Plugins;
import { Geolocation } from "@capacitor/geolocation";
import { BehaviorSubject, Subscription } from "rxjs";
declare var google;

@Component({
  selector: "app-editstreet",
  templateUrl: "./editstreet.component.html",
  styleUrls: ["./editstreet.component.scss"],
})
export class EditstreetComponent implements OnInit {
  latitude: any;
  longitude: any;

  constructor(
    private zone: NgZone,
    private Token: TokenService,
    private httpclient: HttpClient,
    private http: HttpClient,
    private router: Router
  ) {}

  businessestreet: any;
  pincode: any;
  state: any = "";
  city_id: any = "";
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  stateslistdata: any;
  cityslistdata: any;
  state_id: any = "";

  query: string = "";
  locations: any[] = [];

  // search
  placesSub: Subscription;
  places: any[] = [];
  private _places = new BehaviorSubject<any[]>([]);

  selectedLocation: any = {
    title: "",
    address: "",
    position: {
      lat: 0.0,
      lng: 0.0,
    },
  };

  get search_places() {
    return this._places.asObservable();
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.getallStates();
    this.cityallslistdata();
    this.placesSub = this.search_places.subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  async getLocation() {
    const currentLocation = await Geolocation.getCurrentPosition();

    // this.showPosition(position);
    this.selectedLocation.position.lat = currentLocation.coords.latitude;
    this.selectedLocation.position.lng = currentLocation.coords.longitude;

    this.selectedAddress(this.selectedLocation);
  }
  //  success(pos:any) {
  //     const crd = pos.coords;

  //     console.log('Your current position is:');
  //     console.log(`Latitude : ${crd.latitude}`);
  //     console.log(`Longitude: ${crd.longitude}`);
  //     console.log(`More or less ${crd.accuracy} meters.`);
  //   }

  //   error(err:any) {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   }
  // trackMe() {
  //   const coordinates1 =  Geolocation.checkPermissions();
  //   const coordinates =  Geolocation.getCurrentPosition();
  //   const options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   };
  //   if (navigator.geolocation) {
  //     this.isTracking = true;
  //   // /  navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       console.log(position);
  //       this.showPosition(position);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  getallStates() {
    this.httpclient
      .post(environment.apiBaseUrl + "getallStates", [
        {
          api_key: environment.apikey,
        },
      ])
      .subscribe((res: any) => {
        this.stateslistdata = res.data;
		console.log(this.stateslistdata)
      });
  }

  stateid(id: any) {
    this.state_id = id.target.value;
    localStorage.setItem("state_id", this.state_id);
    this.city_id = "";
    this.cityallslistdata();
  }

  cityallslistdata() {
    this.httpclient
      .post(environment.apiBaseUrl + "getallCity", [
        {
          api_key: environment.apikey,
          state_id: localStorage.getItem("state_id"),
        },
      ])
      .subscribe((res: any) => {
        this.cityslistdata = res.data;
      });
  }

  submitquery() {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + "editbusinessstreet", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          businessestreet: this.businessestreet,
          state: this.state,
          pincode: this.pincode,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          Swal.fire({
            title: "Success",
            text: this.response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.router.navigate(["/editprofile"]);
          });
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

  async onSearchChange(event: any) {
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
    let addr = { address: "", state: "", pincode: "", lat: 0.0, lng: 0.0 };
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
    this.selectedLocation = selectedPlace;
    console.log("selectedLocation:::", this.selectedLocation);
    this.query = "";
    this._places.next([]);
    console.log("query:::", this.query);

    this.httpclient
      .post(environment.apiBaseUrl + "getfulladdress", [
        {
          api_key: environment.apikey,
          latitude: this.selectedLocation.position.lat,
          longitude: this.selectedLocation.position.lng,
        },
      ])
      .subscribe((res: any) => {
        // this.response = res;
        console.log("getfull address api:::", res);
        this.state = res.data.state;
		console.log(this.state)
        this.pincode = res.data.pincode;
        this.businessestreet = res.data.address;
        localStorage.setItem("state_id", res.data.state);
        this.cityallslistdata();
      });
  }
}
