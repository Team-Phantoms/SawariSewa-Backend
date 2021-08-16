const jwt=require('jsonwebtoken');
const { findOne } = require('../models/client_model');
const client =require('../models/client_model')
const mech =require('../models/mechanic_model')

module.exports.verifyclient=function(req,res,next){
  console.log(req.headers.authorization)
  try{
   const token=req.headers.authorization.split(" ")[1];   
   const data = jwt.verify(token,'csecretkey');
   client.findOne({_id : data.clientId}).then(function(clientData){
     req.clientData  = clientData;
     next();
   }).catch(function(e){
     res.status(401).json({error : e})
   })
   
  }
  catch(e){
    res.status(401).json({error : e})
  }


}

module.exports.verifymech=function(req,res,next){
  try{
   const token=req.headers.authorization.split(" ")[1];   
   const mdata = jwt.verify(token,'secretkey');
   mech.findOne({_id : mdata.mechID}).then(function(mechData){
     req.mechData  = mechData;
     next();
   }).catch(function(e){
     res.status(401).json({error : e})
   })
   
  }
  catch(e){
    res.status(401).json({error : e})
  }


}