import { Component } from '@angular/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { TokenService } from '../Services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-messagingservice',
  templateUrl: './messagingservice.component.html',
  styleUrls: ['./messagingservice.component.scss'],
})
export default class MessagingserviceComponent {
  // constructor(
  //   private Token: TokenService,
  //   private httpclient: HttpClient,
  //   private router: Router,
  //   private Messagingservice: MessagingserviceComponent // private platform: Platform, // private routerOutlet: IonRouterOutlet
  // ) {
  //   // this.platform.backButton.subscribeWithPriority(-1, () => {
  //   //   // if (!this.routerOutlet.canGoBack()) {
  //   //   //   App.exitApp();
  //   //   // }
  //   //   App.exitApp();
  //   // });
  // }


  constructor(private http: HttpClient,  private httpclient: HttpClient, private Token: TokenService) {}

  domain: any = localStorage.getItem('domain');

  public gettoken() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions()
      .then((result) => {
        console.log(result);
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register().then((res) => {
            console.log(res);
          });
        } else {
          // Show some error
        }
      })
      .catch((res) => {
        console.log(res);
      });

    PushNotifications.addListener('registration', (token: Token) => {
     console.log(token.value);
      
        console.log('12');
     // if (localStorage.getItem('notificationtoken') != token.value) {
        console.log('12');
        localStorage.setItem('notificationtoken', token.value);

        this.httpclient
      .post(environment.apiBaseUrl + "addnotification", [
        {
          token: token.value,
          user_id: localStorage.getItem("user_id"),
          uid: localStorage.getItem("user_id")
        },
      ])

        // this.http.post(environment.apiBaseUrl + 'addnotification', [
        //     {
        //       user_id: localStorage.getItem('user_id'),
        //       uid: localStorage.getItem('user_id'),
        //       token: token.value,
        //     },
        //   ])
        //   .subscribe((result: any) => {
        //      console.log(result);
        //   });
      //}
    
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );

    // // this.fcm.getToken;
    // this.fcm.getToken().then((token) => {
    //   console.log(token);
    // });
    // // return this.fcm.getToken();
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyD1IYnklrIZssRASemAX-Yd6gG3Q9cI3As',
    //   authDomain: 'sweetchillis.firebaseapp.com',
    //   databaseURL: 'https://sweetchillis.firebaseio.com',
    //   projectId: 'sweetchillis',
    //   storageBucket: 'sweetchillis.appspot.com',
    //   messagingSenderId: '418156808358',
    //   appId: '1:418156808358:web:cc283875de60e2f6d00c67',
    //   measurementId: 'G-Z7VTTTW1L3',
    // });
    // const messaging = getMessaging();
    // // console.log(messaging);
    // getToken(messaging, {
    //   vapidKey:
    //     'BNrIzIypn8LSuEeIdcTHKWHXgOYhtkq4mhc6va4u_sPWBHU0TY1QZpjXTJDPEmmrDAPTwxXzQJGS5jUKCA6rLL8',
    // })
    //   .then((currentToken: any) => {
    //     // console.log(messaging);
    //     if (currentToken) {
    //       if (localStorage.getItem('notificationtoken') != currentToken) {
    //         // console.log(currentToken);
    //         localStorage.setItem('notificationtoken', currentToken);
    //         this.http
    //           .post(this.domain + 'addnotification', [
    //             {
    //               user_id: localStorage.getItem('user_id'),
    //               uid: localStorage.getItem('user_id'),
    //               token: currentToken,
    //             },
    //           ])
    //           .subscribe((result: any) => {
    //             // console.log(result);
    //           });
    //       }
    //       // Send the token to your server and update the UI if necessary
    //       // ...
    //     } else {
    //       // Show permission request UI
    //       console.log(
    //         'No registration token available. Request permission to generate one.'
    //       );
    //       // ...
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('An error occurred while retrieving token. ', err);
    //     // ...
    //   });
  }
}
