import * as z from "zod";

// --- Helpers Zod ---

// 1. Schéma pour un élément de photo/média
const photoItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    size: z.number(), 
    isPrincipal: z.boolean(),
});

// 2. Fonction de prétraitement pour les champs numériques (gestion du vide -> undefined)
const numericPreprocess = (val: any) => (val === "" ? undefined : Number(val));

// --- Schéma Principal du Formulaire ---
export const globalAnnonceSchema = z.object({
    // ------------------------------------
    // ÉTAPE 1: Informations de base
    // ------------------------------------
    typeBien: z.enum(["Appartement", "Maison", "Terrain", "Boutique"], {
        required_error: "Le type de bien est requis.",
    }),
    typeAnnonce: z.enum(["Vente", "Location"], {
        required_error: "Le type d'annonce est requis.",
    }),
    titre: z.string().min(5, "Le titre doit comporter au moins 5 caractères."),

    // ------------------------------------
    // ÉTAPE 2: Localisation
    // ------------------------------------
    address: z.string().min(5, "L'adresse est requise."), // Champ obligatoire
    locationDescription: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    street: z.string().optional(),
    
    // Coordonnées GPS (Optionnelles, mais doivent être des nombres si remplies)
    longitude: z.preprocess(
        numericPreprocess,
        z.number({ invalid_type_error: "Doit être un nombre valide (coordonnée)." })
          .optional()
    ),
    latitude: z.preprocess(
        numericPreprocess,
        z.number({ invalid_type_error: "Doit être un nombre valide (coordonnée)." })
          .optional()
    ),

    // ------------------------------------
    // ÉTAPE 3: Caractéristiques
    // ------------------------------------
    superficie: z.preprocess(
        numericPreprocess, 
        z.number({ invalid_type_error: "Doit être un nombre valide." })
          .positive("Doit être un nombre positif.")
          .min(1, "La superficie est requise.")
    ),
    unite: z.enum(["m²", "ha"], {
        required_error: "L'unité est requise.",
    }),
    nombreUnites: z.preprocess(
        numericPreprocess, 
        z.number({ invalid_type_error: "Doit être un nombre entier." })
          .int("Doit être un nombre entier.")
          .min(1, "Le nombre d'unités est requis.")
    ),
    typeConstruction: z.enum(["En construction", "A démolir", "Libre"], {
        required_error: "Le type de construction est requis.",
    }),
    description: z.string().min(10, {
        message: "Une description plus détaillée est requise (min 10 caractères).",
    }),
    electricite: z.array(z.string()).refine((value) => value.length >= 1, {
        message: "Veuillez sélectionner au moins une option d'électricité.",
    }),

    // ------------------------------------
    // ÉTAPE 4: Tarification
    // ------------------------------------
    montantLoyer: z.preprocess(
        numericPreprocess, 
        z.number({ invalid_type_error: "Doit être un nombre." })
          .positive("Doit être un montant positif.")
          .min(1, "Le montant du loyer est requis.")
    ),
    deviseLoyer: z.enum(["EUR", "USD", "XOF"], {
        required_error: "La devise est requise.",
    }),
    periodicite: z.enum(["MOIS", "SEMAINE", "AN"], {
        required_error: "La périodicité est requise.",
    }),
    
    commissionLocation: z.preprocess(
        numericPreprocess,
        z.number({ invalid_type_error: "Doit être un nombre." })
          .min(0, "La commission doit être positive ou nulle.")
          .optional()
    ),
    deviseCommission: z.enum(["EUR", "USD", "XOF"]).optional(), 
    
    cautionDemandee: z.preprocess(
        numericPreprocess,
        z.number({ invalid_type_error: "Doit être un nombre." })
          .min(0, "La caution doit être positive ou nulle.")
          .optional()
    ),

    // ------------------------------------
    // ÉTAPE 5: Équipements
    // ------------------------------------
    equipements: z.array(z.string()).refine((value) => value.length >= 1, {
        message: "Veuillez sélectionner au moins un équipement.",
    }),
    
    // ------------------------------------
    // ÉTAPE 6: Médias
    // ------------------------------------
    photos: z.array(photoItemSchema).min(1, { 
        message: "Veuillez ajouter au moins une photo du bien."
    }),
    youtubeLink: z.string().url({ message: "URL YouTube non valide." }).or(z.literal("")).optional(),
});

// Le type global pour les données du formulaire
export type GlobalAnnonceFormData = z.infer<typeof globalAnnonceSchema>;