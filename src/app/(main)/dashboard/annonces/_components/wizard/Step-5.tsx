'use client'
import React, { useEffect, useState } from 'react';
// 🔑 Import clé
import { useFormContext } from 'react-hook-form'; 
import { useAppDispatch } from "@/hooks/hooks";
// Action Redux pour récupérer les équipements
import { getEquipement } from '@/actions/EquipementsActions';
// ... autres imports Lucide

import { 
    Home, 
    Sofa, 
    Wifi, 
    Settings, 
    Shield, 
    LucideIcon, 
    Car, 
    Check, 
    Sun, 
    Briefcase,
    AlertCircle 
} from 'lucide-react';

// --- Types (Laissé inchangé, mais à titre informatif) ---
interface EquipementCategory {
    id: string;
    name: string; 
    icon_class: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Equipement {
    id: string;
    category_id: string;
    name: string; 
    created_at: string;
    updated_at: string;
    category: EquipementCategory;
}

interface GroupedEquipements {
    [categoryName: string]: {
        icon: LucideIcon;
        items: Equipement[];
    };
}

// ... Table de Correspondance Icône Lucide et groupEquipementsByCategory (Laissés inchangés) ...
const CategoryIconMap: { [key: string]: LucideIcon } = {
    'Intérieur': Home,         
    'Extérieur': Sun,          
    'Confort': Sofa,           
    'Services': Car,           
    'Connectivité': Wifi,      
    'Sécurité': Shield,        
};

const groupEquipementsByCategory = (equipments: Equipement[]): GroupedEquipements => {
    const grouped: GroupedEquipements = {};
    const categoryNames = new Set<string>();

    equipments.forEach(item => {
        const categoryName = item.category.name;
        categoryNames.add(categoryName);
        
        const IconComponent = CategoryIconMap[categoryName] || AlertCircle; 

        if (!grouped[categoryName]) {
            grouped[categoryName] = {
                icon: IconComponent,
                items: []
            };
        }
        grouped[categoryName].items.push(item);
    });
    
    return grouped;
};


// --- Composant Principal Step5 ---
const Step5 = () => {
    const dispatch = useAppDispatch();
    
    // 🔑 Accès au contexte du formulaire RHF
    const { watch, setValue, formState: { errors } } = useFormContext();

    // États locaux
    const [groupedEquipements, setGroupedEquipements] = useState<GroupedEquipements>({});
    const [isLoading, setIsLoading] = useState(true);

    // 🔑 Récupérer la valeur actuelle du champ 'equipements' depuis le formulaire RHF
    // Si le champ n'existe pas ou est null, on utilise un tableau vide.
    const selectedEquipments: string[] = watch('equipements') || [];


    // --- Logique de Récupération et Structuration des Données (Laissée inchangée) ---
    useEffect(() => {
        const fetchEquipments = async () => {
            setIsLoading(true);
            try {
                const resultAction = await dispatch(getEquipement());
                const rawEquipments = resultAction.payload as Equipement[]; 

                if (rawEquipments && Array.isArray(rawEquipments)) {
                    const grouped = groupEquipementsByCategory(rawEquipments);
                    setGroupedEquipements(grouped);
                } else {
                    console.error("Le format de données récupéré pour les équipements est incorrect.");
                }

            } catch (error) {
                console.error("Erreur lors de la récupération des équipements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEquipments();
    }, [dispatch]);

    // --- Logique de Gestion de la Sélection Multiple (Mise à jour du formulaire RHF) ---
    const handleToggleEquipement = (equipementId: string) => {
        // La nouvelle liste de sélection (basée sur la valeur actuelle du formulaire)
        let newSelected: string[];

        if (selectedEquipments.includes(equipementId)) {
            // Désélectionner: filtrer l'ID
            newSelected = selectedEquipments.filter(id => id !== equipementId);
        } else {
            // Sélectionner: ajouter l'ID
            newSelected = [...selectedEquipments, equipementId];
        }

        // 🔑 Mettre à jour le champ 'equipements' dans le formulaire global RHF
        setValue('equipements', newSelected, { 
            shouldValidate: true, 
            shouldDirty: true 
        });
    };
    
    // --- Composant pour une seule checkbox personnalisée (Légèrement adapté) ---
    const EquipementCheckbox = ({ equipement }: { equipement: Equipement }) => {
        // L'état est lu directement depuis la variable 'selectedEquipments' (qui vient de watch())
        const isSelected = selectedEquipments.includes(equipement.id);

        return (
            // Utilisation d'un fragment de code de FormField pour la gestion d'erreur, 
            // bien que le composant de base soit suffisant car le FormMessage sera global
            <label 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => handleToggleEquipement(equipement.id)}
            >
                {/* Checkbox personnalisée */}
                <div className={`w-5 h-5 flex items-center justify-center border-2 rounded transition-colors duration-150 ease-in-out ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                    {/* Icône de Lucide Check si sélectionné */}
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                {/* Checkbox native cachée pour l'accessibilité si nécessaire */}
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly // Rendu en lecture seule car le clic sur le label gère l'état via handleToggleEquipement
                    className="sr-only" 
                />
                <span className="text-gray-700 text-base">{equipement.name}</span>
            </label>
        );
    };

    // --- Rendu des Catégories dans 3 Colonnes (Laissé inchangé) ---
    if (isLoading) {
        return <div className="p-8 text-center text-blue-500">Chargement des équipements...</div>;
    }

    const categoryKeys = Object.keys(groupedEquipements);
    const numCategories = categoryKeys.length;
    const itemsPerCol = Math.ceil(numCategories / 3);
    
    const col1Keys = categoryKeys.slice(0, itemsPerCol);
    const col2Keys = categoryKeys.slice(itemsPerCol, itemsPerCol * 2);
    const col3Keys = categoryKeys.slice(itemsPerCol * 2);

    const renderColumn = (keys: string[]) => (
        <div className="space-y-8">
            {keys.map(categoryName => {
                const cat = groupedEquipements[categoryName];
                if (!cat) return null;

                return (
                    <div key={categoryName}>
                        <h3 className="flex items-center text-lg font-bold text-gray-700 mb-4">
                            <cat.icon className="w-5 h-5 mr-3 text-blue-600" />
                            {categoryName}
                        </h3>
                        <div className="space-y-3">
                            {cat.items.map(equip => (
                                <EquipementCheckbox key={equip.id} equipement={equip} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="p-8 ">
            
            <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">
                SÉLECTIONNEZ LES ÉQUIPEMENTS DISPONIBLES :
            </h2>

            {/* --- Grille des Catégories (3 Colonnes) --- */}
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {renderColumn(col1Keys)}
                {renderColumn(col2Keys)}
                {renderColumn(col3Keys)}
            </div>
            
            {/* 🔑 Affichage de l'erreur Zod pour le champ 'equipements' */}
            {errors.equipements && (
                 <p className="text-red-500 text-sm mt-4 font-medium text-center">
                    {errors.equipements.message}
                </p>
            )}
         
        </div>
    );
}

export default Step5;