const mongoose= require('mongoose');


const transactionSchema= new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account', 
        required:[true, 'Transaction muts be associated from account'],
        index:true
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account', 
        required:[true, 'Transaction muust be associated to account'],
        index:true
    }, 
    status:{
        type:String, 
        enum:{
            values:['PENDING','COMPLETED', 'FAILED', 'REVERSED'], 
            message:"Status can either be pending, completed, failed or reversed"
        },
        default:'PENDING'
    }, 
    amount:{
        type:Number, 
        required:[true,'Amount is required for transaction'],
        min:[0,'Amount cannot be negative']
    }, 
    idempotencyKey:{
        type:String, 
        required:[true, 'Idempotency key is required for transaction'],
        unique:true, 
        index:true
    }
}, {
    timestamps:true
})

const transactionModel= mongoose.model('Transaction', transactionSchema)

module.exports= transactionModel;