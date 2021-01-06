import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentsRoutingModule } from './payments.routing.module';
import { PaymentsPageComponent } from './pages/payments/payments.component';

@NgModule({
  imports: [CommonModule, PaymentsRoutingModule, ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [PaymentsPageComponent],
})
export class PaymentsModule {}
