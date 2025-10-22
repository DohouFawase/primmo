// All Announce Types
import { AnnounceformSchema } from "@/schema/AnnouncesFormSchema";
import { z } from "zod";

// ⚠️ Assurez-vous d'importer le schéma Zod de votre annonce ici
// Par exemple, si votre schéma est dans 'src/schema/AnnounceFormSchema.ts'
// import { formSchema } from "@/schema/AnnounceFormSchema"; 

// --- TYPES D'ANNONCE ---

/**
 * @typedef {z.infer<typeof formSchema>} AnnounceFormInputs
 * @description Type inféré pour le formulaire de création/édition d'annonce basé sur le schéma Zod.
 */
export type AnnounceFormInputs = z.infer<typeof AnnounceformSchema>;

/**
 * @typedef {object} AnnounceFormInputs
 * @property {string} property_type_id - L'ID (UUID) du type de bien.
 * @property {'for_rent' | 'for_sale'} ad_type - Le type d'annonce (location ou vente).
 * @property {string} seo_description - La courte description pour le SEO.
 * @property {string} description - La description complète du bien (min 50 caractères).
 * @property {string} full_address - L'adresse complète du bien.
 * @property {string} country - Le pays.
 * @property {string} city - La ville.
 * @property {string | undefined} department - Le département (Optionnel).
 * @property {string | undefined} district - Le quartier (Optionnel).
 * @property {string | undefined} street - La rue (Optionnel).
 * @property {string | undefined} longitude - La longitude (Optionnel).
 * @property {string | undefined} latitude - La latitude (Optionnel).
 * @property {string | undefined} additional_info - Informations additionnelles sur la localisation (Optionnel).
 * @property {number | undefined} area_value - La valeur de la superficie (Optionnel).
 * @property {'sqm' | 'ha' | undefined} area_unit - L'unité de la superficie (Optionnel).
 * @property {number | undefined} unit_count - Le nombre d'unités/chambres (Optionnel).
 * @property {string | undefined} construction_type - Le type de construction (Optionnel).
 * @property {string | undefined} electricity_type - Le type d'électricité (Optionnel).
 * @property {string | undefined} legal_status - Le statut légal (Optionnel).
 * @property {string | undefined} accessibility - L'accessibilité (Optionnel).
 * @property {string | undefined} usage_type - Le type d'usage (Optionnel).
 * @property {string[]} equipments - Le tableau des UUIDs des équipements sélectionnés.
 * @property {number} price - Le prix du bien.
 * @property {string} currency - La devise utilisée.
 * @property {number | undefined} commission - La commission (pour la location, Optionnel/Conditionnel).
 * @property {number | undefined} deposit_months - Le nombre de mois de caution (pour la location, Optionnel/Conditionnel).
 * @property {'day' | 'night' | 'week' | 'month' | undefined} periodicity - La périodicité (pour la location, Optionnel/Conditionnel).
 * @property {boolean | undefined} is_negotiable - Si le prix est négociable (pour la vente, Optionnel/Conditionnel).
 * @property {string | undefined} photos_json - Le JSON stringifié des photos (Optionnel).
 * @property {string | undefined} main_photo_filename - Le nom du fichier de la photo principale (Optionnel).
 * @property {string | undefined} video_url - L'URL de la vidéo (Optionnel).
 * @property {object} certifications - Les statuts de certification.
 * @property {boolean} certifications.authorized
 * @property {boolean} certifications.accurate
 * @property {boolean} certifications.photosMatch
 * @property {boolean} certifications.acceptPolicy
 */
export type AnnounceType = AnnounceFormInputs;


// --- TYPES DE SOUS-PARTIES (si besoin) ---

/**
 * @typedef {AnnounceFormInputs['certifications']} AnnounceCertificationsInputs
 * @description Type pour le sous-objet des certifications du formulaire d'annonce.
 */
export type AnnounceCertificationsInputs = AnnounceFormInputs['certifications'];

/**
 * @typedef {AnnounceFormInputs['equipments']} AnnounceEquipmentsInputs
 * @description Type pour le tableau des équipements (UUIDs) du formulaire d'annonce.
 */
export type AnnounceEquipmentsInputs = AnnounceFormInputs['equipments'];