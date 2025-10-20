import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    // baseURL: BASE_URL,
    timeout: 5000, // Augmenté à 5000 ms (5 secondes)
    headers: { 'Content-Type': 'application/json' }
});

Api.interceptors.request.use(
    (config) => {
        // Ajout du jeton d'authentification
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            // Supprimer l'en-tête 'Content-Type' pour que le navigateur le génère automatiquement avec la bonne 'boundary'
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Dans ton fichier API.js
Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Si l'erreur est 401 et qu'il n'a pas déjà essayé de rafraîchir
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // On marque la requête pour ne pas boucler indéfiniment

            const refreshToken = Cookies.get('refreshToken'); // Supposons que tu stockes aussi le refreshToken

            if (refreshToken) {
                try {
                    // 2. Appeler ton API pour obtenir un nouveau token d'accès
                    const newTokensResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {
                        refreshToken: refreshToken,
                    });

                    const newAccessToken = newTokensResponse.data.accessToken;

                    Cookies.set('accessToken', newAccessToken, { expires: 7 });

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // 5. Relancer la requête d'origine qui a échoué
                    return Api(originalRequest);
                } catch (refreshError) {
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');
                    window.location.href = '/'; // Redirection vers la page de connexion
                    return Promise.reject(refreshError);
                }
            } else {
                // S'il n'y a pas de refreshToken, déconnecter l'utilisateur
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default Api;