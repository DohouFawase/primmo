import PropertyCard from '@/components/shared/PropertyCard'
import { LocationnPropertyCard } from '@/mock/allData'
import Link from 'next/link'
import React from 'react'

export default function LocationSection() {
  return (
    <div>
      <div className="space-y-4 md:space-y-8 lg:space-y-14 max-w-7xl mx-auto">
        <h1 className=' text-base md:text-2xl font-semibold text-center'>Biens populaires en location</h1>
        <div className='grid grid-cols-1 px-8 md:px-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {LocationnPropertyCard.map((item) => (
            <PropertyCard key={item.id} {...item} typePage="location_property" />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Link href={"/location_property"} className='bg-[#007BFF] rounded-full px-4 py-2.5 text-white'>
            Voir tous les biens en location
          </Link>
        </div>
      </div>
    </div>
  )
}
