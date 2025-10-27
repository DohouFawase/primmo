'use client'; 
import React from "react";
// 🔑 Import clé pour les étapes enfants
import { useFormContext } from "react-hook-form"; 
import { MapPin, Globe } from "lucide-react"; 
import {
  // Nous aurons toujours besoin de ces composants pour structurer les champs
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage, // 💡 Ajout pour afficher les messages d'erreur
} from "@/components/ui/form"; 
import { Input } from "@/components/ui/input";

// REMARQUE IMPORTANTE : Le schéma Zod et les types sont maintenant définis
// UNIQUEMENT dans le composant parent (CreateAnounce.tsx).

const Step2 = () => {
  // 🔑 1. Accéder au formulaire global du Wizard
  const methods = useFormContext(); 
  const { formState: { errors } } = methods;

  // On n'a plus besoin de la fonction onSubmit locale, car la soumission 
  // est gérée par le composant parent "CreateAnounce" via handleNext/onSubmit.

  return (
    // 2. Supprimer <Form {...form}> et <form>
    // Le composant parent (CreateAnounce) enveloppe déjà tout dans <form>
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Champ 1: Adresse du bien (adresse) */}
        {/* Le nom 'adresse' dans ce composant ne correspond pas à 'address' dans le schéma Zod du parent. */}
        {/* Nous utilisons 'address' pour correspondre au schéma parent. */}
        <FormField
          control={methods.control} // 🔑 Utiliser le contrôle du contexte
          name="address" // 🔑 Changé de 'adresse' à 'address' pour correspondre au schéma Zod global
          render={({ field }) => (
            <FormItem>
              <FormLabel className="y">Adresse du bien *</FormLabel>
              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg p-3 w-full shadow-sm">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Où se trouve votre bien ?"
                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500"
                  />
                </FormControl>
              </div>
              <FormMessage /> {/* 💡 Afficher l'erreur Zod ici */}
            </FormItem>
          )}
        />

        {/* Champ 2: Indication sur l'emplacement (locationDescription) */}
        {/* Le nom 'indication' dans ce composant ne correspond pas à 'locationDescription' dans le schéma Zod du parent. */}
        {/* Nous utilisons 'locationDescription' pour correspondre au schéma parent. */}
        <FormField
          control={methods.control}
          name="locationDescription" // 🔑 Changé de 'indication' à 'locationDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-500 mb-1">
                Indication sur l'emplacement (Facultatif)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Décrivez l'emplacement du bien."
                  className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                />
              </FormControl>
               {/* L'erreur est facultative, FormMessage l'affiche si elle existe */}
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Champ 3: Pays */}
        <FormField
          control={methods.control}
          name="country" // 🔑 Changé de 'pays' à 'country'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="y">Pays</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Pays"
                  className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Champ 4: Ville */}
        <FormField
          control={methods.control}
          name="city" // 🔑 Changé de 'ville' à 'city'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="y">Ville</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Ville"
                  className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ 5: Quartier */}
        <FormField
          control={methods.control}
          name="district" // 🔑 Changé de 'quartier' à 'district'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="y">Quartier</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Quartier"
                  className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Champ 6: Rue */}
        <FormField
          control={methods.control}
          name="street" // 🔑 Changé de 'rue' à 'street'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="y">Rue</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Rue"
                  className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      {/* Reste du contenu (Coordonnées GPS et Carte) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-700 uppercase">
            Coordonnées GPS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Champ 7: Longitude */}
            <FormField
              control={methods.control}
              name="longitude"
              render={({ field }) => (
                <FormItem> {/* Simplification de la structure du FormItem pour l'alignement standard */}
                  <FormLabel className="y">Longitude</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text" // Reste en 'text' pour gérer la chaîne vide, la validation Zod fera la conversion/vérification
                      placeholder="Ex: 2.3522"
                      className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                    />
                  </FormControl>
                  {/* 💡 Afficher l'erreur pour les coordonnées (ex: "Doit être un nombre") */}
                  {errors.longitude && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.longitude.message}
                      </p>
                  )}
                </FormItem>
              )}
            />
            {/* Champ 8: Latitude */}
            <FormField
              control={methods.control}
              name="latitude"
              render={({ field }) => (
                <FormItem> {/* Simplification de la structure du FormItem */}
                  <FormLabel className="y">Latitude</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text" 
                      placeholder="Ex: 48.8566"
                      className="border border-gray-200 bg-gray-50 rounded-lg p-3 outline-none focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-0 text-gray-700"
                    />
                  </FormControl>
                  {errors.latitude && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.latitude.message}
                      </p>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Colonne de droite - Carte (Laissée inchangée) */}
        <div className="bg-gray-100 rounded-lg shadow-inner h-96 relative flex items-center justify-center">
          <div className="absolute">
            <MapPin className="h-10 w-10 text-red-500" fill="currentColor" />
          </div>
          <span className="text-gray-400 absolute bottom-4 right-4 text-sm">
            Espace réservé à la carte
          </span>
        </div>
      </div>
    </div>
  );
};

export default Step2;