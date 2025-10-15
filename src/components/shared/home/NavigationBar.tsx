import Link from 'next/link'
import React from 'react'
import { Bell, Menu, CircleUserRound } from 'lucide-react';

export default function NavigationBar() {
    return (
        <div className='px-8 md:px-16 py-9 max-w-7xl mx-auto'>
            <div className="bg-[#EBEBEB] rounded-xl px-8 py-4 flex items-center justify-between ">
                <img src="/LOGO.png" alt="primmo_logo.png" />

                <div className=" flex items-center gap-9">
                    <Menu className='block lg:hidden' />
                    <div className="hidden lg:flex space-x-4">
                        <Link href={""} className='bg-white rounded-full font-medium px-6 py-2.5 hover:shadow-sm'>Bien en Location</Link>
                        <Link href={""} className='bg-white rounded-full font-medium px-6 py-2.5 hover:shadow-sm'>Bien en Vente</Link>
                        <Link href={""} className='bg-[#007BFF] rounded-full font-medium px-6 py-2.5 text-white hover:shadow-sm'>Publier une annoce</Link>
                    </div>
                    <div className="hidden sm:flex md:flex lg:flex-row items-center gap-6">
                        <select name="" id="">
                            <option value="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
                                    <rect width="8" height="16" fill="#0055A4" />
                                    <rect x="8" width="8" height="16" fill="#FFFFFF" />
                                    <rect x="16" width="8" height="16" fill="#EF4135" />
                                </svg>

                            </option>
                        </select>
                        <div className="relative">
                            <button>
                                <Bell />
                            </button>
                        </div>
                        <div className="">
 
                            <Link href={""} className='bg-[#007BFF] rounded-full font-medium px-6 py-2.5 text-white flex items-center gap-2'>
                                <CircleUserRound />
                                <span>
                            Connexion

                                </span>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
