const mongoose =require('mongoose');
const Vehicle =mongoose.model("myVehicle",{
    vechbrand:{
        type:String
    },
    vechmodel:{
        type:String
    },
    vechplatenum:{
        type:String
    },
    clusername:{
        type:String
    }
})
module.exports=Vehicle;