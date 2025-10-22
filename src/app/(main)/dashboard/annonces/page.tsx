'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AnnonceCard from "./_components/AnnouceCard";
import { AnnonceDataMock } from "@/mock/allData";
import FiltreComponents from "@/components/shared/FiltreComponents";
import PropertyListingForm from "./_components/CreateAnounce";

export default function page() {
    return (
        <>
            <div className="container  px-4 mx-auto   space-y-12  ">
                <FiltreComponents />
                <div className="flex md:flex-row flex-col px-8 md:px-18 justify-between md:items-center mt-24">
                    <div className="flex items-center  gap-8 md:space-x-24  ">
                        <h1 className=" text-base md:text-2xl font-semibold  ">
                            Mes annonces{" "}
                        </h1>
                        <div className="">
                            <Button className="rounded-full px-4 bg-[#007BFF] ">
                                <span>Nouvelle annonce</span>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center md:mr-21 gap-8">
                        <div className="flex items-center gap-3">
                            <span>Type:</span>
                            <div className="bg-[#EBEBEB] p-2 px-8 rounded-sm">
                                <select name="" id="" className="text-sm font-semibold">
                                    <option value="" >A louer</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>Date:</span>
                            <div className="bg-[#EBEBEB] p-2 px-8 rounded-sm">
                                <select name="" id="" className="text-sm font-semibold">
                                    <option value=""  >Plus récentes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


<PropertyListingForm />

                <div className="px-8 md:px-16 space-y-4 mt-12">
                    {AnnonceDataMock.map((annonce) => (
                        <AnnonceCard
                            key={annonce.id}
                            id={annonce.id}
                            titre={annonce.titre}
                            description={annonce.description}
                            typeContrat={annonce.typeContrat as "A Louer" | "A Vendre"}
                            statut={
                                annonce.statut as
                                | "En attente"
                                | "Approuvée"
                                | "Rejetée"
                                | "Archivée"
                            }
                            imageURL={annonce.imageURL}
                            estActive={annonce.estActive}
                            onApercuClick={() =>
                                console.log(`Aperçu de l'annonce ${annonce.id}`)
                            }
                            onEditerClick={() =>
                                console.log(`Édition de l'annonce ${annonce.id}`)
                            }
                            onToggleActive={(etat) =>
                                console.log(
                                    `Annonce ${annonce.id} mise à ${etat ? "Actif" : "Inactif"}`
                                )
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
