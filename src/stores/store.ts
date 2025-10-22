
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '@/slice/AuthSlice'
import {
    persistStore, persistReducer
} from 'redux-persist'
// import { WebStorage } from 'redux-persist/lib/types'
import cookieStorage from '@/utils/cookiesStorage';

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage: cookieStorage, // Utilise ton moteur de stockage basé sur les cookies
    whitelist: ['auth'], // Seul le slice 'auth' sera persistant
    // blacklist: ['talent'], // Optionnel : pour exclure explicitement un slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // Ajoute un middleware pour ignorer les actions de persistance
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),

})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch