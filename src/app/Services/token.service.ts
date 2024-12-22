import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  //   user_type: any;
  private apiKey: string;
  constructor(private http: HttpClient, private router: Router) {
   
    this.apiKey = '$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO';

  }
  baseurl() {
    return 'https://gbosss.com/Api_Orderbharatbusiness/';
  }

  apikey() {
    return '$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO';
  }
 

  getApiKey(): Promise<string> {
    return Promise.resolve(this.apiKey);
  }
    handle(token) {
      this.set(token);
    }

    set(token) {
      localStorage.setItem('token', token);
    }
    get() {
      return localStorage.getItem('token');
    }
    remove() {
      localStorage.removeItem('token');
    }
    isValid() {
      const token = this.get();
      if (token != '') {
        return true;
      } else {
        return false;
      }
    }
  //   loggedIn() {
  //     //this.router.navigateByUrl('/employer-dashboard');
  //     return this.isValid();
  //   }

}
