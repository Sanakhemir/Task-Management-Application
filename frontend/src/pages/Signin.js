import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

//Composant Signin : Permet à un utilisateur de se connecter en saisissant son email et son mot de passe

const Signin = () => {

   // États locaux pour stocker l'email et le mot de passe saisis par l'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Accès à la fonction `login` depuis le contexte AuthContext
  const { login } = useAuth();

  // Hook pour rediriger l'utilisateur après connexion
  const Navigate = useNavigate();

  // Gestionnaire de soumission du formulaire : Envoie les identifiants de l'utilisateur pour tenter une connexion.
                                               //@param {Event} e - Événement de soumission du formulaire
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    // Redirige l'utilisateur vers la page d'accueil après une connexion réussie
    Navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Champ pour saisir l'email */}
      <input 
      type="email"
      placeholder="Email"
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />

      {/* Champ pour saisir le mot de passe */}
      <input type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} />

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Signin;