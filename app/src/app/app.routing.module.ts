import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'generator',
    loadChildren: async () =>
      (await import('./modules/generator/generator.module')).GeneratorModule,
  },
  {
    path: 'payments',
    loadChildren: async () =>
      (await import('./modules/payments/payments.module')).PaymentsModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
