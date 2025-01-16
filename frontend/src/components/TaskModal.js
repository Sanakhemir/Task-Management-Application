import React, { useState } from 'react';


// Composant TaskModal : est une modal qui permet de créer ou de modifier une tâche.
 
//Props : `task` : un objet représentant une tâche
        //`onClose` : une fonction appelée pour fermer la modal

const TaskModal = ({ task, onClose }) => {

   // Déclaration des états 

  const [title, setTitle] = useState(task?.title || '');   // Titre de la tâche : par défaut, vide ou titre existant

  const [description, setDescription] = useState(task?.description || '');   // Description de la tâche

  const [status, setStatus] = useState(task?.status || 'open');  // Statut de la tâche : par défaut, "open"

  const [dueDate, setDueDate] = useState(task?.dueDate || '');   // Date d'échéance de la tâche


   //Gestionnaire de soumission du formulaire.
   //Ce code est exécuté lorsqu'on clique sur le bouton "Create" ou "Update".
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    onClose();
  };

  return (
    <div>
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        
       {/* Champ pour le titre */}

        <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} />    {/* Met à jour le titre dans l'état local*/}

       {/* Champ pour la description */}

        <textarea placeholder="Description" value={description} 
        onChange={(e) => setDescription(e.target.value)} />  {/* Met à jour la description dans l'état local*/}

        {/* Sélecteur pour le statut */}  

        <select value={status} 
        onChange={(e) => setStatus(e.target.value)}>  {/* Met à jour le statut dans l'état local*/}

          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>

        </select>

       {/* Champ pour la date d'échéance */}

        <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} />   {/* Met à jour la date dans l'état local*/}

        <button type="submit">{task ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default TaskModal;