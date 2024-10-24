import Cabin from "@/app/_components/Cabin";
import DateSelector from "@/app/_components/DateSelector";
import Reservation from "@/app/_components/Reservation";
import ReservationForm from "@/app/_components/ReservationForm";
import Spinner from "@/app/_components/Spinner";
import { getBookedDatesByCabinId, getCabin, getCabins, getSettings } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

export const generateMetadata = async ({params}) => {
  const {name} = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name} `
  }
}

/** This is to set static pros so the server can still cache the content as a static page */
export const generateStaticParams = async () => {
  const cabins = await getCabins();
  const ids = cabins.map(cabin => {
    return {
      cabinId: String(cabin.id)
    }
  });

  return ids
}

export default async function Page({params}) {
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin}/>

      <div className="mb-10">
        <h2 className="text-5xl font-semibold text-center text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner/>} >
        <Reservation cabin={cabin}/>
      </Suspense>
    </div>
  );
}
