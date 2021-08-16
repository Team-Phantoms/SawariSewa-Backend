const mongoose= require('mongoose');

const client =new mongoose.Schema({
    clfname:{
        type:String,
        required:true,    
    },
    cllname:{
        type:String,
        required:true,  
    },
    clemail:{
        type:String,
        required:true,
        unique : true
    },
    clusername:{
        type:String,
        required:true,
        unique : true
    },
    clpassword:{
        type:String,
        required:true
    },
    photo: {
        type:String,
        default: "no-photo.jpg",
      }
        
})

module.exports=mongoose.model("client",client);