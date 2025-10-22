// This file contains authentication form validation schemas using Zod.
import z from "zod";

/**
 * Zod schema for the login form.
 * Validates the user's email and password.
 */
export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
        .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." })
        .regex(/[^A-Za-z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial." }),
});

/**
 * Zod schema for the "Forgot Password" form.
 * Validates the email address for password reset requests.
 */
export const ForgotPassFormSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
});

/**
 * Zod schema for the "Change Password" form.
 * Validates a new password and its confirmation to ensure they match and meet complexity requirements.
 */
export const ChangePassFormSchema = z.object({
    password: z.string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
        .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." })
        .regex(/[^A-Za-z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial." }),
    confirmPassword: z.string()
        .min(8, { message: "Le mot de passe de confirmation doit contenir au moins 8 caractères." })
        .regex(/[A-Z]/, { message: "Le mot de passe de confirmation doit contenir au moins une majuscule." })
        .regex(/[a-z]/, { message: "Le mot de passe de confirmation doit contenir au moins une minuscule." })
        .regex(/[0-9]/, { message: "Le mot de passe de confirmation doit contenir au moins un chiffre." })
        .regex(/[^A-Za-z0-9]/, { message: "Le mot de passe de confirmation doit contenir au moins un caractère spécial." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});

/**
 * Zod schema for the user registration form.
 * Validates the new user's email and password.
 */
export const RegisterFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["password_confirmation"],
});




// Nouveau : Schéma pour vérifier l'email
export const CheckEmailSchema = z.object({
    email: z.string().email({ message: "Email invalide" })
});

// Nouveau : Schéma pour vérifier l'OTP de connexion
export const VerifyLoginOtpSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    otp_code: z.string()
        .length(6, { message: "Le code OTP doit contenir exactement 6 chiffres" })
        .regex(/^\d+$/, { message: "Le code OTP doit contenir uniquement des chiffres" })
});

// Nouveau : Schéma pour la connexion avec mot de passe (simplifié)
export const LoginWithPasswordSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(1, { message: "Le mot de passe est requis" })
});

// Schéma pour la vérification de compte après inscription
export const VerifyAccountSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    otp_code: z.string()
        .length(6, { message: "Le code OTP doit contenir exactement 6 chiffres" })
        .regex(/^\d+$/, { message: "Le code OTP doit contenir uniquement des chiffres" })
});

// Schéma pour le mot de passe oublié
export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Email invalide" })
});

// Schéma pour réinitialiser le mot de passe avec OTP
export const ResetPasswordWithOtpSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    otp_code: z.string()
        .length(6, { message: "Le code OTP doit contenir exactement 6 chiffres" })
        .regex(/^\d+$/, { message: "Le code OTP doit contenir uniquement des chiffres" }),
    password: z.string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
        .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
});