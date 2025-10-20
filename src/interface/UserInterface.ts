export interface User {
    _links?: {
        profile_url: string;
    };
    email?: string;
    firstname?: string;
    lastname?: string;
    phone_number?: string | null;
    profile_url?: string;
    role?: string;
    user_id?: string;
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface UserSettings {
    currency: string;
    language: string;
    timezone: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    userInfo: User | null;
    success: boolean;
    message: string | null;
    role: string | null | undefined;
    isDeletingAccount: boolean;
}


export interface AuthSuccessPayload {
    message: string;
    user: User;
    token: string;
}

export interface AuthRejectedPayload {
    message: string;

}


export const initialState: AuthState = {
    user: null,
    role: null,
    token: null,
    isLoading: false,
    error: null,
    userInfo: null,
    success: false,
    message: null,
    isDeletingAccount: false,
}



export interface LoginSuccessPayload {
    message: string;
    payload: {
        tokens: Tokens;
        user: User;
    };
}



export interface UserPreferences {
    userId: string;
    currency?: string;
    language?: string;
    timezone?: string;
}



export interface UpdateProfileInfoPayload {
    userId: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    // country?: string;
}
