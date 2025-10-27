'use client'
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form'; // 👈 NOUVEL IMPORT CLÉ
// Imports des actions Redux et hooks
import { getPropertyType } from '@/actions/PropertyActions';
import { useAppDispatch } from "@/hooks/hooks";

// Import des icônes de Lucide
import { Home, Building, Bed, Landmark, Store, Briefcase, LayoutGrid } from 'lucide-react';

// --- Types ---
// Utilisez le type FormData du composant parent si possible,
// sinon cette définition est suffisante pour les données API.
interface PropertyType {
    id: string;
    name: string;
    icon_class: string | null; 
    created_at: string;
    updated_at: string;
}

// Fonction utilitaire pour mapper le nom du bien à une icône de Lucide
// (Laissée inchangée, elle est bien)
const getIconComponent = (name: string, className: string = "w-6 h-6 mb-2") => {
    const IconClass = className; 
    switch (name) {
        case 'Appartement': return <Building className={IconClass} />;
        case 'Studio': return <Bed className={IconClass} />;
        case 'Maison': return <Home className={IconClass} />;
        case 'Auberge': return <Landmark className={IconClass} />;
        case 'Boutique': return <Store className={IconClass} />;
        case 'Bureau': return <Briefcase className={IconClass} />; 
        case 'Villa': 
             return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={IconClass}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h3.75v-1.5a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25v1.5h3.75c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21.75h7.5" />
                </svg>
            );
        case 'Hôtel': return <Building className={IconClass} />;
        case 'Terrain': return <LayoutGrid className={IconClass} />;
        case 'Chambre': return <Bed className={IconClass} />;
        default: return <Building className={IconClass} />; 
    }
}

// --- Composant Principal Step1 ---
const Step1 = () => {
    const dispatch = useAppDispatch();
    
    // 🔑 Connexion à react-hook-form
    const methods = useFormContext();
    const { watch, setValue, formState: { errors } } = methods;

    // États locaux
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Récupérer la valeur actuelle de `propertyType` dans le formulaire
    // C'est mieux que d'utiliser un état local `selectedTypeId` car RHF est la source de vérité.
    const selectedPropertyTypeId = watch("propertyType"); 

    // --- Logique de Récupération des Données du Backend ---
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            setIsLoading(true);
            try {
                const resultAction = await dispatch(getPropertyType());
                const actualData = resultAction.payload as PropertyType[]; 

                if (actualData && Array.isArray(actualData)) {
                    setPropertyTypes(actualData);
                } else {
                    console.error("Le format de données récupéré est incorrect.");
                    setPropertyTypes([]);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des types de biens:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPropertyTypes();
    }, [dispatch]);

    // --- Fonction de Gestion du Clic (Mise à jour du formulaire) ---
    const handleTypeSelection = (id: string) => {
        // 🔑 Mettre à jour la valeur dans le formulaire
        setValue("propertyType", id, { 
            shouldValidate: true, // 💡 Valide immédiatement après la sélection
            shouldDirty: true 
        });
    };

    // --- Composant Enfant : L'élément cliquable Type de Bien ---
    const PropertyTypeItem = ({ type }: { type: PropertyType }) => {
        // Utilise la valeur du formulaire pour déterminer l'état de sélection
        const isSelected = type.id === selectedPropertyTypeId;

        const baseClasses = "flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-full"; // Ajout de h-full
        const selectedClasses = "border-blue-500 bg-blue-50 text-blue-600 shadow-md transform scale-[1.02]"; // Ajout d'une légère transformation
        const defaultClasses = "border-gray-300 hover:border-blue-300 text-gray-700 hover:bg-gray-50";
        
        return (
            <div
                className={`${baseClasses} ${isSelected ? selectedClasses : defaultClasses}`}
                onClick={() => handleTypeSelection(type.id)}
            >
                <div className='flex flex-col items-center'> 
                    {getIconComponent(type.name)} 
                    <span className="text-sm font-medium text-center mt-1">{type.name}</span>
                </div>
            </div>
        );
    };


    // --- Rendu du Composant ---
    return (
        <div className="space-y-8"> 
           
            {/* --- Sélecteurs Type d'Annonce et Type de Location --- */}
            <div className="flex flex-wrap space-x-0 sm:space-x-8 gap-y-4">
                {/* Type d'Annonce (announcementType) */}
                <div className="flex items-center">
                    <label htmlFor="announcementType" className="text-gray-600 mr-4 font-medium whitespace-nowrap">Type d'annonce :</label>
                    <select 
                        id="announcementType"
                        // 🔑 Lier le champ `announcementType`
                        {...methods.register("announcementType")} 
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {/* Les options doivent correspondre aux valeurs du schéma Zod */}
                        <option value="rent">À louer</option>
                        <option value="sale">À vendre</option>
                    </select>
                </div>
                
                {/* Type de Location (locationType) */}
                <div className="flex items-center">
                    <label htmlFor="locationType" className="text-gray-600 mr-4 font-medium whitespace-nowrap">Type de location*:</label>
                    <select 
                        id="locationType"
                        // 🔑 Lier le champ `locationType`
                        {...methods.register("locationType")}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {/* Les options doivent correspondre aux valeurs du schéma Zod */}
                        <option value="recent">Plus récentes</option>
                        <option value="oldest">Moins récentes</option>
                    </select>
                </div>
            </div>

            {/* --- Sélection Type de Bien --- */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Type de bien * :</h2>
                
                {isLoading ? (
                    <div className="text-center text-blue-500 p-8">Chargement des types de biens...</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {propertyTypes.map((type) => (
                            <PropertyTypeItem key={type.id} type={type} />
                        ))}
                    </div>
                )}
                
                {/* 🚨 Affichage de l'erreur de validation Zod */}
                {errors.propertyType && (
                    <p className="text-red-500 text-sm mt-2 font-medium">
                        {errors.propertyType.message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Step1;