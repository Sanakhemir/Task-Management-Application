const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  //Une bibliothèque utilisée pour sécuriser les mots de passe


// Définition du schéma pour la collection "User"

const UserSchema = new mongoose.Schema({

  // Nom d'utilisateur 
  username: {
    type: String,
    required: true,
    maxlength: 25,
  },

   // Adresse e-mail

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },

  // Mot de passe

  password: {
    type: String,
    required: true,
  },

  // Rôle de l'utilisateur 

  role: {
    type: String,
    default: 'user',
  },

  // Date de création 

  createdAt: {
    type: Date,
    default: Date.now,
  },

   // Date de la dernière mise à jour

  updatedAt: {
    type: Date,
    default: Date.now,
  },

   // Date de suppression logique   , remplacer par timestamp

  deletedAt: {
    type: Date,
    default: null,
  },
});

// Hook de pré-sauvegarde pour hasher le mot de passe avant d'enregistrer l'utilisateur dans la base de données

UserSchema.pre('save', async function (next) {

  // Si le mot de passe n'a pas été modifié, on passe à l'étape suivante sans rien faire

  if (!this.isModified('password')) 

    next(); // Si le mot de passe n'a pas changé, on passe à l'étape suivante

  // Hachage du mot de passe avant de l'enregistrer dans la base de données
  // bcrypt.hash prend le mot de passe et le "salt" pour le sécuriser
  this.password = await bcrypt.hash(this.password, 10);

  next(); // Passe à l'étape suivante (sauvegarde dans la base de données)
});

module.exports = mongoose.model('User', UserSchema);