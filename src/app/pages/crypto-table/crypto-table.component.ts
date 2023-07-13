import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CoinDetails } from '@pages/crypto-table/models/CoinDetails';
import { FavouriteCoinClick, FetchCoinDetails, FetchFavouriteCoinsIds } from '@pages/crypto-table/store/crypto-table.actions';
import { selectCoinsDetails, selectFavouriteCoinsIds } from '@pages/crypto-table/store/crypto-table.selectors';
import { Observable } from 'rxjs';
import { AppState } from '@core/models/app-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTableComponent {
  readonly displayedColumns: string[] = [
    'favourite',
    'name',
    'price',
    'percent_change_1h',
    'percent_change_24h',
    'percent_change_7d',
    'market_cap',
    'volume_24h',
    'circulating_supply',
  ];

  readonly coinsDetails$: Observable<CoinDetails[]>;

  readonly favouriteCoinsIds$: Observable<string[]>;

  private readonly store: Store<AppState> = inject(Store);

  constructor() {
    this.coinsDetails$ = this.store.pipe(
      select(selectCoinsDetails),
      takeUntilDestroyed(),
    );

    this.favouriteCoinsIds$ = this.store.pipe(
      select(selectFavouriteCoinsIds),
      takeUntilDestroyed(),
    )

    this.store.dispatch(FetchCoinDetails());
    this.store.dispatch(FetchFavouriteCoinsIds());
  }

  handleCoinFavouriteClick(id: string): void {
    this.store.dispatch(FavouriteCoinClick({ id }));
  }
}
