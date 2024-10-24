'use server';

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations')
}