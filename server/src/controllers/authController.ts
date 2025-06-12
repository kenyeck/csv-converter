import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../services/mongodb';
import { generateKeyPairSync } from 'crypto';

// Generate RSA keys
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

type User = {
  username: string;
  email: string;
};

export const verifyToken = (email: string, token: string) => {
  const decoded = jwt.verify(token, publicKey) as User;
  return decoded.email === email;
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  let doc = null;

  try {
    const db = await getDb();
    doc = await db.collection('users').findOne({ username, password });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error' });
  }

  if (doc !== null) {
    console.log(`User found: ${doc.email}`);

    // Sign a JWT with the private key
    const token = jwt.sign({ email: doc.email }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });

    return res.json({ message: 'Login successful', token });
  }

  console.log('Invalid credentials or user not found');
  return res
    .status(401)
    .json({ error: 'Invalid credentials or user not found' });
};
