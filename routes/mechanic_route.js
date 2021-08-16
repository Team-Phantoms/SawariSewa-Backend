const { Router }=require('express');
const express=require('express');
const Mechanic = require('../models/mechanic_model');
// const mech=require('../models/mechanic_model');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const jwt =require('jsonwebtoken');
const { check } = require('express-validator');
const auth =require('../middleware/auth');
const upload=require('../middleware/fileUpload')
//Insert
router.post('/insert/mech',
function(req,res){
    const mechfname =req.body.mechfname;
    const mechlname =req.body.mechlname;
    const mechemail =req.body.mechemail;
    const mechusername =req.body.mechusername;
    const mechvechtype=req.body.mechvechtype;
    const mechaddress=req.body.mechaddress;
    const mechPhone=req.body.mechPhone;
    const mechcitizenship=req.body.mechcitizenship;
    const mechworkplace=req.body.mechworkplace;
    const mechPANnum=req.body.mechPANnum;
    const mechpassword=req.body.mechpassword;
    const photo=req.body.photo;
    bcryptjs.hash(mechpassword,10,function(e,pw_hash){

    const data=new Mechanic({mechfname:mechfname,mechlname:mechlname,mechemail:mechemail,mechusername:mechusername, mechvechtype:mechvechtype,mechaddress:mechaddress,mechPhone:mechPhone,
        mechcitizenship:mechcitizenship, mechworkplace:mechworkplace, mechPANnum:mechPANnum,mechpassword:pw_hash,photo:photo});
    data.save()
    .then(function(result){
        res.status(200).json({success: true})
    })
    .catch(function(e){
        res.status(500).json({ success:false })
    })
})

})



//GET
router.post('/mechanic/login',function(req,res){
    const username=req.body.clusername;
    const password=req.body.clpassword;

    Mechanic.findOne({mechusername:username})
    .then(function(mechData){
        if(mechData===null){
            // client not found
          return res.status(403).json({message:"Invalid mechanic login details"})
        }
        //client exist or found
        bcryptjs.compare(password,mechData.mechpassword,function(err,result1){
            if(result1===false){
                return res.status(403).json({success:false})
            }
           const token= jwt.sign({mechID : mechData._id},'secretkey');
        
           res.status(200).json({success:true,token: token,data:mechData.mechusername})

            
        })

        
        
    })
    .catch(function(e){
        res.status(500).json({error: e});
    })
})
router.post('/mechanic/webget',auth.verifymech,function(req,res){

    const mechusername=req.mechData.mechusername;
       Mechanic.find({mechusername:mechusername})
       .then(function(result){
       res.status(200).json({success:true,profile:result})
               
           })
           .catch(function(e){
               res.status(500).json({success:false,error: e});
           })
       
       
  
         })
         router.put("/mechanic/image/:mechusername",auth.verifymech,upload.single('photo'),async function(req,res){
            if(req.file !==undefined){
                try{
                    const image=await Mechanic.findOneAndUpdate({mechusername:req.params.mechusername},{$set:{photo:req.file.filename}},{new:true})
                    res.status(200).json({success:true,photoL:image})
                }
                catch(error){
                    res.status(500).json({success:false,err:error})
                }
            }
        })
        router.get('/logout',(req,res)=>{
            res.cookie('token','none',{
                expires:newDate(Date.now()+10*1000),
                httpOnly:true
            });
            res.status(200).json({success:true})
        })
        
//Delete
router.delete('/mech/delete/:id',function(req,res){
    const id=req.params.id;
    Mechanic.deleteOne({_id:id}).then(function(){
        res.send("Mechanic deleted");
    })
})
//Update
router.put('/mech/update/:id',function(req,res){
    const id=req.params.id;
    const mechvech=req.body.mecvechtype;
    Mechanic.updateOne({_id:id},{ mechvechicletype:mechvech}).then(function(){
        res.send("Vechicle Type Updated");
    })
})
module.exports=router;