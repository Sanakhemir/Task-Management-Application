import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';   // Importation d'Axios pour gérer les requêtes HTTP
import { toast } from 'react-toastify';  // Importation de React-Toastify pour afficher des notifications utilisateur


//Création d'un contexte AuthContext :permet de partager les fonctionnalités liées à l'authentification (login, register, etc.)
//dans toute l'application sans avoir à passer manuellement des props

const AuthContext = createContext();

// Composant AuthProvider : Ce composant fournit le contexte AuthContext à tous les enfants qui en ont besoin
 
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // État local pour savoir si l'utilisateur est connecté

// Fonction de connexion (login) :
       // Envoie les identifiants de l'utilisateur à l'API pour s'authentifier
       //En cas de succès, enregistre le token dans `localStorage` et met à jour l'état d'authentification
  
  const login = async (email, password) => {
    try {
      // Appel API pour se connecter
      const res = await axios.post('/api/auth/signin', { email, password });

      // Stockage du token dans localStorage
      localStorage.setItem('token', res.data.token);

      setIsLoggedIn(true);

      toast.success('Logged in successfully');

    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

   // Fonction d'inscription (register) : Envoie les informations de l'utilisateur à l'API pour créer un compte
   
  const register = async (username, email, password) => {
    try {
      // Appel API pour s'inscrire
      await axios.post('/api/auth/signup', { username, email, password });

      toast.success('Account created successfully');

    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  };

  return (

    // Fournit les fonctionnalités d'authentification à l'ensemble de l'application

    <AuthContext.Provider value={{ isLoggedIn, login, register }}>
      {children}   {/* avoir l'accès à `AuthContext` via le hook useAuth */}

    </AuthContext.Provider>
  );
};



// Hook personnalisé useAuth : permet de consommer le contexte AuthContext plus facilement dans les composants.

export const useAuth = () => useContext(AuthContext);