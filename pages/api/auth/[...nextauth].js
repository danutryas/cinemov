import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { dbAdmin } from "@/lib/firebase/firebaseAdmin.config";
import * as firestoreFunctions from "firebase/firestore";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "tes@example.com",
        },
        password: { label: "Password", type: "password", placeholder: "***" },
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    // GitHubProvider({
    //   clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    // }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: FirestoreAdapter(dbAdmin),
  secret: process.env.NEXTAUTH_SECRET,
});
