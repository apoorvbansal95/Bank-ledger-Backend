const mongoose= require('mongoose');
const bcrypt= require('bcryptjs')

const userSchema= new mongoose.Schema({
    email:{
        type:String, 
        required:[true, 'Email is required'], 
        trim:true, 
        lowercase:true, 
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"],
        unique:[true, 'email already exists']
    }, 
    name:{
        type:String,
        required:[true, 'Name is required'], 
    }, 
    password:{
        type:String, 
        required:[true, "password is needed"], 
        minlength:[6, 'Password should be atleast 6 char long'], 
        select:false
    }, 
    systemUser:{
        type:Boolean, 
        default:false,
        immutable:true, 
        select:false
    }

},
{timestamps:true}
)
userSchema.pre('save', async function(){
  if(!this.isModified('password')){
    return 
  }

  const hashedPassword= await bcrypt.hash(this.password, 10);
  this.password= hashedPassword;
  return;
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}


const UserModel=mongoose.model('User', userSchema)
module.exports=UserModel;