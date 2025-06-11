import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Here you would typically check the credentials against a database
    // For this example, we'll just simulate a successful login
    if (username === 'admin' && password === 'password') {
        return res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
}
