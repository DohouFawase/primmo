import { Badge } from "@/components/ui/badge";

export default function ProfileComponents() {
    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-8 md:px-18">
                <div className="flex md:flex-row flex-shrink-0 flex-col  gap-8">
                    <div className="md:w-1/3 py-8 bg-[#007BFF]  rounded-2xl flex flex-col justify-center space-y-4 items-center ">
                    <div className=" ">
                            <img src="/user.png" alt="" className="w-24 h-24 " />

                    </div>

                        <div className="space-y-1.5">
                            <p className="text-lg font-semibold text-white">Nom Lorem ipsum</p>
                            <div className="flex items-center gap-2">
                                <img src="/verified-rounded.png" alt="" className="w-3 h-3" />
                                <span className="text-base text-white">Profil vérifié</span>
                            </div>
                        </div>
                        <Badge className="text-black bg-white rounded-sm ">Madembre depuis Janvier 2025</Badge>
                    </div>
                    <div className="md:w-2/3 ...">
                        <div className="space-y-8">
                            <Badge className="w-full rounded-sm bg-[#EBEBEBB8] py-2 text-black text-xl font-semibold">Description du profil</Badge>
                            <p>
                                Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                                vulputate libero et velit interdum, ac aliquet odio mattis.
                                Class aptent taciti sociosqu ad litora torquent per conubia
                                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                                condimentum lobortis. Ut commodo efficitur neque. Ut diam quam,
                                semper iaculis condimentum ac, vestibulum eu nisl. Class aptent
                                taciti sociosqu ad litora torquent per conubia nostra, per
                                inceptos himenaeos. Sorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit interdum, ac
                                aliquet odio mattis. Class aptent taciti sociosqu ad litora
                                torquent per conubia nostra, per inceptos himenaeos. Curabitur
                                tempus urna at turpis condimentum lobortis. Ut commodo efficitur
                                neque. Ut diam quam, semper iaculis condimentum ac, vestibulum
                                eu nisl. Class aptent taciti sociosqu ad litora torquent per
                                conubia nostra, per inceptos himenaeos.{" "}
                            </p>
                            <Badge className="rounded-sm bg-[#EBEBEBB8] px-8  text-blacl font-semibold">Nombre d’annonce 8</Badge>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
