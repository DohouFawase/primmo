'use client';

import React from 'react';
// 🔑 Remplacement : useForm est remplacé par useFormContext
import { useFormContext } from 'react-hook-form'; 

// Import des composants Shadcn/ui (laissé inchangé)
import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

// --- Constantes pour les options de sélection ---
const PERIODICITE_OPTIONS = ["MOIS", "SEMAINE", "AN"];
const DEVISE_OPTIONS = ["EUR", "USD", "XOF"];

// Suppression du tarificationSchema, du type local, des valeurs par défaut et de useForm.

const Step4 = () => {
    // 🔑 1. Accéder au formulaire global du Wizard
    const { control, formState: { errors } } = useFormContext();

    // 💡 Helper pour gérer la conversion Number/String et la suppression des caractères non numériques
    // Ce helper est nécessaire car RHF (avec Zod preprocess) gère le champ comme un 'number',
    // mais le HTML input a besoin d'une 'string'.
    const numericFieldProps = (field) => ({
        ...field,
        value: field.value === undefined || field.value === null ? "" : String(field.value),
        // S'assure de nettoyer la saisie de l'utilisateur et de la convertir en nombre (ou undefined/empty string) pour RHF
        onChange: (e) => {
            // Nettoyer tous les caractères sauf les chiffres et le point (ou la virgule si tu utilises la localisation)
            const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
            // Si la chaîne est vide, on renvoie une chaîne vide (Zod la convertira en undefined)
            field.onChange(cleanedValue === "" ? "" : Number(cleanedValue));
        },
    });

    return (
        // 2. Supprimer <Form {...form}> et <form>
        <div className="space-y-12">
                
            <h2 className="text-xl font-bold text-gray-700 uppercase mb-8 text-center">
                Tarification (Location)
            </h2>

            {/* --- Ligne 1: Loyer, Devise, Périodicité --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Montant du loyer */}
                <FormField
                    control={control}
                    name="montantLoyer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Montant du loyer *</FormLabel>
                            <FormControl>
                                <Input
                                    // 🔑 Utilisation du helper
                                    {...numericFieldProps(field)}
                                    type="number" 
                                    placeholder="1 200"
                                    className="text-center border-none bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700 h-12"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Devise du loyer */}
                <FormField
                    control={control}
                    name="deviseLoyer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Devise *</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                value={field.value} // Assure la liaison du Select
                            >
                                <FormControl>
                                    <SelectTrigger className="border-none bg-gray-50 rounded-lg p-3 h-12 text-center focus:ring-blue-500 focus:ring-2 focus:ring-offset-0">
                                        <SelectValue placeholder="Devise" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {DEVISE_OPTIONS.map(devise => (
                                        <SelectItem key={devise} value={devise}>{devise}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Périodicité */}
                <FormField
                    control={control}
                    name="periodicite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Périodicité *</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="border-none bg-gray-50 rounded-lg p-3 h-12 text-center focus:ring-blue-500 focus:ring-2 focus:ring-offset-0">
                                        <SelectValue placeholder="Périodicité" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {PERIODICITE_OPTIONS.map(periode => (
                                        <SelectItem key={periode} value={periode}>{periode}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* --- Ligne 2: Commission de location, Devise, Caution demandée --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Commission de location */}
                <FormField
                    control={control}
                    name="commissionLocation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commission de location *</FormLabel>
                            <FormControl>
                                <Input
                                    // 🔑 Utilisation du helper
                                    {...numericFieldProps(field)}
                                    type="number"
                                    placeholder="1 200"
                                    className="text-center border-none bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700 h-12"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Devise de la commission */}
                <FormField
                    control={control}
                    name="deviseCommission"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Devise *</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="border-none bg-gray-50 rounded-lg p-3 h-12 text-center focus:ring-blue-500 focus:ring-2 focus:ring-offset-0">
                                        <SelectValue placeholder="Devise" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {DEVISE_OPTIONS.map(devise => (
                                        <SelectItem key={devise} value={devise}>{devise}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Caution demandée */}
                <FormField
                    control={control}
                    name="cautionDemandee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Caution demandée</FormLabel>
                            <FormControl>
                                <Input
                                    // 🔑 Utilisation du helper
                                    {...numericFieldProps(field)}
                                    type="number"
                                    placeholder="12"
                                    className="text-center border-none bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700 h-12"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

        </div>
    );
}

export default Step4;