
const mongoose = require('mongoose');


// Définition du schéma pour la collection "Task"

   const TaskSchema = new mongoose.Schema({

    // Titre de la tâche 
    
    title: {type: String,
            required: true,
            maxlength: 25,},

  // Description de la tâche

    description: {type: String,
                  required: true, 
                  maxlength: 255,},

   // Statut de la tâche

    status: {type: String,
             enum: ['open', 'in progress', 'pending', 'completed'],
             default: 'open',},

  // Identifiant de l'utilisateur qui a créé cette tâche

    userId: {type: mongoose.Schema.Types.ObjectId,
             ref: 'User',
             required: true,},

// Date limite de la tâche

    dueDate: {type: Date,
              required: true,
              validate: {

        validator: function (value) {
          return value > Date.now();   // Vérifie que la date limite est dans le futur
        },
        message: 'Due date must be in the future',
      },
    },

    // Date de création de la tâche : c'est la date actuelle par défaut

    createdAt: { type: Date,
                 default: Date.now,},

    // Date de la dernière mise à jour de la tâche : c'est aussi la date actuelle par défaut

    updatedAt: {type: Date,
                default: Date.now},

    // Date de suppression logique de la tâche : valeur par défaut est null, utilisé pour une "suppression logique"

    deletedAt: {type: Date,
                default: null,},   // Par défaut, la tâche n'est pas supprimée (null signifie que la tâche existe encore)
  });

  module.exports = mongoose.model('Task', TaskSchema);