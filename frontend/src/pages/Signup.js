import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


//Composant Signup :Permet à un utilisateur de créer un compte en fournissant un nom d'utilisateur, un email et un mot de passe

const Signup = () => {

  // États locaux pour stocker les valeurs saisies par l'utilisateur
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Accès à la fonction `register` depuis le contexte AuthContext
  const { register } = useAuth();

   // Hook pour rediriger l'utilisateur après l'inscription
  const Navigate = useNavigate();


    //Gestionnaire de soumission du formulaire : Envoie les informations saisies pour créer un compte.
                                              // @param {Event} e - Événement de soumission du formulaire
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
    Navigate('/signin');
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Champ pour saisir le nom d'utilisateur */}
      <input 
      type="text" 
      placeholder="Username" v
      alue={username} 
      onChange={(e) => setUsername(e.target.value)} />

      {/* Champ pour saisir l'email */}
      <input 
      type="email" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />

      {/* Champ pour saisir le mot de passe */}
      <input 
      type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} />

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;