import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeQuery } from 'src/app/state/code.query';
import { CreatePayment, Payment } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  constructor(private http: HttpClient, private codeQuery: CodeQuery) {}

  create({
    body: partcialBody,
  }: {
    body: Omit<CreatePayment, 'code' | 'grid'>;
  }): Observable<{ data: Payment }> {
    const { code, grid } = this.codeQuery.getValue();
    const body: CreatePayment = {
      ...partcialBody,
      code: code as number,
      grid: (grid as string[][]).map((row) => row.join('')).join('\n'),
    };

    return this.http.post<{ data: Payment }>('/api/payments', body);
  }

  request(): Observable<{ data: Payment[] }> {
    return this.http.get<{ data: Payment[] }>('/api/payments');
  }
}
