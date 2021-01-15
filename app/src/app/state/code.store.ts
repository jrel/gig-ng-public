import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface CodeState {
  grid?: string[][];
  code?: number;
}

export function createInitialState(): CodeState {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'code' })
export class CodeStore extends Store<CodeState> {
  constructor() {
    super(createInitialState());
  }
}
