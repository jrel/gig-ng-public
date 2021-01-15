import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CodeStore, CodeState } from './code.store';

@Injectable({ providedIn: 'root' })
export class CodeQuery extends Query<CodeState> {
  selectGrid$ = this.select('grid');
  selectCode$ = this.select('code');

  constructor(protected store: CodeStore) {
    super(store);
  }

  get isStarted(): boolean {
    return this.getValue().grid !== undefined;
  }


}
