// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from "next"

export default function handler(request: NextApiRequest, response: NextApiResponse) {

  const users = [
    {id:1, name:'kleves'},
    {id:2, name:'maria'},
    {id:3, name:'josé'}
  ]
  return response.status(200).json(users)
}
