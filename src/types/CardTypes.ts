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