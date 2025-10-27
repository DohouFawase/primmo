'use client';

import React from 'react';
// 🔑 NOUVEL IMPORT CLÉ
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
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Suppression des schémas, types et useForm locaux.

const ELECTRICITE_OPTIONS = [
    { id: "personnel", label: "Compteur personnel" },
    { id: "commun", label: "Compteur commun" },
    { id: "pas_electricite", label: "Pas d'électricité" },
];


const Step3 = () => {
    // 🔑 1. Accéder au formulaire global du Wizard
    const methods = useFormContext();
    const { watch, control, formState: { errors } } = methods;

    // 💡 Fonction utilitaire pour gérer la conversion du nombre en chaîne pour l'Input
    // RHF enregistre la valeur `number` pour les champs preprocessés. L'input type="number"
    // ou "text" a besoin d'une chaîne.
    const numericFieldProps = (field) => ({
        ...field,
        // Convertit la valeur de number à string pour l'input, si elle existe.
        value: field.value === undefined || field.value === null ? "" : String(field.value),
        // S'assure de convertir la chaîne de l'Input en nombre pour RHF lors du changement.
        onChange: (e) => {
            const value = e.target.value;
            // Si la chaîne est vide, on renvoie une chaîne vide (Zod la convertira en undefined)
            field.onChange(value === "" ? "" : Number(value));
        },
    });

    // 2. Rendu du contenu de l'étape (sans les balises <Form> et <form>)
    return (
        <div className="space-y-8">
            
            <h2 className="text-xl font-bold text-gray-700 uppercase mb-6">
                Caractéristiques du bien
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Colonne de gauche */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Ligne 1: Superficie et Unité (Groupées) */}
                    <div className="grid grid-cols-3 gap-2">
                        
                        {/* Champ 1: Superficie */}
                        <FormField
                            control={control}
                            name="superficie"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Superficie*</FormLabel>
                                    <FormControl>
                                        <Input
                                            // 🔑 Utiliser le helper pour la conversion number <> string
                                            {...numericFieldProps(field)}
                                            type="number"
                                            placeholder="Ex: 500"
                                            className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ 2: Unité (Select) */}
                        <FormField
                            control={control}
                            name="unite"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Unité *</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        // 💡 Assurez-vous que la valeur est de type string
                                        defaultValue={field.value} 
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="border border-gray-200 bg-gray-50 rounded-lg p-3 h-auto focus:ring-blue-500 focus:ring-2 focus:ring-offset-0">
                                                <SelectValue placeholder="Choisir" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m²">m²</SelectItem>
                                            <SelectItem value="ha">ha</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Champ 3: Nombre d'unités/ménages */}
                    <FormField
                        control={control}
                        name="nombreUnites"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre d'unités/ménages *</FormLabel>
                                <FormControl>
                                    <Input
                                        // 🔑 Utiliser le helper pour la conversion number <> string
                                        {...numericFieldProps(field)}
                                        type="number"
                                        placeholder="Ex: 1"
                                        className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    {/* Champ 4: Type de construction (Select) */}
                    <FormField
                        control={control}
                        name="typeConstruction"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type de construction *</FormLabel>
                                <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-200 bg-gray-50 rounded-lg p-3 h-auto focus:ring-blue-500 focus:ring-2 focus:ring-offset-0">
                                            <SelectValue placeholder="Sélectionner..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="En construction">En construction</SelectItem>
                                        <SelectItem value="A démolir">À démolir</SelectItem>
                                        <SelectItem value="Libre">Libre</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Champ 5: Électricité (Checkboxes) - La logique RHF est maintenue */}
                    <FormField
                        control={control}
                        name="electricite"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-base">Électricité *</FormLabel>
                                <div className="space-y-2">
                                    {ELECTRICITE_OPTIONS.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={control}
                                            name="electricite"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                // S'assure que field.value est bien un tableau avant d'appeler includes
                                                                checked={Array.isArray(field.value) && field.value.includes(item.id)} 
                                                                onCheckedChange={(checked) => {
                                                                    // S'assure que field.value est bien un tableau ou un tableau vide si undefined
                                                                    const currentValues = Array.isArray(field.value) ? field.value : [];
                                                                    return checked
                                                                        ? field.onChange([...currentValues, item.id])
                                                                        : field.onChange(
                                                                            currentValues.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                                className="mt-1"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                {/* Colonne de droite (Description détaillée du bien) */}
                <div className="lg:col-span-2 space-y-2">
                    {/* Champ 6: Description détaillée */}
                    <FormField
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description détaillée du bien *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Décrivez votre bien, les conditions de location, les équipements..."
                                        className="min-h-[400px] border border-gray-200 bg-gray-50 rounded-lg p-4 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700 resize-none"
                                    />
                                </FormControl>
                                {/* Compteur de caractères, maintenant connecté à la valeur du formulaire */}
                                <p className="text-right text-sm text-gray-500 min-h-[20px]">
                                    Min 10 caractères (actuel : {field.value ? field.value.length : 0})
                                </p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Step3;