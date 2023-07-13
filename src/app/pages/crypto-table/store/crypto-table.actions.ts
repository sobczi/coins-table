import { createAction, props } from "@ngrx/store";
import { CoinDetails } from "@pages/crypto-table/models/CoinDetails";

export const FetchCoinDetails = createAction('[Crypto Table] Fetch Coins Details');
export const SaveCoinsDetails = createAction('[Crypto Table] Save Coins Details', props<{ coinsDetails: CoinDetails[] }>());
export const FetchFavouriteCoinsIds = createAction('[Crypto Table] Fetch Favourite Coins Ids');
export const SaveFavouriteCoinsIds = createAction('[Crypto Table] Save Favourite Coins Ids', props<{ favouriteIds: string[] }>());
export const FavouriteCoinClick = createAction('[Crypto Table] Favourite Coin Click', props<{ id: string }>());
export const AddFavouriteCoinId = createAction('[Crypto Table] Add Favourite Coin Id', props<{ id: string }>());
export const RemoveFavouriteCoinId = createAction('[Crypto Table] Remove Favourite Coin Id', props<{ id: string }>());
export const SetSelectedCoin = createAction('[Crypto Table] Set Selected Coin', props<{ id: string }>());