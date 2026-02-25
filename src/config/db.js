const mongoose= require('mongoose');

function connectTODB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        console.log('Error in connecting to mongodb', err);
        process.exit(1);
    })
}

module.exports=connectTODB;