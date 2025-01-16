import mongoose from 'mongoose'

dotenv.config()

console.log(process.env.DB_URL)

const connectDB = async () =>{
    try{
        await mongoose.connect (process.env.MONGO_URI,);

        console.log('MongoDB connecté');
    }
   catch(err){
        console.log('Erreur de connexion MongoDB!');
        
   }
}

connectDB();
module.exports = mongoose
