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
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { RegisterFormSchema } from "@/schema/AuthFormSchema";
import { RegisterFormInputs } from "@/types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { creatUserActions } from "@/actions/AuthActions";
import { useAppDispatch } from "@/hooks/hooks";
import { RootState } from "@/stores/store";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignInForm() {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState<boolean>(false);
  
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const toggleConfirmVisibility = () => setIsConfirmVisible((prevState) => !prevState);

  const passwordValue = form.watch("password", "");

  // Copier automatiquement le mot de passe dans le champ de confirmation
  useEffect(() => {
    form.setValue("password_confirmation", passwordValue);
  }, [passwordValue, form]);

  // Logique de vérification de la force du mot de passe
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "8 caractères", key: "length" },
      { regex: /[0-9]/, text: "1 chiffre", key: "number" },
      { regex: /[a-z]/, text: "1 minuscule", key: "lowercase" },
      { regex: /[A-Z]/, text: "1 majuscule", key: "uppercase" },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
      key: req.key,
    }));
  };

  const strength = checkStrength(passwordValue);

  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const redirect = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    dispatch(creatUserActions(data))
      .unwrap()
      .then(() => {
        redirect.push("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  return ( 
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#007BFF] mb-8">
        INSCRIPTION
      </h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="email" className="block text-base font-normal mb-2">
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Veuillez saisir votre Adresse Email"
                    {...field}
                    className="w-full px-4 py-6 rounded-md border border-gray-300 bg-[#F5F8FA] focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="password" className="block text-base font-normal mb-2">
                  Mot de passe<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="••••••••••"
                      {...field}
                      onFocus={() => setShowPasswordStrength(true)}
                      onBlur={() => {
                        if (!passwordValue) {
                          setShowPasswordStrength(false);
                        }
                      }}
                      className="w-full px-4 py-6 rounded-md border border-gray-300 bg-[#F5F8FA] focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] pr-12"
                    />
                  </FormControl>
                  <button
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-500 hover:text-gray-700"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOffIcon size={20} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={20} aria-hidden="true" />
                    )}
                  </button>
                </div>
                {showPasswordStrength && passwordValue && (
                  <div className="mt-3">
                    <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-3">
                      {strength.map((req, index) => (
                        <div key={index} className="flex flex-col items-start gap-1">
                          <div className="items-center gap-1.5">
                            <div className="w-22 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                req.met ? "bg-blue-500 w-full" : "bg-border w-0"
                              }`}
                            ></div>
                          </div>
                          </div>
                          <span className={`text-sm ${req.met ? "text-foreground" : "text-muted-foreground"}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="password_confirmation" className="block text-base font-normal mb-2">
                  Confirmer le mot de passe<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={isConfirmVisible ? "text" : "password"}
                      placeholder="••••••••••"
                      {...field}
                      disabled
                      className="w-full px-4 py-6 rounded-md border border-gray-300 bg-[#F5F8FA] focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] pr-12 disabled:opacity-70"
                    />
                  </FormControl>
                  <button
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-500 hover:text-gray-700"
                    type="button"
                    onClick={toggleConfirmVisibility}
                  >
                    {isConfirmVisible ? (
                      <EyeOffIcon size={20} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={20} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start gap-3 pt-2">
            <Checkbox className="mt-0.5" />
            <span className="text-sm text-gray-700">
              J'accepte les CGU et la politique de confidentialité <span className="text-red-500">*</span>
            </span>
          </div>
          
          <div className="pt-4">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full text-lg font-semibold py-6 rounded-md bg-[#007BFF] hover:bg-[#0066DD] text-white transition-colors"
            >
              {isLoading ? "Création en cours..." : "Créer mon compte"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}