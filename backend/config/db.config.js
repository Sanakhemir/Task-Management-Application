require('dotenv').config();
const mongoose = require('mongoose');


// dotenv.config()

// console.log(process.env.DB_URI)

console.log('DB_URI:', process.env.DB_URI);

const connectDB = async () =>{
    try{
        await mongoose.connect (process.env.DB_URI,);

        console.log('MongoDB connecté');
    }
   catch(err){
        console.log('Erreur de connexion MongoDB!', err);
        
   }
}

module.exports = connectDB;
