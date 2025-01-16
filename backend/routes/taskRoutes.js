import express from 'express';
import auth from '../middleware/auth';
import { createTask, updateTask, deleteTask, getTaskById, getMyTasks } from '../controllers/taskController';

const router = express.Router();


// Route pour créer une tâche :on applique le middleware d'authentification avant d'appeler la fonction de création de tâche
router.post('/', auth, createTask);  // Pour créer une tâche : on appelle la fonction createTask

// Route pour mettre à jour une tâche existante spécifique par ID 
router.put('/:id', auth, updateTask);  // Mettre à jour une tâche: on appelle la fonction updateTask

// Route pour supprimer une tâche spécifique par ID 
router.delete('/:id', auth, deleteTask);  // Supprimer une tâche: on appelle la fonction deleteTask

// Route pour obtenir une tâche spécifique par ID 
router.get('/:id', auth, getTaskById);   //Obtenir une tâche: on appelle la fonction getTaskById

// Route pour obtenir toutes les tâches de l'utilisateur authentifié
router.get('/', auth, getMyTasks);  // Obtenir toutes les tâches: on appelle la fonction getMyTasks

module.exports = router;



