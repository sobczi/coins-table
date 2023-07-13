import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinDetailsRoutingModule } from './coin-details-routing.module';
import { CoinDetailsComponent } from '@pages/coin-details/coin-details.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CryptoTableEffects } from '@pages/crypto-table/store/crypto-table.effects';
import { CryptoTableStoreKey } from '@pages/crypto-table/models/CryptoTableStore';
import { CryptoTableReducer } from '@pages/crypto-table/store/crypto-table.reducer';
import { CryptoTableService } from '@pages/crypto-table/services/crypto-table.service';

@NgModule({
  declarations: [CoinDetailsComponent],
  imports: [
    CommonModule,
    CoinDetailsRoutingModule,
    EffectsModule.forFeature([CryptoTableEffects]),
    StoreModule.forFeature(CryptoTableStoreKey, CryptoTableReducer),
  ],
  providers: [CryptoTableService]
})
export class CoinDetailsModule { }
