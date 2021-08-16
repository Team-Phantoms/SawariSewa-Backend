const express =require('express');
const router =express.Router();
const { validationResult, check } = require('express-validator');
const Vechicle =require('../models/vechicleModel');
const auth =require('../middleware/auth')

// router.post('/vehicle/insert/:clusername',auth.verifyclient,function(req,res){

// const clusername=req.params.clusername;
// const vechbrand=req.body.vechbrand;
// const vechmodel=req.body.vechmodel;
// const vechplatenum=req.body.vechplatenum;

// const vdata= new Vechicle({vechbrand:vechbrand, vechmodel:vechmodel, vechplatenum:vechplatenum,clusername:clusername});
// vdata.save() .then(function(result){
//     res.status(201).json({success:true,vehicle:result,message : "Vechicle data added "})
// })
// .catch(function(err1){
//     res.status(500).json({message:err1})
// })



// })

//for web vehicle add
router.post('/vehicle/web',auth.verifyclient,[
    // check('type','Username is required').not().isEmpty(),
    check('vechbrand','Brand is required').not().isEmpty(),
    check('vechmodel','Model is required').not().isEmpty(),
    check('vechplatenum','Platenum is required').not().isEmpty(),
    check('clusername','Username is required').not().isEmpty(),
],function(req,res){
    const validatioErr = validationResult(req)
    if(validatioErr.isEmpty())
    {
    const clusername=req.clientData.clusername;
    console.log(clusername);
    const vechbrand=req.body.vechbrand;
    const vechmodel=req.body.vechmodel;
    const vechplatenum=req.body.vechplatenum;
    
    const vdata= new Vechicle({vechbrand:vechbrand, vechmodel:vechmodel, vechplatenum:vechplatenum,clusername:clusername});
    vdata.save() .then(function(result){
        res.status(201).json({success:true,vehicle:result,message : "Vechicle data added "})
    })
    .catch(function(err1){
        res.status(500).json({message:err1})
    })
}
else{
    res.status(400).json(validatioErr.array())
};

       
  
         })

// router.post('/vehicle/view/:clusername',auth.verifyclient,function(req,res){

//     const clusername=req.params.clusername;
       
//        Vechicle.find({clusername:clusername})
//        .then(function(vehicledata){
//        res.status(200).json({success:true,vdata:vehicledata})
               
//            })
//            .catch(function(e){
//                res.status(500).json({success:false,error: e});
//            })
       
       
  
//          })
//web vehicle
router.post('/vehicle/show',auth.verifyclient,function(req,res){

    const clusername=req.clientData.clusername;
       
       Vechicle.find({clusername:clusername})
       .then(function(vehicledata){
       res.status(200).json({success:true,vdata:vehicledata})
               
           })
           .catch(function(e){
               res.status(500).json({success:false,error: e});
           })
       
       
  
         });

//update
router.put('/vehicle/update/:id',auth.verifyclient, function(req, res){
   
      const id= req.params.id;
     const vechbrand=req.body.vechbrand;
      const vechmodel=req.body.vechmodel;
      const vechplatenum=req.body.vechplatenum;
    

    Vechicle.updateOne({_id: id}, {vechbrand:vechbrand,vechmodel:vechmodel,vechplatenum:vechplatenum})
    .then(function(){
        res.send("Vehicle Updated")
    })
      .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  router.delete('/vehicle/delete/:id',auth.verifyclient,function(req,res){
    const id=req.params.id;
    Vechicle.deleteOne({_id:id}).then(function(result){
        res.status(200).json({status:true, data: {result}})
    })
    .catch(function(e){
        res.status(500).json({success:false,error: e});
    })
  })


module.exports =router;