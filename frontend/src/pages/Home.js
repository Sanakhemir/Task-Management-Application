import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskModal from '../components/TaskModal';


//Composant Home : Affiche une liste de tâches et permet de gérer (créer, afficher, modifier, supprimer) ces tâches via une modal

const Home = () => {

  // État local pour stocker la liste des tâches
  const [tasks, setTasks] = useState([]);

  // État local pour stocker la tâche actuellement sélectionnée
  const [selectedTask, setSelectedTask] = useState(null);

  // État pour contrôler l'affichage de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Récupération des tâches depuis l'API au chargement du composant
   
  useEffect(() => {
    const fetchTasks = async () => {
      try { 

        const res = await api.get('/tasks'); //Appel API pour récupérer les tâches

        setTasks(res.data);  // Mise à jour de l'état avec les données reçues

      } catch (err) {
        console.error(err);
      }
    };

    // Appel à la fonction pour charger les tâches
    fetchTasks(); 

    // Le tableau vide [] signifie que cet effet est exécuté une seule fois après le montage du composant 
  }, []);  

   // Gestionnaire pour afficher les détails d'une tâche dans la modal. @param {Object} task - La tâche à afficher

  const handleViewTask = (task) => {

    setSelectedTask(task); // Stocke la tâche sélectionnée

    setIsModalOpen(true);
  };


  // Gestionnaire pour fermer la modal

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <h1>My Tasks</h1>

       {/* Bouton pour créer une nouvelle tâche */}

      <button onClick={() => setIsModalOpen(true)}>Create New Task</button>

      {/* Tableau des tâches */}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>

              {/* Affiche les informations de la tâche */}

              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>

             {/* Boutons pour interagir avec la tâche */}

                <button onClick={() => handleViewTask(task)}>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Affiche la modal si elle est ouverte */}
      {isModalOpen && <TaskModal task={selectedTask} onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;