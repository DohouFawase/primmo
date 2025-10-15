import PropertyCard from '@/components/shared/PropertyCard';
import { LocationnPropertyCard } from '@/mock/allData';
import React from 'react';

const AnnounceComponets = () => {
    return (
        <div>
             <div>
            <div>
                <div className="space-y-4 md:space-y-8 lg:space-y-14 max-w-7xl mx-auto">
                   <h1 className=' text-base md:text-2xl font-semibold px-18'>Mes annonces </h1>

                    <div className='grid grid-cols-1 px-8 md:px-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {LocationnPropertyCard.map((item) => (
                            <PropertyCard key={item.id} {...item} typePage="location_property" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AnnounceComponets;
