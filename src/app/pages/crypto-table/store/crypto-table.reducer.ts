import { Action, createReducer, on } from '@ngrx/store';
import { CryptoTableStore } from '@pages/crypto-table/models/CryptoTableStore';
import * as CryptoTableActions from './crypto-table.actions';
import { CoinDetails } from '@pages/crypto-table/models/CoinDetails';

export const initialState: CryptoTableStore = {
	coinsDetails: [],
	favouriteIds: [],
	chosenCoin: null
}

const _cryptoTableReducer = createReducer(
	initialState,
	on(CryptoTableActions.SaveCoinsDetails, (state, { coinsDetails }) => ({
		...state,
		coinsDetails,
	})),
	on(CryptoTableActions.SaveFavouriteCoinsIds, (state, { favouriteIds }) => ({
		...state,
		favouriteIds,
	})),
	on(CryptoTableActions.RemoveFavouriteCoinId, (state, { id }) => ({
		...state,
		favouriteIds: state.favouriteIds?.filter(existingId => existingId !== id),
	})),
	on(CryptoTableActions.AddFavouriteCoinId, (state, { id }) => ({
		...state,
		favouriteIds: [
			...(state.favouriteIds || []),
			id,
		]
	})),
	on(CryptoTableActions.SetSelectedCoin, (state, { id }) => ({
		...state,
		chosenCoin: state.coinsDetails?.find((c: CoinDetails) => c.id === id),
	}))
);

export function CryptoTableReducer(state: CryptoTableStore | undefined, action: Action) {
	return _cryptoTableReducer(state, action);
}
