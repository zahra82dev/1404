import connectDB from "@/config/database";
import { IUser } from "@/models/User";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import { Session } from "next-auth";
import { Profile } from "next-auth";
import { User as UserAuth } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { CredentialInput } from "next-auth/providers/credentials";
import { Account } from "next-auth";
const googleProviderSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

const parseTest = googleProviderSchema.safeParse({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

if (!parseTest.success) {
  throw new Error(`worng env variables. Error: ${parseTest.error}`);
}
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn(params: {
      user: UserAuth | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      email?: { verificationRequest?: boolean | undefined } | undefined;
      credentials?: Record<string, CredentialInput> | undefined;
    }) {
      const { profile } = params;
      await connectDB();
      const user: IUser | null = await User.findOne({ email: profile?.email });
      if (!user) {
        if (profile) {
          User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
            role: "user",
          });
        }
      }
      return true;
    },
    async session({ session }: { session: Session }) {
      await connectDB();
      const user: IUser | null = await User.findOne({
        email: session.user.email,
      });
      if (user) {
        session.user.id = user._id.toString();
        session.user.role = user.role;
      }

      // token.role = user.role;
      return session;
    },
  },
};
export default authOptions;
