//testinng of client adding problem request API
const AddRequest=require('../models/AddRequestModel');
const mongoose=require('mongoose');

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

describe('Request Schema test anything',()=>{
   //addrequest
    it('Register Request testing anything',()=>{
        const request={
            "clusername":"shyamkishore", 
            "vechbrand":"8520", 
            "vechmodel":"Four Wheelers",
            "vechplatenum":"3755",
            "address":"bkht",
            "lat":"27.03",
            "long":"84.25",
          }

        return AddRequest.create(request)
        .then((pro_ret)=>{
            expect(pro_ret.vechmodel).toEqual('Four Wheelers')
        })
    })
//update
    it('to test the update', async () => {
        return AddRequest.findOneAndUpdate({_id :Object('607bc5e3bcc8922eb4c9fd2a')},
       {$set : {vechbrand:'pulsar'}})
        .then((pp)=>{
        expect(pp.vechbrand).toEqual('pulsar')
        })
       
       });
//delete
       it('to test the delete client is working or not', async () => {
        const status = await AddRequest.deleteOne({_id:"607b24bc874f141540c5a6e7"});
        expect(status.ok).toBe(1);
    })

    

})

