import express from 'express';
import dotenv from 'dotenv';
// import connectDB from './config/db';
import authRoutes from './routes/authRoutes';  //Gère les routes liées à l'authentification (login, inscription)
import taskRoutes from './routes/taskRoutes';   //Gère les routes pour les tâches (ajout, suppression, mise à jour)
import cors from 'cors'; //Middleware pour permettre le partage des ressources entre Frontend et Backend

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors()); //Active le partage de ressources entre domaines différents.

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
console.log('Task mangment Application')

app.listen(PORT, () => console.log(`le serveur est démarré sur http://localhost:${PORT}`))







