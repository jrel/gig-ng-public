import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import { CodeQuery } from 'src/app/state/code.query';
import { Payment } from '../../models/payment.model';
import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-module-payments-page-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPageComponent {
  code$: Observable<number | undefined>;
  payments$: Observable<Payment[]>;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    ammount: new FormControl('', Validators.required),
  });

  private refresh$ = new BehaviorSubject<unknown>(null);

  constructor(private service: PaymentsService, private codeQuery: CodeQuery) {
    this.code$ = codeQuery.selectCode$;

    this.payments$ = this.refresh$.pipe(
      switchMap(() => this.service.request()),
      pluck('data')
    );
  }

  onSubmit(): void {
    if (this.form.invalid || !this.codeQuery.isStarted) {
      return;
    }

    const body: Omit<Payment, 'code' | 'grid'> = this.form.value;
    this.service.create({ body }).subscribe({
      next: () => this.refresh$.next(null),
      error: (err) => alert(err),
    });
  }
}
