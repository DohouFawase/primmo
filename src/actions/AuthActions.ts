import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormInputs, RegisterFormInputs } from '@/types/AuthType';
import { AuthSuccessPayload, AuthRejectedPayload, LoginSuccessPayload, UpdateProfileInfoPayload } from '@/interface/UserInterface';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import Api from '@/config/ApiCalls';
/**
 * Redux Toolkit asynchronous thunks for user authentication.
 * @module AuthActions
 */

/**
 * Creates a new user by sending a registration request to the API.
 * This thunk handles the entire lifecycle of a registration attempt.
 *
 * @function creatUserActions
 * @param {RegisuserIdterFormInputs} userData - The user's registration data (email, password, etc.).
 * @returns {Promise<AuthSuccessPayload | AuthRejectedPayload>} A promise that resolves with the success payload or rejects with an error payload.
 */
export const creatUserActions = createAsyncThunk<
    AuthSuccessPayload,
    RegisterFormInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'users/creatUser',
    async (userData, { rejectWithValue }) => {
        try {
            const request = await Api.post('/sign-up', userData);
            toast.success(request.data.message || "Account created successfully!");
            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            const errorMessage = "An unexpected error occurred.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);

/**
 * Authenticates a user by sending a login request to the API.
 * This thunk manages the entire login process, including API communication and error handling.
 *
 * @function loginUserActions
 * @param {LoginFormInputs} credentials - The user's login credentials (email and password).
 * @returns {Promise<Loimport { UserGeneralFormInputs } from '@/types/UserType';ginSuccessPayload | AuthRejectedPayload>} A promise that resolves with the login success payload or rejects with an error payload.
 */
export const loginUserActions = createAsyncThunk<
    LoginSuccessPayload,
    LoginFormInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'users/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const request = await Api.post('/sign-in', credentials);
            toast.success(request.data.message || "Logged in successfully!");
            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "An unexpected error occurred.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);


/**
 * Creates an async thunk to fetch the profile of a connected user.
 * This action is used to retrieve user data based on their ID from the API.
 *
 * @function getUserActions
 * @param {string} userId - The unique ID of the user whose data needs to be fetched.
 * @returns {Promise<AuthSuccessPayload | AuthRejectedPayload>} A promise that resolves with the user's data on success or an error payload on failure.
 */
export const getUserActions = createAsyncThunk<
    AuthSuccessPayload,
    string,
    { rejectValue: AuthRejectedPayload }
>(
    'users/getUser', // A unique name for the thunk
    async (userId, { rejectWithValue }) => {
        try {
            // Send a GET request to the API with the user's ID
            const request = await Api.get(`users/${userId}`);
            // The API response data is returned on success
            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                // Handle API-specific errors
                const errorMessage = error.response?.data?.message || 'Failed to fetch user data.';
                return rejectWithValue({ message: errorMessage });
            }

            // Handle any other unexpected errors
            const errorMessage = 'An unexpected error occurred.';
            return rejectWithValue({ message: errorMessage });
        }
    }
);


/**
 * Creates an async thunk to handle the deletion of a user.
 * This thunk sends a DELETE request to the API to remove a user by their ID.
 *
 * @function deleteUserActions
 * @param {string} userId - The unique ID of the user to be deleted.
 * @returns {Promise<AuthSuccessPayload | AuthRejectedPayload>} A promise that resolves with a success payload or rejects with an error payload.
 */
export const deleteUserActions = createAsyncThunk<
    AuthSuccessPayload,
    string, // Le type d'argument attendu est une chaîne de caractères (l'ID de l'utilisateur)
    { rejectValue: AuthRejectedPayload }
>(
    'users/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {

            const request = await Api.delete(`/users/${userId}`);

            toast.success(request.data.message || 'The user has been successfully deleted!');
            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred while deleting the user.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            const errorMessage = 'An unexpected error occurred.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);








/**
 * Creates an async thunk to update the user's profile picture.
 * This thunk sends a POST request with the image file.
 *
 * @function ProfileChangAction
 * @param {{ userId: string, file: File }} payload - The user's ID and the file to upload.
 * @returns {Promise<AuthSuccessPayload | AuthRejectedPayload>} A promise that resolves with a success payload or rejects with an error payload.
 */
export const ProfileChangAction = createAsyncThunk<
    AuthSuccessPayload,
    { userId: string, file: File },
    { rejectValue: AuthRejectedPayload }
>(
    'users/ProfileChangAction',
    async ({ userId, file }, { rejectWithValue }) => {
        try {
            if (!file) {
                const errorMessage = 'No file provided.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            const formData = new FormData();
            formData.append('file', file);

            // Envoie la requête POST à l'API
            const request = await Api.post(`/users/${userId}/change-picture`, formData);

            toast.success(request.data.message || 'Your profile picture has been successfully updated!');
            return request.data;
        } catch (error) {
            // LIGNE AJOUTÉE ICI
            console.error("Erreur complète lors de la mise à jour de l'image de profil:", error);

            // Logique pour gérer les erreurs Axios
            if (error instanceof AxiosError) {
                // Tente de récupérer le message d'erreur du backend
                const backendErrorMessage = error.response?.data?.message;

                if (backendErrorMessage) {
                    toast.error(backendErrorMessage); // Affiche le message d'erreur du backend
                    return rejectWithValue({ message: backendErrorMessage });
                }

                // Affiche un message d'erreur par défaut si le backend n'en a pas fourni
                const genericErrorMessage = 'An error occurred while updating your profile picture.';
                toast.error(genericErrorMessage);
                return rejectWithValue({ message: genericErrorMessage });
            }

            // Gère les erreurs non-Axios (erreurs réseau, etc.)
            const unexpectedErrorMessage = 'An unexpected error occurred.';
            toast.error(unexpectedErrorMessage);
            return rejectWithValue({ message: unexpectedErrorMessage });
        }
    },
);

export const UpdateProfileInfoAction = createAsyncThunk<
    AuthSuccessPayload,
    UpdateProfileInfoPayload,
    { rejectValue: AuthRejectedPayload }
>(
    'users/updateProfileInfo',
    async (profileData, { rejectWithValue }) => {
        try {
            const { userId, ...dataToUpdate } = profileData;
            const request = await Api.patch(`/users/${userId}`, dataToUpdate);

            toast.success(request.data.message || 'Informations de profil mises à jour !');
            return request.data;
        } catch (error) {
            console.error("Erreur complète lors de la mise à jour du profil:", error);

            if (error instanceof AxiosError) {
                // Tente d'extraire le message d'erreur détaillé du backend
                const backendErrorMessage = error.response?.data?.message;

                // Vérifie si le message est un objet avec des détails
                if (backendErrorMessage && typeof backendErrorMessage === 'object') {
                    // Parcourt les clés de l'objet pour trouver les messages d'erreur
                    const firstKey = Object.keys(backendErrorMessage)[0];
                    if (firstKey) {
                        const specificError = backendErrorMessage[firstKey][0];
                        toast.error(specificError);
                        return rejectWithValue({ message: specificError });
                    }
                }

                // Si le message d'erreur n'est pas un objet ou s'il n'existe pas, utilise un message générique
                const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du profil.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            // Gère les erreurs non-Axios (moins courantes)
            const errorMessage = 'Une erreur inattendue est survenue.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);


/**
 * Creates an async thunk to handle user logout.
 * This thunk sends a DELETE request to the API to invalidate the user's session.
 *
 * @function logoutUserActions
 * @returns {Promise<AuthSuccessPayload | AuthRejectedPayload>} A promise that resolves with a success payload or rejects with an error payload.
 */
export const logoutUserActions = createAsyncThunk<
    AuthSuccessPayload,
    void,
    { rejectValue: AuthRejectedPayload }
>(
    'users/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const request = await Api.delete('/auth/logout');

            toast.success(request.data.message || "Vous êtes déconnecté avec succès !");

            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Une erreur inattendue est survenue lors de la déconnexion.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            // Gère les erreurs génériques (réseau, etc.)
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);




/**
 * Creates an async thunk to handle the user's password reset.
 * This thunk sends a reset password email to the provided user's email address.
 *
 * @function ResetPasswordActions
 * @param {string} email - The email address of the user.
 * @returns {Promise<AuthSuccessPayload | AuthRejectedPayload>} A promise that resolves with a success payload or rejects with an error payload.
 */
export const ResetPasswordActions = createAsyncThunk<
    AuthSuccessPayload,
    string,
    { rejectValue: AuthRejectedPayload }
>(
    'users/resetPassword',
    async (email, { rejectWithValue }) => {
        try {
            const request = await Api.post('/auth/reset-password', { email });

            toast.success(request.data.message || 'A password reset link has been sent to your email address!');
            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred while requesting the password reset.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            const errorMessage = 'An unexpected error occurred.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);