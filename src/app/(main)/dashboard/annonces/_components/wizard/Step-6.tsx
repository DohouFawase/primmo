'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form'; 
import { UploadCloud, FileText, X, Youtube } from 'lucide-react';

import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


interface FileItemData {
    id: string;
    name: string;
    size: number; // Taille en Mo
    isPrincipal: boolean;
}

const DEMO_PHOTOS: FileItemData[] = [
    { id: "1", name: "Immeuble_plan-devant.png", size: 4.5, isPrincipal: true },
    { id: "2", name: "Salon_Vue_panoramique.jpeg", size: 3.2, isPrincipal: false },
    { id: "3", name: "Cuisine_Equipee.webp", size: 2.1, isPrincipal: false },
];


const Dropzone = () => (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#1E1E1E94] rounded-2xl bg-gray-50 text-center space-y-4">
        <UploadCloud className="w-12 h-12 text-gray-400" />
        <p className="font-semibold text-gray-700">Glisser-déposer ici pour importer une photo</p>
        <p className="text-sm text-gray-500">Formats : JPEG, PNG, WebP, 20 Mo maximum, maximum : 20 photos</p>
        <span className="text-sm text-gray-500">Ou</span>
        <Button 
            type="button" 
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
            onClick={() => console.log("Clic sur Importer")}
        >
            Importer
        </Button>
    </div>
);

const FileItem = ({ file, onRemove, onTogglePrincipal }: { file: FileItemData, onRemove: (id: string) => void, onTogglePrincipal: (id: string, isPrincipal: boolean) => void }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-[#F1F1F1] shadow-sm hover:bg-gray-50 transition duration-150">
        
        <div className="flex items-center space-x-3 w-1/2">
            <FileText className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
        </div>

        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`principal-${file.id}`}
                    checked={file.isPrincipal}
                    onCheckedChange={(checked) => onTogglePrincipal(file.id, !!checked)}
                    className="w-4 h-4 rounded text-blue-600 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                />
                <label 
                    htmlFor={`principal-${file.id}`}
                    className="text-sm text-[#007BFF] select-none cursor-pointer"
                >
                    Définir comme photo principale
                </label>
            </div>
            
            {/* Taille du fichier */}
            <span className="text-sm text-gray-500">{file.size.toFixed(1)} Mo</span>

            {/* Bouton de suppression */}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(file.id)}
                className="w-8 h-8 text-gray-400 hover:bg-red-50 hover:text-red-500"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    </div>
);



const Step6 = () => {
    // 🔑 1. Accès au contexte du formulaire RHF
    const { control, watch, setValue, formState: { errors } } = useFormContext();

    // 🔑 2. Lire l'état des photos directement depuis le formulaire RHF
    // 'watch' crée une souscription pour que le composant se re-rende si 'photos' change
    const photos: FileItemData[] = watch('photos') || [];
    
    // --- Fonctions de manipulation qui utilisent setValue ---

    const handleRemoveFile = (id: string) => {
        const newPhotos = photos.filter(f => f.id !== id);
        // Mettre à jour le champ 'photos' dans le formulaire RHF
        setValue('photos', newPhotos, { 
            shouldValidate: true, 
            shouldDirty: true 
        });
    };

    const handleTogglePrincipal = (id: string, isPrincipal: boolean) => {
        const newPhotos = photos.map(f => ({
            ...f,
            // Rendre toutes les autres photos non principales si celle-ci devient principale
            isPrincipal: f.id === id ? isPrincipal : (isPrincipal ? false : f.isPrincipal)
        }));
        
        // Mettre à jour le champ 'photos' dans le formulaire RHF
        setValue('photos', newPhotos, { 
            shouldValidate: true, 
            shouldDirty: true 
        });
    };
    
    // 🔑 3. Le rendu se fait directement (sans les balises <Form> et <form>)
    return (
        <div className="space-y-10 flex flex-col w-full max-w-3xl mx-auto">
                
            {/* Section 1: Photos du bien (Dropzone et Liste des fichiers) */}
            <h2 className="text-xl font-bold text-gray-700 uppercase mb-6">
                PHOTOS DU BIEN *
            </h2>
            
            <div className="flex flex-col space-y-4">
                {/* Colonne principale pour le Dropzone */}
                <div className="">
                    <Dropzone />
                </div>

                {/* Colonne pour la liste des fichiers */}
                <div className="space-y-2">
                    {photos.map(file => (
                        <FileItem 
                            key={file.id}
                            file={file}
                            onRemove={handleRemoveFile}
                            onTogglePrincipal={handleTogglePrincipal}
                        />
                    ))}
                </div>
            </div>

            {/* Afficher l'erreur Zod pour le champ 'photos' */}
            {errors.photos && (
                 <p className="text-red-500 text-sm mt-2 font-medium">
                    {errors.photos.message}
                </p>
            )}

            {/* Section 2: Lien vidéo YouTube */}
            <h2 className="text-lg font-bold text-gray-700 uppercase pt-6">
                Lien vidéo YouTube (Facultatif)
            </h2>

            <FormField
                control={control} // 🔑 Utiliser le contrôle du contexte
                name="youtubeLink"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="sr-only">Lien vidéo YouTube</FormLabel>
                        <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg p-3 w-full shadow-sm">
                            <Youtube className="h-5 w-5 text-red-600 mr-2" />
                            <FormControl>
                                <Input
                                    {...field}
                                    type="url"
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500"
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    );
}

export default Step6;