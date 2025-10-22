// cookieStorage.ts

import Cookies from 'js-cookie';
import { WebStorage } from 'redux-persist/lib/types';

// Nous définissons une interface pour notre moteur de stockage personnalisé
const cookieStorage: WebStorage = {
    getItem: (key: string): Promise<string | null> => {
        const value = Cookies.get(key);
        return Promise.resolve(value ?? null);
    },

    setItem: (key: string, value: string): Promise<void> => {
        Cookies.set(key, value, {
            expires: 7, // expire après 7 jours

        });
        return Promise.resolve();
    },

    removeItem: (key: string): Promise<void> => {
        Cookies.remove(key, { path: '/' });
        return Promise.resolve();
    },
};

export default cookieStorage;