// ═══════════════════════════════════════════════════════════════════════
// INTERFACES UTILISATEUR ET AUTHENTIFICATION
// ═══════════════════════════════════════════════════════════════════════

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
    is_verified?: boolean;
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

// ═══════════════════════════════════════════════════════════════════════
// STATE D'AUTHENTIFICATION
// ═══════════════════════════════════════════════════════════════════════

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
    
    // Nouveaux champs pour le flux OTP
    isOtpSent: boolean;
    loginEmail: string | null;
    otpMethod: 'email' | 'password' | null; // Méthode choisie par l'utilisateur
    isVerifyingOtp: boolean;
}

// ═══════════════════════════════════════════════════════════════════════
// PAYLOADS DE SUCCÈS
// ═══════════════════════════════════════════════════════════════════════

export interface AuthSuccessPayload {
    message: string;
    user: User;
    token: string;
}

export interface LoginSuccessPayload {
    message: string;
    payload: {
        tokens: Tokens;
        user: User;
    };
}

// Nouveau : Payload pour checkEmail
export interface CheckEmailSuccessPayload {
    success: boolean;
    message: string;
      data: {
        otp_sent: boolean;
        email: string;
    };
}

// Nouveau : Payload pour verifyLoginOtp
export interface VerifyOtpSuccessPayload {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

// ═══════════════════════════════════════════════════════════════════════
// PAYLOADS D'ERREUR
// ═══════════════════════════════════════════════════════════════════════

export interface AuthRejectedPayload {
    message: string;
}

// ═══════════════════════════════════════════════════════════════════════
// ÉTAT INITIAL
// ═══════════════════════════════════════════════════════════════════════

// export const initialState: AuthState = {
//     user: null,
//     role: null,
//     token: null,
//     isLoading: false,
//     error: null,
//     userInfo: null,
//     success: false,
//     message: null,
//     isDeletingAccount: false,
    
//     // Nouveaux champs pour OTP
//     isOtpSent: false,
//     loginEmail: null,
//     otpMethod: null,
//     isVerifyingOtp: false,
// };

// ═══════════════════════════════════════════════════════════════════════
// AUTRES INTERFACES
// ═══════════════════════════════════════════════════════════════════════
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
    isOtpSent: boolean;
    loginEmail: string | null;
    otpMethod: 'email' | 'password' | null;
    isVerifyingOtp: boolean;
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
    isOtpSent: false,
    loginEmail: null,
       otpMethod: null,
    isVerifyingOtp: false,
  
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
}