import { z } from 'zod';

export const AnnounceformSchema = z.object({
  property_type_id: z.string().uuid("L'ID du type de bien n'est pas valide (UUID)"), 
  
  ad_type: z.enum(["for_rent", "for_sale"], {
      required_error: "Sélectionnez un type d'annonce (location ou vente)",
  }).default("for_rent"), 

  seo_description: z.string().min(1, "La description SEO est requise").max(255, "La description SEO est trop longue"),
  
  description: z.string().min(50, "La description doit faire au moins 50 caractères pour être complète"),



  full_address: z.string().min(5, "L'adresse complète est requise (min 5 caractères)"),
  

  country: z.string().min(1, "Le pays est requis"), // Requis
  city: z.string().min(1, "La ville est requise"),    // Requis
  department: z.string().optional(), // Nouveau (nullable)
  district: z.string().optional(), // Ancien/nouveau (nullable)
  street: z.string().optional(),   // Ancien/nouveau (nullable)
  
  longitude: z.string().optional(),
  latitude: z.string().optional(),
  additional_info: z.string().optional(),


  area_value: z.number().optional().nullable(),
  area_unit: z.enum(["sqm", "ha"]).optional().nullable(),
  unit_count: z.number().int().min(1).optional().nullable(),
  construction_type: z.string().optional(),
  electricity_type: z.string().optional(),
  legal_status: z.string().optional(),
  accessibility: z.string().optional(),
  usage_type: z.string().optional(),

  equipments: z.array(z.string().uuid("Chaque équipement doit être un ID valide (UUID)")).min(1, "Sélectionnez au moins un équipement"),
  
  
  // --- Étape 4 : Tarification
  price: z.number().min(0, "Le prix doit être positif"),
  currency: z.string().min(1, "La devise est obligatoire"),

  commission: z.number().min(0, "La commission doit être positive").optional().nullable(),
  deposit_months: z.number().int().min(0, "La caution doit être positive ou nulle").optional().nullable(),
  periodicity: z.enum(["day", "night", "week", "month"]).optional().nullable(),
  is_negotiable: z.boolean().optional(),
  

  photos_json: z.string().optional(), 

  
  main_photo_filename: z.string().optional(),

  video_url: z.string().url("L'URL de la vidéo n'est pas valide").optional().or(z.literal('')), // 'or(z.literal(''))' permet de valider une chaîne vide si le champ est optionnel

 
  certifications: z.object({
    authorized: z.boolean().default(false),
    accurate: z.boolean().default(false),
    photosMatch: z.boolean().default(false),
    acceptPolicy: z.boolean().default(false),
  }),
});