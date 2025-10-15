'use client'
import React, { useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';
export default function FiltreComponents() {
    const [typeDeBien, setTypeDeBien] = useState('À Louer');
    const [ville, setVille] = useState('');

    const handleSearch = () => {
        console.log("Recherche lancée avec:", { typeDeBien, ville });
        // Ici, vous ajouteriez la logique de recherche réelle
    };

    return (
        <div className="flex justify-center items-center py-3.5 px-4 max-w-7xl mx-auto ">
            {/* Conteneur principal de la barre de recherche */}
            <div className="
          flex items-center
          bg-white
          rounded-full
          
          p-2 sm:p-3
          border border-gray-100
        ">


                {/* Partie 1 : Menu déroulant 'Que recherchez-vous ?' */}
                <div className="
            flex items-center
            px-4
            cursor-pointer
            text-gray-600 font-medium
            py-2
          
            sm:border-r border-gray-200
          ">
                    <span className="truncate">Que recherchez-vous ?</span>
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                </div>

                {/* Partie 2 : Boutons radio (À Louer / À Vendre) */}
                <div className="
            flex
            items-center
            py-1 sm:py-0
            px-4
            sm:border-r border-gray-200
           
            justify-center
          ">

                    {/* Radio À Louer */}
                    <button
                        onClick={() => setTypeDeBien('À Louer')}
                        className={`
                flex items-center mr-6 p-2 rounded-full transition-all duration-200
                ${typeDeBien === 'À Louer' ? 'bg-blue-100/50' : 'hover:bg-gray-100'}
              `}
                    >
                        <span className={`
                w-4 h-4 rounded-full border-2 mr-2
                ${typeDeBien === 'À Louer' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}
              `}></span>
                        <span className="font-semibold text-gray-700 whitespace-nowrap">À Louer</span>
                    </button>

                    {/* Radio À Vendre */}
                    <button
                        onClick={() => setTypeDeBien('À Vendre')}
                        className={`
                flex items-center p-2 rounded-full transition-all duration-200
                ${typeDeBien === 'À Vendre' ? 'bg-blue-100/50' : 'hover:bg-gray-100'}
              `}
                    >
                        <span className={`
                w-4 h-4 rounded-full border-2 mr-2
                ${typeDeBien === 'À Vendre' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}
              `}></span>
                        <span className="font-semibold text-gray-700 whitespace-nowrap">À Vendre</span>
                    </button>
                </div>

                {/* Partie 3 : Champ de saisie de la ville */}
                <div className="
            flex items-center
            flex-grow
            px-4
            py-2
            sm:border-r border-gray-200
           
          ">
                                       <img src="/maps.png" alt="maps" className='w-4 h-6 mr-2' />

                    <input
                        type="text"
                        placeholder="Tapez la ville"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        className="
                w-full
                text-gray-700
                placeholder-gray-400
                focus:outline-none
                bg-transparent
              "
                    />
                </div>

                {/* Partie 4 : Bouton de recherche */}
                <button
                    onClick={handleSearch}
                    className="
              flex items-center justify-center text-center
              bg-blue-600 hover:bg-blue-700
              text-white
              font-bold
              rounded-full
              md:px-6 md:py-2.5 pt-3
              
             
             
              w-full sm:w-auto 
            "
                >
                    {/* Sur petit écran, on pourrait n'afficher que l'icône, mais ici on garde le texte pour la clarté */}
                    <Search className="h-5 w-5 sm:mr-2" />
                    <span className="hidden lg:flex">Rechercher</span>
                </button>

            </div>
        </div>
    );
}
