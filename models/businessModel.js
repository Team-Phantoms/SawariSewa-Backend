const mongoose =require('mongoose');
const Business =mongoose.model("Business",{
    fullname:{
        type:String
    },
    phone:{
        type:String
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    mechusername:{
        type:String
    }
})
module.exports=Business;