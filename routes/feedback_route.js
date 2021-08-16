const express =require('express');
const router =express.Router();
const feedback =require('../models/feedbackModel');
const auth =require('../middleware/auth');
const Feedback = require('../models/feedbackModel');

router.post('/feedback/insert',auth.verifyclient,function(req,res){

    
    const clusername=req.body.clusername
    const clemail=req.body.clemail
    const mechusername=req.body.mechusername;
    const message=req.body.message
   
      
      const feed= new feedback({clusername:clusername, clemail:clemail, mechusername:mechusername,message:message});
      feed.save() .then(function(result){
          res.status(201).json({success: true,feeeback:result})
      })
      .catch(function(err1){
          res.status(500).json({success: false})
      })
      
      
  })

  router.post('/feedback/view',auth.verifymech,function(req,res){

    const mechusername=req.mechData.mechusername;
       
       Feedback.find({mechusername:mechusername})
       .then(function(result){
       res.status(200).json({success:true,feed:result})
               
           })
           .catch(function(e){
               res.status(500).json({success:false,error: e});
           })
       
       
  
         })

  module.exports =router;