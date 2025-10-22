import AnnounceComponets from "./_components/AnnounceComponets"
import ProfileComponents from "./_components/ProfileComponents"


export default function page() {
    return (
        <div>
           <div className="">
                 <div className="">
                    <ProfileComponents />

                 </div>
                  <div className="mt-8">
                    <AnnounceComponets />
                  </div>
                 
            </div> 
        </div>
    )
}