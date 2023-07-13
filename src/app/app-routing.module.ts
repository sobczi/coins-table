import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'table',
    loadChildren: () => import('@pages/crypto-table/crypto-table.module').then((m) => m.CryptoTableModule),
  },
  {
    path: 'coin/:id',
    loadChildren: () => import('@pages/coin-details/coin-details.module').then((m) => m.CoinDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
