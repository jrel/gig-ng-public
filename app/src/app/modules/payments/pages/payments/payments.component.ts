import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { linear, special } from 'src/app/utils/random';
import {
  delay,
  map,
  mapTo,
  pluck,
  startWith,
  switchMap,
  switchMapTo,
  tap,
  timeout,
  timeoutWith,
} from 'rxjs/operators';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';
import { CodeGeneratorService } from '../../../../services/code-generator.service';
import { PaymentsService } from '../../services/payments.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-module-payments-page-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPageComponent {
  code$: Observable<number>;
  payments$: Observable<Payment[]>;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    ammount: new FormControl('', Validators.required),
  });

  private refresh$ = new BehaviorSubject<unknown>(null);
  sub: any;

  constructor(
    codeService: CodeGeneratorService,
    private service: PaymentsService
  ) {
    this.code$ = codeService.getData().pipe(pluck('code'));
    this.payments$ = this.refresh$.pipe(
      switchMap(() => this.service.request()),
      pluck('data')
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const body: Omit<Payment, 'code' | 'grid'> = this.form.value;
    this.sub = this.service.create({ body }).subscribe({
      next: () => this.refresh$.next(null),
      error: (err) => alert(err),
    });
  }
}
