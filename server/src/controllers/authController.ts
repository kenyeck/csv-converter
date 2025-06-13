import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../lib/mongodb';
import { generateKeyPairSync } from 'crypto';
import { ObjectId } from 'mongodb';

// Generate RSA keys
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { publicKey, privateKey } = generateKeyPairSync('rsa', { // eslint-disable-line no-unused-vars
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

type User = {
  id: ObjectId;
  username: string;
  name: string;
  email: string;
  password?: string;
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

  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ username, password });
    if (user !== null) {
      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1h',
        }
      );
      const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );
      res.setHeader('Set-Cookie', [
        `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
        `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`,
      ]);
      return res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ error: `Database error: ${err}` });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};

export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const db = await getDb();
    const existingUser = await db
      .collection('users')
      .findOne({ username });
    if (existingUser !== null) {
      return res.status(401).json({ error: 'Username already exists' });
    }
    return res.json({ message: 'Username is available', username });
  } catch (err) {
    return res.status(500).json({ error: `Database error: ${err}` });
  }
};

export const register = async (req: Request, res: Response) => {
  const { user } = req.body;

  if (!user.username || !user.password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const db = await getDb();
    const existingUser = await db
      .collection('users')
      .findOne({ username: user.username });
    if (existingUser !== null) {
      return res.status(401).json({ error: 'Username already exists' });
    }

    const result = await db.collection('users').insertOne({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    if (result.acknowledged) {
      const newAccessToken = jwt.sign(
        { userId: result.insertedId },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1h',
        }
      );
      const newRefreshToken = jwt.sign(
        { userId: result.insertedId },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );
      res.setHeader('Set-Cookie', [
        `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
        `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`,
      ]);
      return res.json({
        message: 'Registration successful',
        user: {
          id: result.insertedId,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ error: `Database error: ${err}` });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: ObjectId };
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    // Optionally issue a new refresh token
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
    res.setHeader('Set-Cookie', [
      `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
      `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`,
    ]);
    return res.json({ message: 'Token refreshed' });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: ObjectId;
    };
    return res.json({ user: { userId: decoded.userId } });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', [
    'accessToken=; HttpOnly; Path=/; Max-Age=0',
    'refreshToken=; HttpOnly; Path=/; Max-Age=0',
  ]);
  return res.json({ message: 'Logged out' });
};
