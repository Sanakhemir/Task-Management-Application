import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Importation d'un hook personnalisé pour obtenir l'état d'authentification

//Composant ProtectedRoute : Ce composant est utilisé pour restreindre l'accès à certaines routes en fonction de l'état d'authentification de l'utilisateur.
                            //Si l'utilisateur est authentifié, il peut accéder à la route. Sinon, il est redirigé vers la page de connexion 

const ProtectedRoute = ({ component: Component, ...rest }) => {

  // Récupération de l'état d'authentification depuis le contexte
  const { isLoggedIn } = useAuth();  
  return (

    // Utilisation de la balise Route pour définir une route

    <Route
      {...rest}
      render={(props) =>

        isLoggedIn ?    // Si l'utilisateur est connecté, afficher le composant ciblé

        <Component {...props} /> 

        : <Navigate to="/signin" />  // Sinon, rediriger vers la page de connexion
      }
    />
  );
};

export default ProtectedRoute;