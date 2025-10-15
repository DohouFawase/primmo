import { PropertyCardProps } from '@/types/CardTypes'
import { Heart, Star } from 'lucide-react'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
function PropertyCard({ id, status, verified, title, rating, author, isFavorite, price, desc, typePage }: PropertyCardProps) {
  return (
    <div>
      <div className=" overflow-hidden ">
        {/* Image Placeholder */}
        <Link href={`/${id}?type=${typePage}`}>
          <div className="relative bg-gray-200 h-64 rounded-2xl flex items-start justify-between p-2">
            <Badge className="bg-white text-black  ">
              {status}

            </Badge>
            {verified && (
              <Badge className="bg-blue-500 text-white text-xs ">
                Vérifié
              </Badge>
            )}
            <button className="absolute bottom-2 right-2 p-1.5 bg-black rounded-full shadow">
              <Heart
                className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className=" text-black font-semibold text-xl mb-2 line-clamp-2">{title}</p>

            <div className="flex items-center text-sm text-gray-700 mb-2">
              <span>{rating.toFixed(1)}</span>
              <Star className="h-4 w-4 ml-1 text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{desc}</p>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={author.avatar}
                // alt={author.name}
                className="w-6 h-6 rounded-full border"
              />
              <span className="text-sm font-medium">{author.name}</span>
              {author.verified && (
                <img src={'/badge.png'} className='h-4 w-4' />
              )}
            </div>
            <span className='font-semibold text-xl'>{price.toFixed(1)} $</span>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
