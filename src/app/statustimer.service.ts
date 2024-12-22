import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatustimerService {

  private timerSubject = new BehaviorSubject<number>(0);
  timer$ = this.timerSubject.asObservable();

  private onTickCallback: (millisecondsRemaining: number) => void;
  private onStartCallback: () => void;
  private onEndCallback: () => void;

  startTimer(durationInMilliseconds: number, onTick: (millisecondsRemaining: number) => void, onStart: () => void, onEnd: () => void): void {
    this.onTickCallback = onTick;
    this.onStartCallback = onStart;
    this.onEndCallback = onEnd;

    let remainingTime = durationInMilliseconds;
    const interval = 10; // Set a smaller interval, like 10 milliseconds

    const timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime -= interval;
        this.timerSubject.next(remainingTime);
        this.onTickCallback(remainingTime);
      } else {
        clearInterval(timerInterval);
        this.onEndCallback();
      }
    }, interval);

    this.onStartCallback();
  }
}
