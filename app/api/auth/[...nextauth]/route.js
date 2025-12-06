import NextAuth from 'next-auth'
import {authOptions} from '@/lib/authOptions';


let handler = NextAuth(authOptions)

export  { handler as GET, handler as POST }
