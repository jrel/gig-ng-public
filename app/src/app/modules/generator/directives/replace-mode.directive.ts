import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: 'input[appReplaceMode]',
})
export class ReplaceModeDirective {
  constructor(private el: ElementRef) {
  }
  @HostListener('keypress')
  onKeyUp(): void {
    this.el.nativeElement.value = this.el.nativeElement.value.substring(0, this.el.nativeElement.value.length - 1);
  }
}
