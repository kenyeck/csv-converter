import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/file', fileRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});