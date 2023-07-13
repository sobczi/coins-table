import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CryptoTableActions from './crypto-table.actions';
import { EMPTY, Observable, catchError, filter, map, mergeMap, switchMap, take } from 'rxjs';
import { CryptoTableService } from '@pages/crypto-table/services/crypto-table.service';
import { CoinDetails } from '@pages/crypto-table/models/CoinDetails';
import { AppState } from '@core/models/app-state';
import { MemoizedSelector, Store } from '@ngrx/store';
import { selectCoinsDetails, selectFavouriteCoinsIds } from '@pages/crypto-table/store/crypto-table.selectors';

// TODO: Move to shared place
function filterOutIfDataExists<T>(store: Store<AppState>, selector: MemoizedSelector<object, T[]>): Observable<T[]> {
	return store.select(selector).pipe(
		filter((elements: T[]) => !elements.length),
	);
}

@Injectable()
export class CryptoTableEffects {
	fetchCoinDetails$ = createEffect(() => this.actions$.pipe(
		ofType(CryptoTableActions.FetchCoinDetails),
		mergeMap(() => filterOutIfDataExists(this.store, selectCoinsDetails)),
		switchMap(() => this.cryptoTableService.fetchCoins().pipe(
			map((coinsDetails: CoinDetails[]) => CryptoTableActions.SaveCoinsDetails({ coinsDetails })))
		),
		catchError(() => EMPTY),
	));

	// TODO: To avoid fetching it too many times - create generic type example<T> = { data: T; loaded: boolean; } and check the conditions - refetch only if loaded: false
	fetchFavouriteCoinsIds$ = createEffect(() => this.actions$.pipe(
		ofType(CryptoTableActions.FetchFavouriteCoinsIds),
		mergeMap(() => this.cryptoTableService.fetchFavouriteCoinsIds().pipe(
			map((favouriteIds: string[]) => CryptoTableActions.SaveFavouriteCoinsIds({ favouriteIds })),
		)),
		catchError(() => EMPTY),
	))

	favouriteCoinClick$ = createEffect(() => this.actions$.pipe(
		ofType(CryptoTableActions.FavouriteCoinClick),
		mergeMap(({ id }) => this.store.select(selectFavouriteCoinsIds).pipe(
			take(1),
			map((favouriteIds: string[]) => favouriteIds.includes(id)),
			switchMap((isFavourite: boolean) => {
				let manageFavouriteCoinCall = isFavourite ? this.cryptoTableService.addCoinToFavourite : this.cryptoTableService.removeCoinFromFavourite;

				return manageFavouriteCoinCall(id).pipe(
					map((success: boolean) => ({ success, isFavourite })),
				)
			}),
			filter(({ success }) => !!success),
			map(({ isFavourite }) => isFavourite ? CryptoTableActions.RemoveFavouriteCoinId({ id }) : CryptoTableActions.AddFavouriteCoinId({ id }))
		)),
		catchError(() => EMPTY),
	))

	constructor(
		private readonly store: Store<AppState>,
		private readonly actions$: Actions,
		private readonly cryptoTableService: CryptoTableService
	) {}
}