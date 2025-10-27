'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form'; // 🔑 FormProvider est clé
import { zodResolver } from '@hookform/resolvers/zod';

// Import des étapes (Adaptez les chemins si nécessaire)


// Import des composants UI
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check } from 'lucide-react';
import Step1 from './wizard/Step-1';
import Step2 from './wizard/Step-2';
import Step3 from './wizard/Step-3';
import Step4 from './wizard/Step-4';
import Step5 from './wizard/Step-5';
import Step6 from './wizard/Step-6';
import { GlobalAnnonceFormData, globalAnnonceSchema } from '@/schema/AnnouncesFormSchema';

// --- Définition des Étapes ---
const steps = [
    { id: 1, name: 'Infos de base', component: Step1 },
    { id: 2, name: 'Localisation', component: Step2 },
    { id: 3, name: 'Caractéristiques', component: Step3 },
    { id: 4, name: 'Tarification', component: Step4 },
    { id: 5, name: 'Équipements', component: Step5 },
    { id: 6, name: 'Médias', component: Step6 },
];

// --- Valeurs par Défaut Globales ---
const defaultValues: GlobalAnnonceFormData = {
    // Étape 1
    typeBien: "Appartement",
    typeAnnonce: "Location",
    titre: "Superbe appartement à louer en centre-ville",
    
    // Étape 2 (Localisation)
    address: "22 Rue de la Liberté",
    locationDescription: undefined, // undefined pour les facultatifs vides
    country: "Bénin",
    city: "Cotonou",
    district: "Haie Vive",
    street: "Rue 10",
    longitude: 2.45, // Exemple numérique
    latitude: 6.35, // Exemple numérique
    
    // Étape 3 (Caractéristiques)
    superficie: 120, // Exemple numérique
    unite: "m²",
    nombreUnites: 1, // Exemple numérique entier
    typeConstruction: "Libre",
    description: "Description de la propriété nécessitant plus de 10 caractères.",
    electricite: ["personnel"],
    
    // Étape 4 (Tarification)
    montantLoyer: 1200, // Exemple numérique
    deviseLoyer: "EUR",
    periodicite: "MOIS",
    commissionLocation: 100, // Exemple numérique
    deviseCommission: "EUR",
    cautionDemandee: 2, // Exemple numérique
    
    // Étape 5 (Équipements)
    equipements: ["1", "3", "5"], // IDs d'équipements sélectionnés
    
    // Étape 6 (Médias)
    photos: [
        { id: "1", name: "Immeuble_devant.png", size: 4.5, isPrincipal: true },
        { id: "2", name: "Salon_panoramique.jpeg", size: 3.2, isPrincipal: false },
    ],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
};


const CreateAnounce = () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    // 🔑 1. Initialisation unique de RHF pour l'ensemble du formulaire
    const methods = useForm<GlobalAnnonceFormData>({
        resolver: zodResolver(globalAnnonceSchema),
        defaultValues,
        mode: "onChange",
    });
    
    const { handleSubmit, trigger, getValues } = methods;

    // --- Fonctions de Navigation ---

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleNext = async () => {
        // 🔑 2. Déclencher la validation uniquement pour les champs de l'étape courante
        const stepFields = getFieldsForStep(currentStep);
        const isValid = await trigger(stepFields as any, { shouldFocus: true });
        
        if (isValid && currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        } else if (isValid && currentStep === steps.length) {
            // Si c'est la dernière étape et que c'est valide, on soumet.
            // Le handleSubmit appellera la fonction onSubmit finale.
            handleSubmit(onSubmit)();
        }
    };

    // --- Fonction d'aide pour la Validation par Étape ---
    const getFieldsForStep = (step: number) => {
        // Cette fonction doit retourner un tableau des noms de champs de l'étape correspondante.
        switch (step) {
            case 1: return ['typeBien', 'typeAnnonce', 'titre'];
            case 2: return ['address', 'country', 'city', 'longitude', 'latitude', 'locationDescription', 'district', 'street'];
            case 3: return ['superficie', 'unite', 'nombreUnites', 'typeConstruction', 'description', 'electricite'];
            case 4: return ['montantLoyer', 'deviseLoyer', 'periodicite', 'commissionLocation', 'deviseCommission', 'cautionDemandee'];
            case 5: return ['equipements'];
            case 6: return ['photos', 'youtubeLink'];
            default: return [];
        }
    };

    // --- Soumission Finale ---
    const onSubmit = (data: GlobalAnnonceFormData) => {
        console.log("Formulaire final soumis avec succès:", data);
        // Ici, vous enverriez les données à votre API.
    };
    
    // 🔑 Composant de l'étape actuelle
    const CurrentComponent = steps[currentStep - 1].component;

    // --- Rendu ---
    return (
        <FormProvider {...methods}>
            {/* 🔑 La balise <form> doit englober tout le contenu pour la soumission finale */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 p-4 max-w-5xl mx-auto">
                
                {/* 1. Indicateur de progression (simple) */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Création d'une annonce - Étape {currentStep} / {steps.length}
                    </h1>
                    {/* Vous pouvez insérer ici une barre de progression sophistiquée */}
                </div>

                {/* 2. Contenu de l'étape courante */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-h-[600px]">
                    <CurrentComponent />
                </div>

                {/* 3. Boutons de navigation */}
                <div className="flex justify-between pt-4">
                    <Button 
                        type="button" 
                        onClick={handleBack} 
                        disabled={currentStep === 1}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" /> Précédent
                    </Button>
                    
                    <Button 
                        type="button" // On utilise type="button" pour déclencher la validation manuellement
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {currentStep < steps.length ? (
                            <>Suivant</>
                        ) : (
                            <>
                                <Check className="h-4 w-4" /> Soumettre
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateAnounce;