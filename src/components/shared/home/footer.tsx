'use client'
import { FootdatMockData } from '@/mock/allData'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
export default function Footer() {
    const [curentYears, setcurentYears] = useState<number>(new Date().getFullYear())
    useEffect(() => {
        const year = new Date().getFullYear();
        setcurentYears(year);
    }, []);
    return (
        <div className='bg-black text-white px-8 md:px-16 py-12 mt-8'>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center items-center mb-4  ">
                    <img src="/LOGO.png" alt="" className='' />

                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t  py-14 border-b">

                    {/* PRIMMIO */}
                    <div>
                        <h3 className="font-bold mb-4">PRIMMIO</h3>
                        <ul>
                            {FootdatMockData.primmmio.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="hover:underline">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CATEGORIES */}
                    <div>
                        <h3 className="font-bold mb-4">CATÉGORIES</h3>
                        <ul>
                            {FootdatMockData.categories.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="hover:underline">
                                        {item.label} ({item.count} annonces)
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="font-bold mb-4">SUPPORT</h3>
                        <ul>
                            {FootdatMockData.support.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="hover:underline">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* STATISTIQUES */}
                    <div className='space-y-24'>
                        <div className="">
                            <h3 className="font-bold mb-4">STATISTIQUES</h3>
                            <ul>
                                {FootdatMockData.statistics.map((stat, idx) => (
                                    <li key={idx}>{stat.label}</li>
                                ))}
                            </ul>
                        </div>

                        {/* SOCIAL */}
                        <div>
                            <h3 className="font-bold mb-4">RÉSEAUX SOCIAUX</h3>
                            <div className="flex gap-4">
                                {FootdatMockData.socials.map((social, idx) => (
                                    <Link key={idx} href={social.href} target="_blank">
                                        <i className={`icon-${social.icon} text-2xl`} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>



                </div>

                <div className="text-center mt-10 text-gray-400 text-sm">
                    Copyright © {curentYears} PRIMMIO —
                    Plateforme de Recherche Immobilière et de Mise en relation pour un Marché Inclusif et Organisé
                </div>
            </div>

            {/* COPYRIGHT */}
        </div>
    )
}
