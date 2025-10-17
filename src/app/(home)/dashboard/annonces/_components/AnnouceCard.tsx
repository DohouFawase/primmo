
import { AnnonceCardProps, AnnonceStatut } from '@/types/CardTypes';
import React from 'react';

import { Eye, Pencil, Heart } from 'lucide-react'; 

const getStatutStyles = (statut: AnnonceStatut): string => {
  switch (statut) {
    case 'Approuvée':
      return 'bg-green-100 text-green-700'; 
    case 'Rejetée':
      return 'bg-red-100 text-red-700';
    case 'Archivée':
      return 'bg-gray-400 text-white';
    case 'En attente':
    default: 
      return 'bg-blue-50 text-blue-700'; 
  }
};

const AnnonceCard: React.FC<AnnonceCardProps> = ({
  titre,
  description,
  typeContrat,
  statut,
  imageURL,
  estActive,
  onApercuClick,
  onEditerClick,
  onToggleActive,
}) => {
  const [isLiked, setIsLiked] = React.useState(false); 

  const statutClasses = getStatutStyles(statut);

  const handleToggleActive = () => {
    const nouvelEtat = !estActive;
    onToggleActive?.(nouvelEtat);
  };
  
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-[#F5FAFF] p-4 rounded-xl shadow-lg flex  ">
      
      <div className="w-1/4 mr-6 relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {imageURL ? (
          <img 
            src={imageURL} 
            alt={titre} 
            className="w-full h-64 object-cover" 
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
          </div>
        )}
        
        <span className="absolute top-3 left-3 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-md shadow">
          {typeContrat}
        </span>
        
        <button 
          onClick={handleToggleLike} 
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-105 transition"
          aria-label="Ajouter aux favoris"
        >
          <Heart 
            className={`text-xl transition-colors ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-gray-800'
            }`} 
          />
        </button>
      </div>

      <div className="w-3/4 flex justify-between">
        
        <div className="flex flex-col justify-between w-[40rem] ">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{titre}</h2>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed  overflow-hidden">
            {description}
          </p>
          
          <div className={`inline-block px-4 py-1 text-xs text-center font-medium rounded-sm w-40 ${statutClasses}`}>
            <span className='font-semibold text-black'>Statut</span> : {statut}
          </div>
        </div>

        <div className="w-48  p-4 rounded-xl flex flex-col justify-start space-y-3">
          
          <button 
            onClick={onApercuClick}
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <Eye className="mr-2 text-xl" /> 
            <span className="font-medium">Aperçu</span>
          </button>

          <button 
            onClick={onEditerClick}
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <Pencil className="mr-2 text-xl" /> 
            <span className="font-medium">Éditer l`&#39;`annonce</span>
          </button>
          
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200">
            <span className="text-gray-700 font-medium">Activer</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={estActive} 
                onChange={handleToggleActive} 
                className="sr-only peer" 
              />
              <div 
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnnonceCard;