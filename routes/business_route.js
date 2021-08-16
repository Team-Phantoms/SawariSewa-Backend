const express =require('express');
const router =express.Router();
const Business =require('../models/businessModel');
const auth =require('../middleware/auth')
const asyncHandler = require("../middleware/async");
const { Context } = require('express-validator/src/context');


//Insert
router.post('/business/insert',auth.verifymech,function(req,res){
  const mechusername=req.body.mechusername
    const fullname=req.body.fullname;
    const phone=req.body.phone;
    const gender=req.body.gender;
    const address=req.body.address;
    const lat=req.body.lat;
    const long =req.body.long;
    
    const bdata= new Business({fullname:fullname, phone:phone, gender:gender,address:address,lat:lat,long:long,mechusername:mechusername});
    bdata.save() .then(function(result){
        res.status(201).json({success: true,business:result})
    })
    .catch(function(err1){
        res.status(500).json({success: false})
    })
    
    
})





//GET
router.post('/business/all' ,function(req,res){
   
    Business.find()
    .then(function(businessData){
    res.status(200).json({success:true,bdata:businessData})
            
        })
        .catch(function(e){
            res.status(500).json({success:false,error: e});
        })

            
    })

  router.post('/business/mech/:mechusername',auth.verifymech,function(req,res){

     const mechusername=req.params.mechusername;
        
        Business.find({mechusername:mechusername})
        .then(function(businessData){
        res.status(200).json({success:true,bdata:businessData})
                
            })
            .catch(function(e){
                res.status(500).json({success:false,error: e});
            })
        
        
   
          })
          //web id get
          router.post('/business/mechanic/:id',auth.verifymech,function(req,res){

            const id=req.params.id;
               
               Business.find({_id:id})
               .then(function(businessData){
               res.status(200).json({success:true,bdata:businessData})
                       
                   })
                   .catch(function(e){
                       res.status(500).json({success:false,error: e});
                   })
               
               
          
                 })


    //delete  

router.delete('/business/delete/:id',auth.verifymech,function(req,res){
    const id=req.params.id;
    Business.deleteOne({_id:id}).then(function(result){
        res.status(200).json({status:true, data: {result}})
    })
    .catch(function(e){
        res.status(500).json({success:false,error: e});
    })

})

router.put('/business/update/:id',auth.verifymech, (req, res, next) => {
    const business = new Business({
      _id: req.params.id,
      fullname:req.body.fullname,
      phone:req.body.phone,
      gender:req.body.gender,
      address:req.body.address,
      lat:req.body.lat,
      long:req.body.lat
    });
    Business.updateOne({_id: req.params.id}, business).then(
      () => {
        res.status(201).json({
            success: true,
            count: business.length,
            data: business,
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

    
     



module.exports =router;