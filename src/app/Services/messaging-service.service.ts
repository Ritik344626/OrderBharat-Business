import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { environment } from '../../environments/environment';
import { catchError, from, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessagingServiceService {
  constructor(private http: HttpClient,  private httpclient: HttpClient, private Token: TokenService) {}

  domain: any = localStorage.getItem('domain');

  public gettoken(): Observable<string> {
    return from(PushNotifications.requestPermissions()).pipe(
      switchMap((result) => {
        if (result.receive === 'granted') {
          return from(PushNotifications.register()).pipe(
            switchMap(() => {
              return new Observable<string>((observer) => {
                PushNotifications.addListener('registration', (token: Token) => {
                  if (localStorage.getItem('notificationtoken') !== token.value) {
                    localStorage.setItem('notificationtoken', token.value);
                    observer.next(token.value);
                    observer.complete();
                  } else {
                    observer.next(token.value);
                    observer.complete();
                  }
                });

                PushNotifications.addListener('registrationError', (error: any) => {
                  observer.error('Error on registration: ' + JSON.stringify(error));
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
              });
            })
          );
        } else {
          throw new Error('Permission not granted for push notifications');
        }
      }),
      catchError((error) => {
        console.error(error);
        return new Observable<string>((observer) => {
          observer.error(error);
        });
      })
    );
  }
}
