import { getUserCollection } from '@lib/mongodb';
import { Request, Response } from 'express';

export const addUser = async (req: Request, res: Response) => {
   const name = req.body?.name;
   const email = req.body?.email;
   if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
   }

   try {
      const users = await getUserCollection();
      let user = await users.findOne({ email });
      if (!user) {
         const doc = await users.insertOne({
            name: name!,
            email: email!
         });
         user = { _id: doc.insertedId, name, email };
         return res.status(201).json(user);
      }
      return res.json(user);
   } catch (err) {
      return res.status(500).json({ error: `Database error: ${err}` });
   }
};

export const getUsers = async (req: Request, res: Response) => {
   try {
      const users = await getUserCollection();
      return res.json(users.find().toArray());
   } catch (err) {
      return res.status(500).json({ error: `Database error: ${err}` });
   }
};
