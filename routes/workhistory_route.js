const express =require('express');
const router =express.Router();
const workHistory=require('../models/workhistory');
const auth =require('../middleware/auth');

router.post('/insert/work',auth.verifymech,function(req,res){
   
    const problemtype=req.body.problemtype;
      const address=req.body.address;
      const lat=req.body.lat;
      const long =req.body.long;
    const clusername=req.body.clusername;
    const mechusername=req.body.mechusername;
    const mechphone=req.body.mechphone;
    const accepted=req.body.accepted;
    const rejected=req.body.rejected;

      
      const workdata= new workHistory({problemtype:problemtype,address:address,lat:lat,long:long,clusername:clusername,mechusername:mechusername,mechphone:mechphone,accepted:accepted,rejected:rejected});
      workdata.save() .then(function(result){
          res.status(201).json({success: true,workd:result})
      })
      .catch(function(err1){
          res.status(500).json({success: false})
      })
      
      
  })
  router.post('/get/driver',auth.verifyclient,function(req,res){

    const clusername=req.clientData.clusername;
       workHistory.find({clusername:clusername,accepted:"true"})
       .then(function(requestdata){
           console.log("answer",requestdata.accepted);
       res.status(200).json({success:true,rdata:requestdata})
       
           })
           .catch(function(e){
               res.status(500).json({success:false,error: e});
           })

       
        
         })

         router.post('/get/work',auth.verifymech,function(req,res){

            const mechusername=req.mechData.mechusername;
               workHistory.find({mechusername:mechusername})
               .then(function(requestdata){
        
               res.status(200).json({success:true,wdata:requestdata})
               
                   })
                   .catch(function(e){
                       res.status(500).json({success:false,error: e});
                   })
        
               
                
                 })

                 router.delete('/work/delete/:id',auth.verifymech,function(req,res){
                    const id=req.params.id;
                    workHistory.deleteOne({_id:id}).then(function(result){
                        res.status(200).json({status:true, data: {result}})
                    })
                    .catch(function(e){
                        res.status(500).json({success:false,error: e});
                    })
                
                })
  module.exports =router;