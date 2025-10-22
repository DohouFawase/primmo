'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronRight, ChevronLeft, MapPin, Home, Building2, Store, Hotel, Bed, Mountain, Upload, X, Youtube, Send } from 'lucide-react';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Schéma de validation Zod
const formSchema = z.object({
  propertyType: z.string().min(1, "Sélectionnez un type de bien"),
  announcementType: z.string().default("rent"),
  locationType: z.string().default("recent"),
  address: z.string().min(5, "L'adresse est requise"),
  locationDescription: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
  amenities: z.object({
    furnished: z.boolean().default(false),
    equippedKitchen: z.boolean().default(false),
    refrigerator: z.boolean().default(false),
    washingMachine: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
    fan: z.boolean().default(false),
    heating: z.boolean().default(false),
    wifi: z.boolean().default(false),
    highSpeedInternet: z.boolean().default(false),
    television: z.boolean().default(false),
    landline: z.boolean().default(false),
    balcony: z.boolean().default(false),
    terrace: z.boolean().default(false),
    garden: z.boolean().default(false),
    pool: z.boolean().default(false),
    privateParking: z.boolean().default(false),
    garage: z.boolean().default(false),
    parkingSpace: z.boolean().default(false),
    security: z.boolean().default(false),
    alarmSystem: z.boolean().default(false),
    securityCameras: z.boolean().default(false),
  }),
  photos: z.array(z.any()).optional(),
  youtubeLink: z.string().optional(),
  certifications: z.object({
    authorized: z.boolean().default(false),
    accurate: z.boolean().default(false),
    photosMatch: z.boolean().default(false),
    acceptPolicy: z.boolean().default(false),
  }),
});

const propertyTypes = [
  { id: 'apartment', label: 'Appartement', icon: Building2 },
  { id: 'studio', label: 'Studio', icon: Home },
  { id: 'house', label: 'Maison', icon: Home },
  { id: 'hostel', label: 'Auberge', icon: Hotel },
  { id: 'shop', label: 'Boutique', icon: Store },
  { id: 'villa', label: 'Villa', icon: Home },
  { id: 'office', label: 'Bureau', icon: Building2 },
  { id: 'hotel', label: 'Hôtel', icon: Hotel },
  { id: 'land', label: 'Terrain', icon: Mountain },
  { id: 'room', label: 'Chambre', icon: Bed },
];

const steps = [
  { id: 0, label: 'Type de bien' },
  { id: 1, label: 'Localisation' },
  { id: 2, label: 'Caractéristiques' },
  { id: 3, label: 'Tarification' },
  { id: 4, label: 'Équipements' },
  { id: 5, label: 'Médias' },
  { id: 6, label: 'Publication' },
];

export default function PropertyListingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: '',
      announcementType: 'rent',
      locationType: 'recent',
      address: '',
      locationDescription: '',
      amenities: {},
      certifications: {},
    },
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert('Annonce publiée avec succès!');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          NOUVELLE ANNONCE
        </h1>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    index === currentStep ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    style={{ transform: 'translateY(-50%)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 0: Type de bien */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="announcementType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'annonce :</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rent">A louer</SelectItem>
                            <SelectItem value="sale">A vendre</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="locationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de location* :</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="recent">Plus récentes</SelectItem>
                            <SelectItem value="old">Plus anciennes</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Type de bien * :</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                        >
                          {propertyTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <label
                                key={type.id}
                                className={`relative flex items-center gap-3 p-4 border-2 cursor-pointer transition-all ${
                                  field.value === type.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <RadioGroupItem value={type.id} className="sr-only" />
                                <Icon className="w-6 h-6" />
                                <span className="font-medium">{type.label}</span>
                              </label>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 1: Localisation */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse du bien *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Où se trouve votre bien ?"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Indication sur l'emplacement (Facultatif)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez l'emplacement du bien."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quartier</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rue</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">COORDONNÉES GPS</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude :</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude:</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-red-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Équipements */}
            {currentStep === 4 && (
             <div className="">
                <h2 className="text-xl font-bold text-center mb-6">
                  SÉLECTIONNEZ LES ÉQUIPEMENTS DISPONIBLES :
                </h2>
                 <div className="space-y-8 w-full grid-cols-4 grid">

                <AmenitySection
                  title="Intérieur"
                  icon="home"
                  fields={[
                    { name: 'amenities.furnished', label: 'Meublé' },
                    { name: 'amenities.equippedKitchen', label: 'Cuisine équipée' },
                    { name: 'amenities.refrigerator', label: 'Réfrigérateur' },
                    { name: 'amenities.washingMachine', label: 'Lave-linge' },
                  ]}
                  form={form}
                />

                <AmenitySection
                  title="Confort"
                  icon="sofa"
                  fields={[
                    { name: 'amenities.airConditioning', label: 'Climatisation' },
                    { name: 'amenities.fan', label: 'Ventilateur' },
                    { name: 'amenities.heating', label: 'Chauffage' },
                  ]}
                  form={form}
                />

                <AmenitySection
                  title="Connectivité"
                  icon="wifi"
                  fields={[
                    { name: 'amenities.wifi', label: 'Wi-Fi' },
                    { name: 'amenities.highSpeedInternet', label: 'Internet haut débit' },
                    { name: 'amenities.television', label: 'Télévision' },
                    { name: 'amenities.landline', label: 'Téléphone fixe' },
                  ]}
                  form={form}
                />

                <AmenitySection
                  title="Extérieur"
                  icon="tree"
                  fields={[
                    { name: 'amenities.balcony', label: 'Balcon' },
                    { name: 'amenities.terrace', label: 'Terrasse' },
                    { name: 'amenities.garden', label: 'Jardin' },
                    { name: 'amenities.pool', label: 'Piscine' },
                  ]}
                  form={form}
                />

                <AmenitySection
                  title="Services"
                  icon="car"
                  fields={[
                    { name: 'amenities.privateParking', label: 'Parking privé' },
                    { name: 'amenities.garage', label: 'Garage' },
                    { name: 'amenities.parkingSpace', label: 'Place de parking' },
                  ]}
                  form={form}
                />

                <AmenitySection
                  title="Sécurité"
                  icon="shield"
                  fields={[
                    { name: 'amenities.security', label: 'Gardien' },
                    { name: 'amenities.alarmSystem', label: "Système d'alarme" },
                    { name: 'amenities.securityCameras', label: 'Caméras de sécurité' },
                  ]}
                  form={form}
                />
              </div>
             </div>
            )}

            {/* Step 5: Médias */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">PHOTOS DU BIEN *</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">Glisser-déposer ici pour importer une photo</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Formats : JPEG, PNG, WebP, 20 Mo maximum, maximum : 20 photos
                    </p>
                    <p className="mb-4">Ou</p>
                    <label className="inline-block">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" asChild>
                        <span>Importer</span>
                      </Button>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                        >
                          <span className="text-sm">{file.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} Mo
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="youtubeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien vidéo YouTube (Facultatif)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Youtube className="absolute left-3 top-3 w-5 h-5 text-red-500" />
                          <Input
                            placeholder="https://youtube.com/watch?..."
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 6: Publication */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">A Vendre</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Appartement à vendre</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                        </p>
                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Adresse :</strong> Adresse Lorem ipsum, Rue : 123, Avenue 12 Lorem
                          </p>
                          <p>
                            <strong>Electricité :</strong> Compteur Personnel
                          </p>
                          <p>
                            <strong>Prix :</strong> 5000 Euro
                          </p>
                          <p>
                            <strong>Superficie :</strong> 10 000 m²
                          </p>
                          <p>
                            <strong>Équipement :</strong> Meublé, cuisine, WIFI, Téléphone Fixe
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="font-semibold">Appartement</span>
                      <span className="text-yellow-500">★ 5.0</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Vorem ipsum dolor sit amet, consectetur onor adipiscing elit.
                    </p>
                  </CardContent>
                </Card>

                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <h3 className="text-center font-semibold mb-6">Je certifie que :</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="certifications.authorized"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 text-white cursor-pointer">
                            Je suis autorisé à commercialiser ce bien
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="certifications.accurate"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 text-white cursor-pointer">
                            Les informations fournies sont exactes
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="certifications.photosMatch"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 text-white cursor-pointer">
                            Les photos correspondent bien au bien proposé
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="certifications.acceptPolicy"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 text-white cursor-pointer">
                            J'accepte la politique de publication d'annonces
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-5 h-5 mr-2" />
                    Publier l'annonce
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 flex-shrink-0">💡</div>
                  <p className="text-sm text-gray-700">
                    Une fois soumise, votre annonce apparaîtra dans votre liste avec le statut "En
                    attente de validation". Notre équipe la vérifiera sous 24-48h.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Précédent
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Suivant
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

function AmenitySection({ title, icon, fields, form }) {
  return (
    <div >

    <div className="">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
        {icon === 'home' && <Home className="w-5 h-5" />}
        {title}
      </h3>
      <div className="">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex  space-y-2 items-center gap-4">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                    className='p-1.5 rounded-xs '
                  />
                </FormControl>
                <FormLabel className="!mt-0 cursor-pointer">{field.label}</FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
    </div>
  );
}