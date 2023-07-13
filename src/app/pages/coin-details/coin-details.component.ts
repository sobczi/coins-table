import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FetchCoinDetails, SetSelectedCoin } from '@pages/crypto-table/store/crypto-table.actions';
import { AppState } from '@core/models/app-state';
import { Observable, tap } from 'rxjs';
import { CoinDetails } from '@pages/crypto-table/models/CoinDetails';
import { selectChosenCoin } from '@pages/crypto-table/store/crypto-table.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Maybe } from '@core/models/maybe';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinDetailsComponent implements OnChanges {
  @Input() id!: string;

  readonly chosenCoin$: Observable<Maybe<CoinDetails>>;

  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(FetchCoinDetails());
    this.chosenCoin$ = this.store.pipe(
      select(selectChosenCoin),
      tap(console.log),
      takeUntilDestroyed(),
    );
  }

  ngOnChanges(): void {
    this.store.dispatch(SetSelectedCoin({ id: this.id }));
  }
}
