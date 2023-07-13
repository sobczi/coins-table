import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoTableRoutingModule } from './crypto-table-routing.module';
import { CryptoTableComponent } from './crypto-table.component';
import { MatTableModule } from '@angular/material/table';
import { FavouriteButtonComponent } from '@shared/components/favourite-button/favourite-button.component';
import { StoreModule } from '@ngrx/store';
import { CryptoTableStoreKey } from '@pages/crypto-table/models/CryptoTableStore';
import { CryptoTableReducer } from '@pages/crypto-table/store/crypto-table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CryptoTableEffects } from '@pages/crypto-table/store/crypto-table.effects';
import { CryptoTableService } from '@pages/crypto-table/services/crypto-table.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CryptoTableComponent,
  ],
  imports: [
    CommonModule,
    CryptoTableRoutingModule,
    MatTableModule,
    FavouriteButtonComponent,
    EffectsModule.forFeature([CryptoTableEffects]),
    StoreModule.forFeature(CryptoTableStoreKey, CryptoTableReducer),
    RouterModule,
  ],
  providers: [CryptoTableService]
})
export class CryptoTableModule { }
