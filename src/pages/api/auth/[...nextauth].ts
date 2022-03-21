import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { faunadb } from '../../../services/faunadb'
import {query as q} from 'faunadb'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,            
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile}) {
      const {email}=user;      
      try {
        faunadb.query(          
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data:{email}}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          )
        )
        return true
        
      } catch (error) {
        return false  
      }
    },
  }
})