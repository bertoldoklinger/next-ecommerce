import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Stripe from 'stripe'


const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15"
      })
      if (user.email && user.name) {
        const costumer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        })
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            stripeCostumerId: costumer.id
          }
        })
      }
    },
  }
}

export default NextAuth(authOptions)