const{ Router } =require('express');
const express=require('express');
const { validationResult, check } = require('express-validator');
const client=require('../models/client_model');
const bcryptjs=require('bcryptjs')
const router=express.Router();
const jwt =require('jsonwebtoken');
const auth =require('../middleware/auth');
const upload=require('../middleware/fileUpload')

//Insert
router.post('/client/insert',[
    check('clfname','Email is required').not().isEmpty(),
    check('cllname','Contact is required').not().isEmpty(),
    check('clemail','Address is required').not().isEmpty(),
    check('clusername','Address is required').not().isEmpty(),
    check('clpassword','Password is required').not().isEmpty(),
],
function(req,res){
    const validatioErr = validationResult(req)
    if(validatioErr.isEmpty())
    {
    const clfname =req.body.clfname;
    const cllname=req.body.cllname;
    const clemail=req.body.clemail ;
    const clusername=req.body.clusername;
    const clpassword=req.body.clpassword;
    const photo=req.body.photo;
   bcryptjs.hash(clpassword,10,function(e,pw_hash){
    const data=new client({clfname:clfname,cllname:cllname,clemail:clemail,clusername:clusername,clpassword:pw_hash,photo:photo});
    data.save()
    .then(function(result){
        res.status(200).json({success:true,data:result})
    })
    .catch(function(e){
        res.status(500).json({ success:false })
    })
})
    }
    else{
        res.status(400).json(validatioErr.array())
    };

})

//GET
router.post('/client/login',function(req,res){
    const username=req.body.clusername;
    const password=req.body.clpassword;

    client.findOne({clusername:username})
    .then(function(clientData){
        if(clientData===null){
            // client not found
          return res.status(403).json({message:"Invalid client login details"})
        }
        //client exist or found
        bcryptjs.compare(password,clientData.clpassword,function(err,result1){
            if(result1===false){
                return res.status(403).json({success:false})
            }
           const token= jwt.sign({clientId : clientData._id},'csecretkey');
           res.status(200).json({success:true,token : token,data:clientData.clusername})

            
        })

        
        
    })
    .catch(function(e){
        res.status(500).json({error: e});
    })
})


router.post('/client/get/:clusername',auth.verifyclient,function(req,res){

    const clusername=req.params.clusername;

       
       client.find({clusername:clusername})
       .then(function(result){
       res.status(200).json({success:true,cprofile:result})
               
           })
           .catch(function(e){
               res.status(500).json({success:false,error: e});
           })
       
       
  
         })


// web ko lagi prifile
         router.post('/client/webget',auth.verifyclient,function(req,res){

            const clusername=req.clientData.clusername;
            
               
               client.find({clusername:clusername})
               .then(function(result){
               res.status(200).json({success:true,profile:result})
                       
                   })
                   .catch(function(e){
                       res.status(500).json({success:false,error: e});
                   })
               
               
          
                 })

//Update
router.put('/client/update/:id',function(req,res){
    const id =req.params.id;
    const addr=req.body.claddr;
    client.updateOne({_id:id},{claddress:addr}).then(function(){
        res.send("Client Updated")
    })
})

 
//logout
router.get('/logout',(req,res)=>{
    res.cookie('token','none',{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    });
    res.status(200).json({success:true})
})



router.put("/client/:clusername/photo",auth.verifyclient,upload.single('photo'),async function(req,res){
    if(req.file !==undefined){
        try{
            const image=await client.findOneAndUpdate({clusername:req.params.clusername},{$set:{photo:req.file.filename}},{new:true})
            res.status(200).json({success:true,photoL:image})
        }
        catch(error){
            res.status(500).json({success:false,err:error})
        }
    }
})
//web ko photo
router.put("/client/image/:clusername",auth.verifyclient,upload.single('photo'),async function(req,res){
    if(req.file !==undefined){
        try{
            const image=await client.findOneAndUpdate({clusername:req.params.clusername},{$set:{photo:req.file.filename}},{new:true})
            res.status(200).json({success:true,photoL:image})
        }
        catch(error){
            res.status(500).json({success:false,err:error})
        }
    }
})


module.exports=router;
