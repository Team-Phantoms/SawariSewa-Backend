const express =require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const client_route=require('./routes/client_route');
 const mech_route=require('./routes/mechanic_route');
 const vechicleRoute=require('./routes/vechicleRoute');
 const businessRoute=require('./routes/business_route')
 const feedbackRoute = require('./routes/feedback_route');
 const AddRequestRoute=require('./routes/AddRequest_route')
 const work_history=require('./routes/workhistory_route')


const db = require('./database/SAS_db');


const admin=require("firebase-admin");
const serviceAccount = require("./sawari.json");


admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://sawarisewaapp-default-rtdb.firebaseio.com"
})
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("public"));
app.use("/api/sas",client_route);
app.use("/api/sas",mech_route);
app.use("/api/sas",vechicleRoute);
app.use("/api/sas",businessRoute)
app.use("/api/sas",feedbackRoute)
app.use("/api/sas",AddRequestRoute)
app.use("/api/sas",work_history)


app.listen(90);

