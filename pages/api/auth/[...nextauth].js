import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "@/lib/firebase/firebase.config";
import * as firestoreFunctions from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
      // async authorize(credentials) {
      //   if (!credentials || !credentials.email || !credentials.password)
      //     return null;
      //   const auth = useAuth();
      //   createUserWithEmailAndPassword(
      //     auth,
      //     credentials.email,
      //     credentials.password
      //   )
      //     .then((userCredential) => {
      //       const user = userCredential.user;
      //       return user;
      //     })
      //     .catch((error) => {
      //       const errorCode = error.code;
      //       const errorMessage = error.message;
      //     });
      // },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_ID,
      clientSecret: process.env.NEXT_GOOGLE_SECRET,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
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
  adapter: FirestoreAdapter({ db, ...firestoreFunctions }),
  pages: {
    signIn: "/auth/login",
  },
});
