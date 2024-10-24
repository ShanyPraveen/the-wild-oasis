import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({capacity}) {
  const cabins = await getCabins();

  let displayedCabins = []

  if (capacity === 'all') displayedCabins = cabins;
  if (capacity === 'small') displayedCabins = cabins.filter(cabin => cabin.maxCapacity < 3);
  if (capacity === 'medium') displayedCabins = cabins.filter(cabin => cabin.maxCapacity > 3 && cabin.maxCapacity < 8);
  if (capacity === 'large') displayedCabins = cabins.filter(cabin => cabin.maxCapacity > 7);
  
  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}
