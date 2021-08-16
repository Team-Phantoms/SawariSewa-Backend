const express =require('express');
const router =express.Router();
const AddRequest=require('../models/AddRequestModel');
const auth =require('../middleware/auth')

router.post('/request/insert/:clusername',auth.verifyclient,function(req,res){

    const clusername=req.params.clusername;
   
    const problemtype=req.body.problemtype;
    const vechbrand=req.body.vechbrand;
    const vechmodel=req.body.vechmodel;
    const vechplatenum=req.body.vechplatenum;
      const address=req.body.address;
      const lat=req.body.lat;
      const long =req.body.long;
      const token=req.body.token;
      
      const rdata= new AddRequest({problemtype:problemtype, vechbrand:vechbrand, vechmodel:vechmodel,vechplatenum:vechplatenum,address:address,lat:lat,long:long,token:token,clusername:clusername});
      rdata.save() .then(function(result){
          res.status(201).json({success: true,request:result})
      })
      .catch(function(err1){
          res.status(500).json({success: false})
      })
      
      
  })

  router.post('/request/view/:clusername',auth.verifyclient,function(req,res){

    const clusername=req.params.clusername;
       
       AddRequest.find({clusername:clusername})
       .then(function(requestdata){
       res.status(200).json({success:true,rdata:requestdata})
               
           })
           .catch(function(e){
               res.status(500).json({success:false,error: e});
           })
       
       
  
         })
         router.post('/client/request/get',auth.verifymech,function(req,res){

           
               AddRequest.find()
               .then(function(requestdata){
               res.status(200).json({success:true,requestdata:requestdata})
                       console.log(requestdata)
                   })
                   .catch(function(e){
                       res.status(500).json({success:false,error: e});
                   })
               
               
          
                 })
         router.delete('/request/delete/:id',auth.verifyclient,function(req,res){
            const id=req.params.id;
            AddRequest.deleteOne({_id:id}).then(function(result){
                res.status(200).json({status:true, data: {result}})
            })
            .catch(function(e){
                res.status(500).json({success:false,error: e});
            })
        
        })

  module.exports=router;
  