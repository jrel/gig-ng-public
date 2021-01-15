import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodeQuery } from 'src/app/state/code.query';
import { CodeService } from 'src/app/state/code.service';

@Component({
  selector: 'app-module-generator-page-generator',
  templateUrl: 'generator.component.html',
  styleUrls: ['generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorPageComponent {
  char = '';

  clock$ = interval(1000).pipe(map(() => new Date()));
  grid$ = this.query.selectGrid$;
  code$ = this.query.selectCode$;

  constructor(private service: CodeService, private query: CodeQuery) {}

  onGenerateGridButtonClick(): void {
    this.service.startGenerating(this.char);
  }
}
