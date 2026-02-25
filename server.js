const app=require('./src/app');
require('dotenv').config()
const connectTODB= require('./src/config/db')
const PORT=3000;

connectTODB();
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})