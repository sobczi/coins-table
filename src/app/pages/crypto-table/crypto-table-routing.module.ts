import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoTableComponent } from '@pages/crypto-table/crypto-table.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoTableComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoTableRoutingModule { }
