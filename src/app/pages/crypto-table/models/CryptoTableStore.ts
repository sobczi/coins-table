import { CoinDetails } from "@pages/crypto-table/models/CoinDetails"
import { Maybe } from "@core/models/maybe";

export type CryptoTableStore = {
	coinsDetails: CoinDetails[];
	favouriteIds: string[];
	chosenCoin: Maybe<CoinDetails>;
}

export const CryptoTableStoreKey = 'CryptoTableStoreKey';
