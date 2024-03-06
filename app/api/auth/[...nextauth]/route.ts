import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { toast } from "sonner";
const authOptions = {
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // @ts-ignore

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      // @ts-ignore

      async authorize(credentials) {
        // @ts-ignore

        const { email, password } = credentials;
        try {
          await connectDatabase();
          const user = await User.findOne({ email });

          if (!user) {
            toast.error("Uživatel nenalezen");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            toast.error("Špatný email, nebo heslo");
            return null;
          }
          return user;
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: any) {
      user.provider = account.provider;
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectDatabase();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });
            if (res.ok) {
              const newUser = await res.json();
              user.id = newUser.id;
              return user;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },

    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.profilePicture = user.profilePicture;
        token.id = user.id;
        token.provider = user.provider;
      }
      return { ...token, ...user };
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.profilePicture = token.profilePicture;
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};
// @ts-ignore

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
