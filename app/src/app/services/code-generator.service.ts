import { Injectable } from '@angular/core';
import { combineLatest, interval, Observable, Subject } from 'rxjs';
import { combineAll, map, withLatestFrom } from 'rxjs/operators';
import { linear, special } from 'src/app/utils/random';

const A_CODE = 'a'.codePointAt(0) as number;
const Z_CODE = 'z'.codePointAt(0) as number;

@Injectable({ providedIn: 'root' })
export class CodeGeneratorService {
  private char$ = new Subject<string>();
  private clock$ = interval(1000).pipe(map(() => new Date()));
  private grid$ = combineLatest([this.char$, interval(2000)]).pipe(
    map(([char]) =>
      Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => this.getRandomChar(char ?? ''))
      )
    )
  );

  private code$ = this.grid$.pipe(
    withLatestFrom(this.clock$),
    map(
      ([grid, date]) =>
        [grid, date, this.getOccurrencesCount(grid.flat())] as [
          string[][],
          Date,
          { [char: string]: number }
        ]
    ),
    map(([grid, date, counts]) => {
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const step1 = [+seconds[0], +seconds[1]];
      const step2 = [grid[step1[0]][step1[1]], grid[step1[1]][step1[0]]];
      const step3 = [counts[step2[0]], counts[step2[1]]];
      const step4 = [
        this.getLowerInteger(step3[0]),
        this.getLowerInteger(step3[1]),
      ];
      return +step4.join('');
    })
  );

  getClock(): Observable<Date> {
    return this.clock$;
  }

  getGrid(): Observable<string[][]> {
    return this.grid$;
  }

  getCode(): Observable<number> {
    return this.code$;
  }

  generateNewGrid(char: string): void {
    this.char$.next(char);
  }

  private getRandomChar(char: string): string {
    const code =
      char.length === 0
        ? linear(Z_CODE + 1, A_CODE)
        : special(0.2, Z_CODE + 1, A_CODE);
    return typeof code === 'number' ? String.fromCharCode(code) : char;
  }

  private getOccurrencesCount(grid: string[]): { [char: string]: number } {
    return grid.reduce(
      (counts, char) =>
        Object.assign(counts, {
          [char]: (counts[char] ?? 0) + 1,
        }),
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
}
