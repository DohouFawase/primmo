import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    LoginFormInputs, 
    RegisterFormInputs, 
    CheckEmailInputs, 
    VerifyLoginOtpInputs,
    LoginWithPasswordInputs,
    VerifyAccountInputs,
    ForgotPasswordInputs,
    ResetPasswordWithOtpInputs
} from '@/types/AuthType';
import { 
    AuthSuccessPayload, 
    AuthRejectedPayload, 
    LoginSuccessPayload, 
    UpdateProfileInfoPayload,
    CheckEmailSuccessPayload,
    VerifyOtpSuccessPayload
} from '@/interface/UserInterface';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import Api from '@/config/ApiCalls';

// ═══════════════════════════════════════════════════════════════════════
// INSCRIPTION (REGISTER)
// ═══════════════════════════════════════════════════════════════════════

export const creatUserActions = createAsyncThunk<
    AuthSuccessPayload,
    RegisterFormInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/sign-up', userData);
            toast.success(response.data.message || "Compte créé avec succès ! Vérifiez votre email.");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// VÉRIFICATION DU COMPTE (VERIFY ACCOUNT)
// ═══════════════════════════════════════════════════════════════════════

export const verifyAccountActions = createAsyncThunk<
    AuthSuccessPayload,
    VerifyAccountInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/verifyAccount',
    async (verifyData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/auth/verify-account', verifyData);
            toast.success(response.data.message || "Compte vérifié avec succès !");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Code OTP invalide ou expiré.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// CHECK EMAIL (Étape 1 de connexion)
// ═══════════════════════════════════════════════════════════════════════

// Fichier : AuthActions.ts

export const checkEmailActions = createAsyncThunk<
    CheckEmailSuccessPayload,
    CheckEmailInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/checkEmail',
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/check-email', emailData);
            
            // Log pour debug
            console.log("Réponse complète de l'API:", response);
            console.log("Response.data:", response.data);
            
            // Vérifiez la structure réelle de votre réponse
            // Elle peut être response.data.data ou directement response.data
            return response.data;
            
        } catch (error) {
            console.error("Erreur complète:", error);
            
            let errorMessage: string; 
            const defaultErrorMessage = "Erreur lors de la vérification de l'email.";

            if (error instanceof AxiosError) {
                const status = error.response?.status;
                const responseData = error.response?.data;
                
                console.log("Status:", status);
                console.log("Response data:", responseData);
                
                // 1. GESTION SPÉCIFIQUE DES ERREURS DE VALIDATION (422)
                if (status === 422 && responseData && responseData.errors?.email) {
                    errorMessage = responseData.errors.email[0];
                    toast.error(errorMessage);
                    return rejectWithValue({ message: errorMessage });
                }

                // 2. GESTION DES AUTRES ERREURS (404, 403, 500, etc.)
                const apiMessage = responseData?.message;
                errorMessage = apiMessage || defaultErrorMessage; 

                // Affichage des toasts basés sur le statut
                if (status === 404) {
                    toast.error(errorMessage);
                } else if (status === 403) {
                    toast.error(errorMessage);
                } else if (status === 500) {
                    toast.error(errorMessage);
                } else {
                    toast.error(errorMessage);
                }
                
                return rejectWithValue({ message: errorMessage });
            }
            
            // 3. Cas d'erreur inattendue
            errorMessage = "Une erreur inattendue est survenue (erreur réseau).";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);
// ═══════════════════════════════════════════════════════════════════════
// VÉRIFIER L'OTP DE CONNEXION (Étape 2A - Connexion avec OTP)
// ═══════════════════════════════════════════════════════════════════════

export const verifyLoginOtpActions = createAsyncThunk<
    VerifyOtpSuccessPayload,
    VerifyLoginOtpInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/verifyLoginOtp',
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/verify-login-otp', otpData);
            toast.success(response.data.message || "Connexion réussie !");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response?.status;
                const errorMessage = error.response?.data?.message;
                
                if (status === 403 || status === 400) {
                    toast.error("Code OTP invalide ou expiré.");
                } else {
                    toast.error(errorMessage || "Erreur lors de la vérification du code.");
                }
                
                return rejectWithValue({ message: errorMessage || "Code OTP invalide." });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// CONNEXION AVEC MOT DE PASSE (Étape 2B - Alternative à l'OTP)
// ═══════════════════════════════════════════════════════════════════════

export const loginWithPasswordActions = createAsyncThunk<
    LoginSuccessPayload,
    LoginWithPasswordInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/loginWithPassword',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await Api.post('/sign-in', credentials);
            toast.success(response.data.message || "Connexion réussie !");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response?.status;
                const errorMessage = error.response?.data?.message;
                
                if (status === 401) {
                    toast.error("Identifiants invalides.");
                } else if (status === 403) {
                    toast.error("Votre compte n'est pas vérifié.");
                } else {
                    toast.error(errorMessage || "Erreur lors de la connexion.");
                }
                
                return rejectWithValue({ message: errorMessage || "Connexion échouée." });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// ANCIENNE MÉTHODE LOGIN (À CONSERVER POUR COMPATIBILITÉ)
// ═══════════════════════════════════════════════════════════════════════

export const loginUserActions = createAsyncThunk<
    LoginSuccessPayload,
    LoginFormInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await Api.post('/sign-in', credentials);
            toast.success(response.data.message || "Connexion réussie !");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Identifiants invalides.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// RENVOYER L'OTP
// ═══════════════════════════════════════════════════════════════════════

export const resendOtpActions = createAsyncThunk<
    AuthSuccessPayload,
    { email: string },
    { rejectValue: AuthRejectedPayload }
>(
    'auth/resendOtp',
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/auth/resend-otp', emailData);
            toast.success(response.data.message || "Un nouveau code a été envoyé.");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Erreur lors du renvoi du code.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// MOT DE PASSE OUBLIÉ
// ═══════════════════════════════════════════════════════════════════════

export const forgotPasswordActions = createAsyncThunk<
    AuthSuccessPayload,
    ForgotPasswordInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/forgotPassword',
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/auth/forgot-password', emailData);
            toast.success(response.data.message || "Un code de réinitialisation a été envoyé.");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Erreur lors de la demande.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// RÉINITIALISER LE MOT DE PASSE AVEC OTP
// ═══════════════════════════════════════════════════════════════════════

export const resetPasswordWithOtpActions = createAsyncThunk<
    AuthSuccessPayload,
    ResetPasswordWithOtpInputs,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/resetPasswordWithOtp',
    async (resetData, { rejectWithValue }) => {
        try {
            const response = await Api.post('/auth/verify-otp-reset', resetData);
            toast.success(response.data.message || "Mot de passe réinitialisé avec succès !");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Code invalide ou expiré.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// RÉCUPÉRER L'UTILISATEUR
// ═══════════════════════════════════════════════════════════════════════

export const getUserActions = createAsyncThunk<
    AuthSuccessPayload,
    string,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/getUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await Api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'Échec de récupération des données utilisateur.';
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = 'Une erreur inattendue est survenue.';
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// SUPPRIMER L'UTILISATEUR
// ═══════════════════════════════════════════════════════════════════════

export const deleteUserActions = createAsyncThunk<
    AuthSuccessPayload,
    string,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await Api.delete(`/users/${userId}`);
            toast.success(response.data.message || 'Utilisateur supprimé avec succès !');
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'Erreur lors de la suppression.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = 'Une erreur inattendue est survenue.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// CHANGER LA PHOTO DE PROFIL
// ═══════════════════════════════════════════════════════════════════════

export const ProfileChangAction = createAsyncThunk<
    AuthSuccessPayload,
    { userId: string, file: File },
    { rejectValue: AuthRejectedPayload }
>(
    'auth/changeProfilePicture',
    async ({ userId, file }, { rejectWithValue }) => {
        try {
            if (!file) {
                const errorMessage = 'Aucun fichier fourni.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await Api.post(`/users/${userId}/change-picture`, formData);
            toast.success(response.data.message || 'Photo de profil mise à jour !');
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la photo de profil:", error);
            
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = 'Une erreur inattendue est survenue.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// METTRE À JOUR LES INFORMATIONS DU PROFIL
// ═══════════════════════════════════════════════════════════════════════

export const UpdateProfileInfoAction = createAsyncThunk<
    AuthSuccessPayload,
    UpdateProfileInfoPayload,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/updateProfileInfo',
    async (profileData, { rejectWithValue }) => {
        try {
            const { userId, ...dataToUpdate } = profileData;
            const response = await Api.patch(`/users/${userId}`, dataToUpdate);

            toast.success(response.data.message || 'Profil mis à jour !');
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil:", error);

            if (error instanceof AxiosError) {
                const backendErrorMessage = error.response?.data?.message;

                if (backendErrorMessage && typeof backendErrorMessage === 'object') {
                    const firstKey = Object.keys(backendErrorMessage)[0];
                    if (firstKey) {
                        const specificError = backendErrorMessage[firstKey][0];
                        toast.error(specificError);
                        return rejectWithValue({ message: specificError });
                    }
                }

                const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }

            const errorMessage = 'Une erreur inattendue est survenue.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// DÉCONNEXION
// ═══════════════════════════════════════════════════════════════════════

export const logoutUserActions = createAsyncThunk<
    AuthSuccessPayload,
    void,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.post('/auth/logout');
            toast.success(response.data.message || "Déconnexion réussie !");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Erreur lors de la déconnexion.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

// ═══════════════════════════════════════════════════════════════════════
// ANCIENNE MÉTHODE RESET PASSWORD (À CONSERVER)
// ═══════════════════════════════════════════════════════════════════════

export const ResetPasswordActions = createAsyncThunk<
    AuthSuccessPayload,
    string,
    { rejectValue: AuthRejectedPayload }
>(
    'auth/resetPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await Api.post('/auth/reset-password', { email });
            toast.success(response.data.message || 'Lien de réinitialisation envoyé !');
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'Erreur lors de la demande.';
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = 'Une erreur inattendue est survenue.';
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);