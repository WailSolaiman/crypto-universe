import { configureStore } from '@reduxjs/toolkit'
import { cryptoApiCoinLore } from '../services/cryptoApiCoinLore'

export default configureStore({
    reducer: {
        [cryptoApiCoinLore.reducerPath]: cryptoApiCoinLore.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApiCoinLore.middleware),
})
