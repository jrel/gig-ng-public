import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeneratorPageComponent } from './pages/generator/generator.component';
import { GeneratorRoutingModule } from './generator.routing.module';
import { FormsModule } from '@angular/forms';
import { ThrottleDirective } from './directives/throttle.directive';
import { ReplaceModeDirective } from './directives/replace-mode.directive';

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [GeneratorPageComponent,
    ThrottleDirective,
    ReplaceModeDirective,
  ],
})
export class GeneratorModule { }

