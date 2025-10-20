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
    firstname: z.string().min(1, { message: "Le prénom ne peut pas être vide." }),
    lastname: z.string().min(1, { message: "Le nom ne peut pas être vide." }),
    password: z.string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
        .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." })
        .regex(/[^A-Za-z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial." }),
});