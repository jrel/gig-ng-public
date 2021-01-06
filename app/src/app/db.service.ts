import { InMemoryDbService as LibInMemoryDbService } from 'angular-in-memory-web-api';
import { Payment } from './modules/payments/models/payment.model';

interface DbModel {
  payments: Payment[];
}

export class InMemoryDbService implements LibInMemoryDbService {
  createDb(): DbModel {
    return {
      payments: [],
    };
  }

  genId<T extends { id: number }>(collection: T[]): any {
    const maxId = collection.reduce(
      (prev: number, item: any) => Math.max(prev, item.id),
      0
    );

    return maxId + 1;
  }
}
