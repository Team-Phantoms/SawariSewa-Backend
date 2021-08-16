const mongoose= require('mongoose');

const Mechanic =mongoose.model('Mechanic',{
    mechfname:{
        type:String,
        required:true
    },
    mechlname:{
        type:String,
        required:true
    },
    mechemail:{
        type:String,
        required:true,
        unique : true
    },
    mechusername:{
        type:String,
        required:true
    },
    mechvechtype:{
        type:String,
        required:true,
     },
     mechaddress:{
        type:String,
        required:true,
    },
  
    mechPhone:{
        type:String,
        required:true
    },
    mechcitizenship:{
        type:String,
        required:true
    },
    mechworkplace:{
        type:String,
        required:true,
    },
    mechPANnum:{
        type:String,
        required:true,
    },
    mechpassword:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        default:"no-photo.jpg"
    }
        
})

module.exports=Mechanic;