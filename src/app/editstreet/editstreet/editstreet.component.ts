import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Geolocation } from '@capacitor/geolocation';
import { TokenService } from 'src/app/Services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-editstreet',
  templateUrl: './editstreet.component.html',
  styleUrls: ['./editstreet.component.scss'],
})
export class EditstreetComponent implements OnInit {
  isTracking: any;
  currentLat: any;
  currentLong: any;

  
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  businessestreet: any;
  pincode: any;
  state: any = '';
  city_id: any = '';
  response: any;
  user_id: any;
  company_id: any;
  business_info_category_id: any;
  business_details_id: any;
  stateslistdata: any;
  cityslistdata: any;
  state_id: any = 0;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');   
    this.getallStates();
    this.cityallslistdata();
  }
  trackMe() {
    const coordinates1 =  Geolocation.checkPermissions();
    const coordinates =  Geolocation.getCurrentPosition();
 
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
       // console.log(position);
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position: GeolocationPosition) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.httpclient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.currentLat+','+this.currentLong+'&key=AIzaSyAF0fKbjixO5qY53OrmMzeXjTaztv0NIwU',)
    .subscribe((res: any) => {
      this.response = res;
      
      for(var i=0;i<this.stateslistdata.length;i++){
        if(this.response.results[8].address_components[0].long_name==this.stateslistdata[i].name){
      
      this.state=this.stateslistdata[i].id;
      localStorage.setItem('state_id', this.state_id);
      this.cityallslistdata();
        }
      }
      console.log(this.response.results[6].address_components[0].long_name);
      for(var i=0;i<this.cityslistdata.length;i++){
        if(this.response.results[6].address_components[0].long_name==this.cityslistdata[i].name){
    
      this.city_id=this.cityslistdata[i].id;
        }
      }
      this.pincode=this.response.results[5].address_components[0].long_name;
      this.businessestreet=this.response.results[0].formatted_address;
      //this.address=this.response.results[0].formatted_address;
       console.log(this.response.results[7].address_components[0].long_name);
      // console.log(this.response.results[9].address_components[0].long_name);
      //console.log(this.response.results[6].address_components[0].long_name);
      
      // console.log(this.response.results[4].address_components[0].long_name);
      // console.log(this.response.results[3].address_components[0].long_name);
    
    });
  
  }
  getallStates() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getallStates', [
        {
          api_key: environment.apikey,
        },
      ])
      .subscribe((res: any) => {
        this.stateslistdata = res.data;
      });
  }

  stateid(id: any) {
    this.state_id = id.target.value;
    localStorage.setItem('state_id', this.state_id);
    this.city_id = '';
    this.cityallslistdata();
  }

  cityallslistdata() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getallCity', [
        {
          api_key: environment.apikey,
          state_id: localStorage.getItem('state_id'),
        },
      ])
      .subscribe((res: any) => {
        this.cityslistdata = res.data;
      });
  }


  submitquery() {
    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + 'editbusinessstreet', [
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
            title: 'Success',
            text: this.response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.router.navigate(['/editprofile']);
          });
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

}