
import SellingSection from "./_components/SellingSection";
import LocationSection from "./_components/LocationSection";
import FiltreComponents from "@/components/shared/FiltreComponents";

export default function Home() {
  return (
    <div className="">
      <FiltreComponents />
      <div className="space-y-24 ">
        <LocationSection />
        <SellingSection />

      </div>
    </div>
  );
}
