import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { interval, of, Subscription } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

@Directive({
  selector: 'input[appThrottle]',
})
export class ThrottleDirective implements OnDestroy {
  @Input() appThrottle = 0;

  private sub = new Subscription();

  constructor(private el: ElementRef) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @HostListener('keyup')
  onKeyUp(): void {
    this.sub.add(
      of(null).pipe(
        tap(() => this.el.nativeElement.disabled = true),
        delay(this.appThrottle),
        tap(() => this.el.nativeElement.disabled = null)
      ).subscribe()
    );
  }
}
