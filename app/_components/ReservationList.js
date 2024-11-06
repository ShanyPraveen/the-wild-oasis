'use client';

import ReservationCard from '@/app/_components/ReservationCard';
import { deleteReservation } from '../_lib/actions';
import { useOptimistic } from 'react';

export default function ReservationList({bookings}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
    return curBookings.filter(booking => booking.id !== bookingId);
  })

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId)
    await deleteReservation(bookingId)
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard handleDelete={handleDelete} booking={booking} key={booking.id} />
      ))}
    </ul>
  )
}
