import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks: {
    /** This will be called whenever a middleware is called for any request that matches with the matcher in the config */
    authorized: ({auth, request}) => {
      return !!auth?.user
    },
    signIn: async ({user, account, profile}) => {
      try {
        const existingUser = await getGuest(user.email);

        if (!existingUser) {
          await createGuest({email: user.email, fullName: user.name})
        }

        return true;
      } catch (err) {
        return false
      }
    },
    session: async ({session, user}) => {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id;

      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
}

export const {auth, signIn, signOut, handlers: {GET, POST}} = NextAuth(authConfig)