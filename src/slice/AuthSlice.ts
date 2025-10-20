'use client'
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { creatUserActions, logoutUserActions, ResetPasswordActions, loginUserActions, ProfileChangAction, deleteUserActions, getUserActions, UpdateProfileInfoAction } from '@/actions/AuthActions';
import { initialState } from '@/interface/UserInterface';

/**
 * Redux Toolkit slice for managing authentication state.
 * It handles user registration and login, including token and role management.
 * @module authSlice
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Action to log out a user.
         * Resets the authentication state and removes the auth token from cookies.
         * @function logout
         * @param {AuthState} state - The current Redux state.
         */
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.success = false;
            state.message = null;
            state.role = null;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken')
        }
    },
    extraReducers: (builder) => {
        // ===== REGISTRATION LOGIC =====
        builder
            .addCase(creatUserActions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(creatUserActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(creatUserActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
                state.user = null;
                state.token = null;
            })
            // ===== LOGIN LOGIC =====
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
                state.user = user
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
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
                state.user = null;
                state.token = null;
                state.role = null;
            })
            // ===== GET USER LOGIC =====
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
                console.error('Échec de la récupération du profil utilisateur. Erreur :', state.error);
                state.error = action.payload?.message || action.error.message || 'Failed to fetch user data.';
            })
           

            // ===== DELETE USER LOGIC =====

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
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
            })


            // =====  USER PREFERENCE LOGIC =====

           


            // =====  USER PROFILE CHANGE LOGIC =====
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
                // Met à jour toutes les propriétés de l'utilisateur, y compris le profil_url
                state.user = { ...state.user, ...action.payload.user };
            })
            .addCase(ProfileChangAction.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
            })

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
                // Met à jour l'utilisateur avec les nouvelles informations
                state.user = { ...state.user, ...action.payload.user };
            })
            .addCase(UpdateProfileInfoAction.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
            })
           
            // ===== LOGOUT LOGIC =====
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
                // Supprime les cookies d'authentification pour compléter la déconnexion
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
            })
            .addCase(logoutUserActions.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
            })
            // ===== PASSWORD RESET LOGIC =====
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
                state.error = action.payload?.message || action.error.message || 'An unexpected error occurred.';
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;