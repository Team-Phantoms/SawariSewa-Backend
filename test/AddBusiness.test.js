//Testing of adding business details api from mechanic
const Business =require('../models/businessModel');
const mongoose=require('mongoose');
//database connection
const url='mongodb://localhost:27017/SawariApatkalinSewa';
beforeAll(async()=>{
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex:true
    });
});

afterAll(async()=>{
    await mongoose.connection.close();
})

describe('Business Schema test anything',()=>{
   //insert
    it('Register Business testing anything',()=>{
        const bdata={
            "fullname":"harisharan", 
            "phone":"8520", 
            "gender":"Four Wheelers",
            "address":"bkht",
            "lat":"27.03",
            "long":"84.25",
            "mechusername":"Hsisisj"}

        return Business.create(bdata)
        .then((pro_ret)=>{
            expect(pro_ret.fullname).toEqual('harisharan')
        })
    })
//update
    it('to test the update', async () => {
        return Business.findOneAndUpdate({_id :Object('607d49bb3cc5a830c4f500d9')},
       {$set : {fullname:'yyyy'}})
        .then((pp)=>{
        expect(pp.fullname).toEqual('shyamkishore')
        })
       
       });
//delete
       it('to test the delete client is working or not', async () => {
        const status = await Business.deleteOne({_id:"607d6d7cf906241b38e09346"});
        expect(status.ok).toBe(1);
    })

    

})

