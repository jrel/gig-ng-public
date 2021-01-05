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
import { GeneratorService } from '../../services/generator.service';

@Component({
  selector: 'app-module-generator-page-generator',
  templateUrl: 'generator.component.html',
  styleUrls: ['generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorPageComponent {
  char = '';

  clock$ = this.service.getClock();
  grid$ = this.service.getGrid();
  code$ = this.service.getCode();


  constructor(private service: GeneratorService) { }

  onGenerateGridButtonClick(): void {
    this.service.generateNewGrid(this.char);
  }
}
