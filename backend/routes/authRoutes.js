import express from 'express';

import { signup, signin } from '../routes';

const router = express.Router();

// Définition de la route pour l'inscription d'un utilisateur

router.post('/signup', signup);   // Lorsque la méthode HTTP POST est envoyée vers '/signup', on appelle la fonction signup


// Définition de la route pour la connexion d'un utilisateur

router.post('/signin', signin);  // Lorsque la méthode HTTP POST est envoyée vers '/signin', on appelle la fonction signin

module.exports = router;