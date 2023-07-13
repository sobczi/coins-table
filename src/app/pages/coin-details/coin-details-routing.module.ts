import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailsComponent } from '@pages/coin-details/coin-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoinDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinDetailsRoutingModule { }
