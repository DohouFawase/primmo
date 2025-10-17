export type Author = {
    name: string;
    verified: boolean;
    avatar: string;
};

export type PropertyCardProps = {
    id: string | number;
    status: string;
    verified: boolean;
    title: string;
    desc: string;
    rating: number;
    author: Author;
    price: number;
    isFavorite: boolean;
    typePage?: 'location_property' | 'selling_property';
};


export type StatLine = {
  label: string;
  value: string | number;
  highlight?: boolean; 
}



export type StatCardData = {
  id: string;
  title: string;
  lines: StatLine[];
  button?: {
    label: string;
    onClick?: () => void;
    href?: string; 
  };
};


export type AnnonceStatut = 'En attente' | 'Approuvée' | 'Rejetée' | 'Archivée';



export interface AnnonceCardProps {
  id: string;
  titre: string;
  description: string;
  typeContrat: 'A Louer' | 'A Vendre';
  statut: AnnonceStatut;
  imageURL?: string; 
  estActive: boolean; 
  
  onApercuClick?: () => void;
  onEditerClick?: () => void;
  onToggleActive?: (nouvelEtat: boolean) => void;
  onToggleHeart?: (estMaintenantAimer: boolean) => void;
}