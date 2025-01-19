const express = require('express');
const connectDB = require('./config/db.config');
const authRoutes = require('./routes/authRoutes'); //Gère les routes liées à l'authentification (login, inscription)
const taskRoutes = require('./routes/taskRoutes');   //Gère les routes pour les tâches (ajout, suppression, mise à jour)
const cors = require('cors'); //Middleware pour permettre le partage des ressources entre Frontend et Backend

require('dotenv').config();
// dotenv.config()
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); //Active le partage de ressources entre domaines différents. 'cors syntax'

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
console.log('Task mangment Application')

app.listen(PORT, () => console.log(`le serveur est démarré sur http://localhost:${PORT}`))







