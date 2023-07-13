import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CryptoTableStore, CryptoTableStoreKey } from "@pages/crypto-table/models/CryptoTableStore";

const _selectCryptoTable = createFeatureSelector<CryptoTableStore>(CryptoTableStoreKey);

export const selectCoinsDetails = createSelector(_selectCryptoTable, state => state.coinsDetails);

export const selectFavouriteCoinsIds = createSelector(_selectCryptoTable, state => state.favouriteIds);

export const selectChosenCoin = createSelector(_selectCryptoTable, state => state.chosenCoin);
