import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
import authRoutes from './routes/authRoutes';
import planRoutes from './routes/planRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/plans', planRoutes);

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
