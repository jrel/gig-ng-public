import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodeStore } from './code.store';
import { tap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { linear, special } from 'src/app/utils/random';

const A_CODE = 'a'.codePointAt(0) as number;
const Z_CODE = 'z'.codePointAt(0) as number;

@Injectable({ providedIn: 'root' })
export class CodeService {
  private sub = new Subscription();
  constructor(private codeStore: CodeStore, private http: HttpClient) {}

  startGenerating(char?: string): void {
    this.sub.unsubscribe();
    this.sub = interval(2000).subscribe({
      next: () => {
        const grid = this.generateGrid(char);
        const code = this.calcuateCode(grid);
        this.codeStore.update({
          grid,
          code,
        });
      },
    });
  }

  private calcuateCode(grid: string[][]): number {
    const seconds = new Date().getSeconds().toString().padStart(2, '0');
    const counts = this.calculateOccurrencesOfChars(grid);
    const step1 = [+seconds[0], +seconds[1]];
    const step2 = [grid[step1[0]][step1[1]], grid[step1[1]][step1[0]]];
    const step3 = [counts[step2[0]], counts[step2[1]]];
    const step4 = [
      this.getLowerInteger(step3[0]),
      this.getLowerInteger(step3[1]),
    ];
    return +step4.join('');
  }

  private calculateOccurrencesOfChars(
    grid: string[][]
  ): { [char: string]: number } {
    return grid
      .flat()
      .reduce(
        (counts, char) =>
          Object.assign(counts, { [char]: (counts[char] ?? 0) + 1 }),
        {} as { [char: string]: number }
      );
  }

  private getLowerInteger(value: number): number {
    let divider = 1;
    while (value / divider > 9) {
      divider++;
    }

    return Math.ceil(value / divider);
  }

  private generateGrid(char: string | undefined): string[][] {
    return Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => this.generateRandomChar(char ?? ''))
    );
  }

  private generateRandomChar(char: string): string {
    const code =
      char.length === 0
        ? linear(Z_CODE + 1, A_CODE)
        : special(0.2, Z_CODE + 1, A_CODE);
    return typeof code === 'number' ? String.fromCharCode(code) : char;
  }
}
