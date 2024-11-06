'use server';

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  await signIn('google', {redirectTo: '/account'});
}

export const signOutAction = async () => {
  await signOut({redirectTo: '/'});
}

export const updateGuest = async (formData) => {
  const session = await auth();

  if (!session.user) throw new Error('You mush be authorized to make this action');

  const [nationality, countryFlag] = formData.get('nationality').split('%')

  const updateData = {
    nationality, countryFlag, nationalId: formData.get('nationalID')
  }

  const { data, error } = await supabase
  .from('guests')
  .update(updateData)
  .eq('id', session.user.guestId)
  .select()
  .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile')
}

export const deleteReservation = async (bookingId) => {
  await new Promise((res) => setTimeout(res, 2000))
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations')
}

export const updateReservation = async (formData) => {
  const reservationId = formData.get('reservationId');

  const updateData = {
    numGuests: formData.get('numGuests'),
    observations: formData.get('observations')
  }

  console.log(reservationId, updateData)

  const { data, error } = await supabase
  .from('bookings')
  .update(updateData)
  .eq('id', reservationId)
  .select()
  .single();

  if (error) throw error

  revalidatePath('/account/reservations');
  redirect('/account/reservations');
}

export const createReservation = async (bookingData, formData) => {
  console.log(bookingData, formData)
  const session = await auth()

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: 'unconfirmed',
    hasBreakfast: false,
    hasPaid: false,
    observations: formData.get('observations'),
    numGuests: formData.get('numGuests')
  }

  const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}