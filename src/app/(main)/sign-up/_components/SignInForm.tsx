"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { 
  checkEmailActions, 
  verifyLoginOtpActions, 
  loginWithPasswordActions 
} from "@/actions/AuthActions";
import { useAppDispatch } from "@/hooks/hooks";
import { RootState } from "@/stores/store";
import { useRouter } from "next/navigation";
import { 
  CheckEmailSchema, 
  VerifyLoginOtpSchema, 
  LoginWithPasswordSchema 
} from "@/schema/AuthFormSchema";
import type { CheckEmailInputs, VerifyLoginOtpInputs, LoginWithPasswordInputs } from "@/types/AuthType";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // État Redux
  const { isLoading, isOtpSent, loginEmail, isVerifyingOtp, error } = useSelector(
    (state: RootState) => state.auth
  );

  // États locaux
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showPasswordMethod, setShowPasswordMethod] = useState<boolean>(false);
  const [verificationInputs, setVerificationInputs] = useState<string[]>(["", "", "", "", "", ""]);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Formulaire pour vérifier l'email
  const checkEmailForm = useForm<CheckEmailInputs>({
    resolver: zodResolver(CheckEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Formulaire pour la connexion avec mot de passe
  const passwordForm = useForm<LoginWithPasswordInputs>({
    resolver: zodResolver(LoginWithPasswordSchema),
    defaultValues: {
      email: loginEmail || "",
      password: "",
    },
  });

  // Mettre à jour l'email dans le formulaire password quand loginEmail change
  useEffect(() => {
    if (loginEmail) {
      passwordForm.setValue("email", loginEmail);
    }
  }, [loginEmail, passwordForm]);

  // ═══════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════


  const handleCheckEmail: SubmitHandler<CheckEmailInputs> = async (data) => {
    try {
        const result = await dispatch(checkEmailActions(data)).unwrap();
        console.log("Résultat unwrap:", result);
    } catch (error: any) {
        console.error("Erreur complète capturée:", error);
        console.error("Type de l'erreur:", typeof error);
        console.error("Clés de l'erreur:", Object.keys(error));
    }
};
  /**
   * Gérer les changements dans les champs OTP
   */
  const handleVerificationChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newInputs = [...verificationInputs];
      newInputs[index] = value;
      setVerificationInputs(newInputs);

      // Auto-focus sur le champ suivant
      if (value && index < 5) {
        const nextInput = document.getElementById(`verification-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  /**
   * Gérer le retour arrière (backspace)
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationInputs[index] && index > 0) {
      const prevInput = document.getElementById(`verification-${index - 1}`);
      prevInput?.focus();
    }
  };

  /**
   * Étape 2A: Vérifier l'OTP et se connecter
   */
  const handleVerifyOtp = async () => {
    const otpCode = verificationInputs.join("");
    
    if (otpCode.length !== 6) {
      return;
    }

    if (!loginEmail) {
      return;
    }

    try {
      await dispatch(
        verifyLoginOtpActions({
          email: loginEmail,
          otp_code: otpCode,
        })
      ).unwrap();
      
      // Redirection après succès
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erreur lors de la vérification de l'OTP:", error);
      // Réinitialiser les champs OTP en cas d'erreur
      setVerificationInputs(["", "", "", "", "", ""]);
    }
  };

  /**
   * Étape 2B: Se connecter avec mot de passe
   */
  const handleLoginWithPassword: SubmitHandler<LoginWithPasswordInputs> = async (data) => {
    try {
      await dispatch(loginWithPasswordActions(data)).unwrap();
      
      // Redirection après succès
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erreur lors de la connexion avec mot de passe:", error);
    }
  };

  /**
   * Basculer vers la méthode de connexion par mot de passe
   */
  const handleUsePassword = () => {
    setShowPasswordMethod(true);
  };

  /**
   * Retour à la méthode OTP
   */
  const handleBackToOtp = () => {
    setShowPasswordMethod(false);
    passwordForm.reset();
  };

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#007BFF] mb-8">
        SE CONNECTER
      </h1>

      {/* ═══════════════════════════════════════════════════════════════════════
          ÉTAPE 1: VÉRIFIER L'EMAIL
      ═══════════════════════════════════════════════════════════════════════ */}
      {!isOtpSent && (
        <Form {...checkEmailForm}>
          <form onSubmit={checkEmailForm.handleSubmit(handleCheckEmail)} className="space-y-6">
            <FormField
              control={checkEmailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="email" className="font-medium text-base block mb-2">
                    Email ou nom d'utilisateur
                  </label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Veuillez saisir votre adresse Email ou votre nom d'utilisateur"
                      {...field}
                      disabled={isLoading}
                      className="py-6 px-4 bg-[#F7FBFF] placeholder:text-[#8897AD] border border-[#D4D7E3] rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg font-medium py-6 bg-[#007BFF] hover:bg-[#0066DD] rounded-md"
            >
              {isLoading ? "Vérification..." : "Continuer"}
            </Button>
          </form>
        </Form>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          ÉTAPE 2A: CONNEXION AVEC OTP
      ═══════════════════════════════════════════════════════════════════════ */}
      {isOtpSent && !showPasswordMethod && (
        <div className="space-y-6">
          {/* Afficher l'email */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Code envoyé à <span className="font-semibold">{loginEmail}</span>
            </p>
          </div>

          {/* Champs OTP */}
          <div className="space-y-3">
            <label className="font-medium text-base block">
              Code de vérification <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 justify-between">
              {verificationInputs.map((value, index) => (
                <Input
                  key={index}
                  id={`verification-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleVerificationChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isVerifyingOtp}
                  className="w-16 h-16 text-center text-xl bg-[#F7FBFF] border border-[#D4D7E3] rounded-md focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                />
              ))}
            </div>
          </div>

          {/* Bouton vérifier OTP */}
          <Button
            type="button"
            onClick={handleVerifyOtp}
            disabled={isVerifyingOtp || verificationInputs.join("").length !== 6}
            className="w-full text-lg font-medium py-6 bg-[#007BFF] hover:bg-[#0066DD] rounded-md"
          >
            {isVerifyingOtp ? "Vérification..." : "Se connecter"}
          </Button>

          {/* Bouton utiliser mot de passe */}
          <Button
            type="button"
            onClick={handleUsePassword}
            className="w-auto px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-md"
          >
            Utiliser mot de passe
          </Button>

          {/* Lien renvoyer le code */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                if (loginEmail) {
                  dispatch(checkEmailActions({ email: loginEmail }));
                }
              }}
              className="text-sm text-[#007BFF] hover:underline"
            >
              Renvoyer le code
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          ÉTAPE 2B: CONNEXION AVEC MOT DE PASSE
      ═══════════════════════════════════════════════════════════════════════ */}
      {isOtpSent && showPasswordMethod && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(handleLoginWithPassword)} className="space-y-6">
            {/* Champ Email (lecture seule) */}
            <FormField
              control={passwordForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="email" className="font-medium text-base block mb-2">
                    Email
                  </label>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      disabled
                      className="py-6 px-4 bg-gray-100 border border-[#D4D7E3] rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ Mot de passe */}
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="password" className="font-medium text-base block mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Entrer votre mot de passe"
                        {...field}
                        disabled={isLoading}
                        className="py-6 px-4 pr-12 bg-[#F7FBFF] placeholder:text-[#8897AD] border border-[#D4D7E3] rounded-md"
                      />
                    </FormControl>
                    <button
                      className="absolute inset-y-0 right-3 flex items-center text-[#8897AD] hover:text-foreground"
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={20} aria-hidden="true" />
                      ) : (
                        <Eye size={20} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Se souvenir de moi et Mot de passe oublié */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="rememberMe" className="text-sm cursor-pointer">
                  Se souvenir de moi
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#007BFF] hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton se connecter */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg font-medium py-6 bg-[#007BFF] hover:bg-[#0066DD] rounded-md"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            {/* Bouton retour à l'OTP */}
            <button
              type="button"
              onClick={handleBackToOtp}
              className="w-full text-sm text-[#007BFF] hover:underline"
            >
              ← Retour à la connexion avec code
            </button>
          </form>
        </Form>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SÉPARATEUR ET CONNEXION SOCIALE
      ═══════════════════════════════════════════════════════════════════════ */}
      {!isOtpSent && (
        <>
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Ou continuer avec</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant="outline"
              className="py-6 flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="py-6 flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm">Facebook</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="py-6 flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm">Apple</span>
            </Button>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          LIEN VERS INSCRIPTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">Pas encore inscrit ? </span>
        <Link href="/register" className="text-sm text-[#007BFF] hover:underline font-medium">
          Créez votre compte
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          AFFICHAGE DES ERREURS
      ═══════════════════════════════════════════════════════════════════════ */}
   
  {error && (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
      {/*
        MODIFICATION ICI : 
        On s'assure que la variable affichée est toujours une chaîne de caractères.
        Si 'error' est un objet (ce qui cause l'affichage 'Object {...}'), on accède
        explicitement à sa propriété 'message'. Sinon, on utilise 'error' tel quel.
      */}
      <p className="text-sm text-red-600">
        {typeof error === 'string' ? error : (error as any).message || 'Une erreur est survenue.'}
      </p>
    </div>
  )}
</div>
);


}