// src/app/long-press.directive.ts
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  @Output() longPress = new EventEmitter<void>();
  private pressing: boolean;
  private longPressTimeout: any;

  private pressTimeout: any;
  private readonly PRESS_DURATION = 500; // Duration in milliseconds to trigger long press

  constructor() { }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onPressStart(event: Event) {
    // this.pressTimeout = setTimeout(() => {
    //   this.longPress.emit(event);
    // }, this.PRESS_DURATION);


    this.pressing = true;
    this.longPressTimeout = setTimeout(() => {
      if (this.pressing) {
        this.longPress.emit();
      }
    }, 1000); // Adjust time (ms) for long press
    event.preventDefault();
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  onPressEnd() {
    this.pressing = false;
    clearTimeout(this.longPressTimeout);
  }
}
