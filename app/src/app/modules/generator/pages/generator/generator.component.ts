import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { linear, special } from 'src/app/utils/random';
import {
  delay,
  map,
  mapTo,
  startWith,
  switchMap,
  tap,
  timeout,
  timeoutWith,
} from 'rxjs/operators';
import { interval, Observable, of } from 'rxjs';
import { CodeGeneratorService } from '../../../../services/code-generator.service';

@Component({
  selector: 'app-module-generator-page-generator',
  templateUrl: 'generator.component.html',
  styleUrls: ['generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorPageComponent {
  char = '';

  clock$ = this.service.getClock();
  data$ = this.service.getData();


  constructor(private service: CodeGeneratorService) { }

  onGenerateGridButtonClick(): void {
    this.service.generateNewGrid(this.char);
  }
}
