import { NextApiResponse, NextApiRequest } from "next";

interface IdNextApiRequest extends NextApiRequest {
  query: {
    id?: number
  }
}

export default function echo(req: IdNextApiRequest, res: NextApiResponse) {
  // Short form
  res.json({ 'YouId': req.query.id })
}