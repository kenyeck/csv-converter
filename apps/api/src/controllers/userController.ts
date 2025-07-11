import { getUserCollection } from '@lib/mongodb';
import { Request, Response } from 'express';

// TODO: Move to models or shared package?
interface User {
   name: string;
   email: string;
}

export const addUpdateUser = async (req: Request, res: Response) => {
   const user = req.body as User;
   if (!user) {
      return res.status(400).json({ error: 'Name and email are required' });
   }

   const users = await getUserCollection();
   const dbUser = await users.findOneAndUpdate(
      { email: user.email },
      {
         $set: {
            name: user.name,
            email: user.email,
            lastLogin: new Date()
         },
         $setOnInsert: {
            createdAt: new Date()
         }
      },
      { upsert: true, returnDocument: 'after' }
   );
   console.log('dbUser', dbUser);
   if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
   }
   return res.status(200).json({
      _id: dbUser._id.toString(),
      name: dbUser.name,
      email: dbUser.email
   });
};

export const getUsers = async (req: Request, res: Response) => {
   try {
      const users = await getUserCollection();
      return res.json(users.find().toArray());
   } catch (err) {
      return res.status(500).json({ error: `Database error: ${err}` });
   }
};
