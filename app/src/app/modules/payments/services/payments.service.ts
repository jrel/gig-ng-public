import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  first,
  map,

  switchMap
} from 'rxjs/operators';
import { CodeGeneratorService } from 'src/app/services/code-generator.service';
import { CreatePayment, Payment } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  constructor(
    private http: HttpClient,
    private codeService: CodeGeneratorService
  ) {}

  create({
    body: partcialBody,
  }: {
    body: Omit<CreatePayment, 'code' | 'grid'>;
  }): Observable<{ data: Payment }> {
    return this.codeService.getData().pipe(
      first(),
      map((data) => {
        const { grid, code } = data ?? {};
        if (grid === undefined) {
          throw new Error('Grid has not been generated!');
        }
        if (code === undefined) {
          throw new Error('Code has not been generated!');
        }
        return {
          ...partcialBody,
          grid: grid.map((row) => row.join('')).join('\n'),
          code,
        } as CreatePayment;
      }),
      switchMap((body) =>
        this.http.post<{ data: Payment }>('/api/payments', body)
      )
    );
  }

  request(): Observable<{ data: Payment[] }> {
    return this.http.get<{ data: Payment[] }>('/api/payments');
  }
}
