const mongoose =require('mongoose');
const Feedback =mongoose.model("Feedback",{
    clusername:{
        type:String
    },
    clemail:{
        type:String
    },
    mechusername:{
        type:String
    },
    message:{
        type:String
    }
})
module.exports=Feedback;