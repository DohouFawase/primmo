'use client'
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { 
    creatUserActions, 
    logoutUserActions, 
    ResetPasswordActions, 
    loginUserActions, 
    ProfileChangAction, 
    deleteUserActions, 
    getUserActions, 
    UpdateProfileInfoAction,
    checkEmailActions,
    verifyLoginOtpActions,
    loginWithPasswordActions,
    verifyAccountActions,
    forgotPasswordActions,
    resetPasswordWithOtpActions,
    resendOtpActions
} from '@/actions/AuthActions';
import { initialState } from '@/interface/UserInterface';

/**
 * Redux Toolkit slice for managing authentication state.
 * Gère l'inscription, la connexion (OTP/Password), la déconnexion, etc.
 * @module authSlice
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Action pour déconnecter manuellement un utilisateur
         */
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.success = false;
            state.message = null;
            state.role = null;
            state.isOtpSent = false;
            state.loginEmail = null;
            state.otpMethod = null;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },
        
        /**
         * Réinitialiser les erreurs
         */
        clearError: (state) => {
            state.error = null;
        },
        
        /**
         * Réinitialiser le message de succès
         */
        clearMessage: (state) => {
            state.message = null;
            state.success = false;
        },
        
        /**
         * Réinitialiser l'état OTP
         */
        resetOtpState: (state) => {
            state.isOtpSent = false;
            state.loginEmail = null;
            state.otpMethod = null;
        }
    },
    extraReducers: (builder) => {
        // ═══════════════════════════════════════════════════════════════════════
        // INSCRIPTION (REGISTER)
        // ═══════════════════════════════════════════════════════════════════════
        builder
            .addCase(creatUserActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(creatUserActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.error = null;
                // Pas de token car le compte doit être vérifié
            })
            .addCase(creatUserActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || action.error.message || 'Erreur lors de l\'inscription.';
                state.user = null;
                state.token = null;
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // VÉRIFICATION DU COMPTE (VERIFY ACCOUNT)
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(verifyAccountActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyAccountActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                // Mettre à jour le statut de vérification si l'utilisateur existe
                if (state.user) {
                    state.user.is_verified = true;
                }
            })
            .addCase(verifyAccountActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Code OTP invalide ou expiré.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // CHECK EMAIL (Étape 1 de connexion)
        // ═══════════════════════════════════════════════════════════════════════
           .addCase(checkEmailActions.pending, (state) => {
    state.isLoading = true;
    state.error = null;
    state.isOtpSent = false;
})
.addCase(checkEmailActions.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isOtpSent = true;
    
    // Log pour debug
    console.log("Action payload complet:", action.payload);
    
    // Adaptation selon la structure réelle de votre API
    // Si votre api_response retourne { success, message, data, status }
    const email = action.payload.data?.email || action.payload.email;
    
    console.log("Email extrait:", email);
    
    state.loginEmail = email;
    state.otpMethod = 'email';
    state.error = null;
    state.message = action.payload.message;
})
.addCase(checkEmailActions.rejected, (state, action) => {
    state.isLoading = false;
    state.isOtpSent = false;
    state.loginEmail = null;
    
    // Gestion correcte de l'erreur
    const errorMessage = action.payload?.message || action.error?.message || 'Erreur inconnue.';
    state.error = errorMessage;
    
    console.error("Erreur dans checkEmail:", errorMessage);
})

            
        // ═══════════════════════════════════════════════════════════════════════
        // VÉRIFIER L'OTP DE CONNEXION (Connexion avec OTP)
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(verifyLoginOtpActions.pending, (state) => {
                state.isVerifyingOtp = true;
                state.error = null;
            })
            .addCase(verifyLoginOtpActions.fulfilled, (state, action) => {
                state.isVerifyingOtp = false;
                state.success = true;
                state.message = action.payload.message;
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
                state.role = action.payload.data.user.role;
                state.error = null;
                
                // Sauvegarder le token dans les cookies
                Cookies.set('accessToken', action.payload.data.token, { expires: 7 });
                
                // Réinitialiser l'état OTP
                state.isOtpSent = false;
                state.loginEmail = null;
                state.otpMethod = null;
            })
            .addCase(verifyLoginOtpActions.rejected, (state, action) => {
                state.isVerifyingOtp = false;
                state.success = false;
                state.error = action.payload?.message || 'Code OTP invalide ou expiré.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // CONNEXION AVEC MOT DE PASSE (Alternative à l'OTP)
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(loginWithPasswordActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginWithPasswordActions.fulfilled, (state, action) => {
                const { message, payload } = action.payload;
                const { tokens, user } = payload;
                
                state.isLoading = false;
                state.success = true;
                state.message = message;
                state.user = user;
                state.token = tokens.access_token;
                state.role = user.role;
                state.error = null;
                
                // Sauvegarder les tokens dans les cookies
                Cookies.set('accessToken', tokens.access_token, { expires: 7 });
                if (tokens.refresh_token) {
                    Cookies.set('refreshToken', tokens.refresh_token, { expires: 30 });
                }
                
                // Réinitialiser l'état OTP
                state.isOtpSent = false;
                state.loginEmail = null;
                state.otpMethod = null;
            })
            .addCase(loginWithPasswordActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Identifiants invalides.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // ANCIENNE MÉTHODE LOGIN (Pour compatibilité)
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(loginUserActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUserActions.fulfilled, (state, action) => {
                const { message, payload } = action.payload;
                const { tokens, user } = payload;
                
                state.isLoading = false;
                state.success = true;
                state.message = message;
                state.user = user;
                state.token = tokens.access_token;
                state.role = user.role;
                state.error = null;
                
                Cookies.set('accessToken', tokens.access_token, { expires: 7 });
                if (tokens.refresh_token) {
                    Cookies.set('refreshToken', tokens.refresh_token, { expires: 30 });
                }
            })
            .addCase(loginUserActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la connexion.';
                state.user = null;
                state.token = null;
                state.role = null;
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // RENVOYER L'OTP
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(resendOtpActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resendOtpActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(resendOtpActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors du renvoi du code.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // MOT DE PASSE OUBLIÉ
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(forgotPasswordActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPasswordActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(forgotPasswordActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la demande.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // RÉINITIALISER LE MOT DE PASSE AVEC OTP
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(resetPasswordWithOtpActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resetPasswordWithOtpActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(resetPasswordWithOtpActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Code invalide ou expiré.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // RÉCUPÉRER L'UTILISATEUR
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(getUserActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(getUserActions.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Échec de la récupération du profil utilisateur:', action.payload?.message);
                state.error = action.payload?.message || 'Erreur lors de la récupération des données.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // SUPPRIMER L'UTILISATEUR
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(deleteUserActions.pending, (state) => {
                state.isDeletingAccount = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteUserActions.fulfilled, (state, action) => {
                state.isDeletingAccount = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.user = null;
                state.token = null;
                state.role = null;
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
            })
            .addCase(deleteUserActions.rejected, (state, action) => {
                state.isDeletingAccount = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la suppression.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // CHANGER LA PHOTO DE PROFIL
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(ProfileChangAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(ProfileChangAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.user = { ...state.user, ...action.payload.user };
            })
            .addCase(ProfileChangAction.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la mise à jour.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // METTRE À JOUR LES INFORMATIONS DU PROFIL
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(UpdateProfileInfoAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(UpdateProfileInfoAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.user = { ...state.user, ...action.payload.user };
            })
            .addCase(UpdateProfileInfoAction.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la mise à jour.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // DÉCONNEXION
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(logoutUserActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(logoutUserActions.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
                state.user = null;
                state.token = null;
                state.role = null;
                state.isOtpSent = false;
                state.loginEmail = null;
                state.otpMethod = null;
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
            })
            .addCase(logoutUserActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la déconnexion.';
            })
            
        // ═══════════════════════════════════════════════════════════════════════
        // ANCIENNE MÉTHODE RESET PASSWORD (Pour compatibilité)
        // ═══════════════════════════════════════════════════════════════════════
            .addCase(ResetPasswordActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(ResetPasswordActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(ResetPasswordActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || 'Erreur lors de la demande.';
            });
    },
});

export const { logout, clearError, clearMessage, resetOtpState } = authSlice.actions;
export default authSlice.reducer;