// All Authentication Types
import { LoginFormSchema, ForgotPassFormSchema, ChangePassFormSchema } from "@/schema/AuthFormSchema";
import z from "zod";

/**
 * @typedef {object} LoginType
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */
export type LoginType = {
    email: string;
    password: string;
}

/**
 * @typedef {object} RegisterType
 * @property {string} name - The user's full name.
 * @property {string} lastname - The user's last name.
 * @property {string} firstname - The user's first name.
 * @property {string} password - The user's password.
 */
export type RegisterType = {
    name: string;
    lastname: string;
    firstname: string;
    password: string;
}

/**
 * @typedef {object} ForgotPassType
 * @property {string} email - The email address for password recovery.
 */
export type ForgotPassType = {
    email: string;
}

/**
 * @typedef {object} ChangePassType
 * @property {string} password - The new password.
 */
export type ChangePassType = {
    current_password: string;
    new_password: string;
    confirm_password: string;
}


/**
 * @typedef {z.infer<typeof LoginFormSchema>} LoginFormInputs
 * @description Inferred type for the login form based on the Zod schema.
 */
export type LoginFormInputs = z.infer<typeof LoginFormSchema>;

/**
 * @typedef {z.infer<typeof ForgotPassFormSchema>} PasswordForgetFormInputs
 * @description Inferred type for the "forgot password" form based on the Zod schema.
 */
export type PasswordForgetFormInputs = z.infer<typeof ForgotPassFormSchema>;

/**
 * @typedef {z.infer<typeof ChangePassFormSchema>} ChangePasswordFormInputs
 * @description Inferred type for the "change password" form based on the Zod schema.
 */
export type ChangePasswordFormInputs = z.infer<typeof ChangePassFormSchema>;



/**
 * @typedef {z.infer<typeof RegisterFormSchema>} RegisterFormInputs
 * @description Inferred type for the registration form based on the Zod schema.
 */
export type RegisterFormInputs = z.infer<typeof ChangePassFormSchema>;