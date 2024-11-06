'use client'

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteReservation } from '../_lib/actions';
import { useTransition } from 'react';
import Spinner from '@/app/_components/Spinner';

function DeleteReservation({ bookingId, handleDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleReservation () {
    if (confirm('Are you sure you want to delete this reservation')) startTransition(() => handleDelete(bookingId))
  }

  return (
    <button onClick={handleReservation} className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
      {isPending ? <span className='mx-auto'><Spinner/></span> : <span className='mt-1'>Delete</span>}
    </button>
  );
}

export default DeleteReservation;
