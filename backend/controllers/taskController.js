import Task  from '../models/task';

//Créer une tâche

const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({ title, description, dueDate, userId: req.user.id });  // Crée une nouvelle tâche

    await task.save();   // Sauvegarde dans la base de données

    res.status(201).json(task);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// mettre à jour une tâche

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.user.id },   // Cherche une tâche avec cet ID appartenant à l'utilisateur

      req.body,    // Utilise les données du corps de la requête pour mettre à jour la tâche

      { new: true });  // Retourne la tâche mise à jour au lieu de l'ancienne
    if (!task) throw new Error('Task not found');

    res.json(task);  // Renvoie la tâche mise à jour à l'utilisateur.

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//supprime une tâche

const deleteTask = async (req, res) => {

  const { id } = req.params;     // Récupère l'identifiant de la tâche à supprimer

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id }); // Supprime la tâche uniquement si elle appartient à l'utilisateur

    if (!task) throw new Error('Task not found');

    res.json({ message: 'Task deleted successfully' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// récupère une tâche

const getTaskById = async (req, res) => {

  const { id } = req.params;   // Récupère l'identifiant de la tâche

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id });  // Cherche une tâche spécifique avec cet ID appartenant à l'utilisateur

    if (!task) throw new Error('Task not found');

    res.json(task);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//récupère toutes les tâches de l'utilisateur

const getMyTasks = async (req, res) => {
  const { status } = req.query;   // Récupère un éventuel filtre sur le statut

  try {
    const filter = { userId: req.user.id };   // Crée un filtre pour les tâches de l'utilisateur

    if (status) filter.status = status;

    const tasks = await Task.find(filter);  // Récupère les tâches correspondant au filtre

    res.json(tasks);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createTask, updateTask, deleteTask, getTaskById, getMyTasks };