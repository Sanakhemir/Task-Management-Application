const bcrypt = require('bcryptjs'); //comparer les mots de passe chiffrés avec ceux saisis par l'utilisateur
const jwt = require('jsonwebtoken'); //générer les tokens pour authentifier les utilisateurs après leur connexion.
const User = require('../models/User');

//Créé un nouveau utilisateur "Inscription"

const signup = async (req, res) => {
  const { username, email, password } = req.body;   // Extraction des données depuis la requête.

  try {
    const user = new User({ username, email, password }); //instance 'new'

    await user.save();  // Sauvegarde de l'utilisateur dans la base de données

    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


//Authentifier un utilisateur

const signin = async (req, res) => {
  const { email, password } = req.body;                             // Extraction de l'email et du mot de passe.

  try {
    const user = await User.findOne({ email });                      // Recherche de l'utilisateur par email
 
    if (!user) throw new Error('User not found');                   // Si l'utilisateur n'existe pas, on lance une erreur

    const isMatch = await bcrypt.compare(password, user.password);  // Comparaison des mots de passe

    if (!isMatch) throw new Error('Invalid credentials');           // Si les mots de passe ne correspondent pas, on lance une erreur
     
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });   // Génération du token

    res.json({ token });  // Renvoi du token 

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, signin };