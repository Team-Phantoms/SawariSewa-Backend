 //client login and signup testing
const Client=require('../models/client_model');
const mongoose=require('mongoose');
const axios=require("axios");
const { response } = require('express');

const url='mongodb://localhost:27017/SawariApatkalinSewa';
const baseurl='http://localhost:90/api/sas';
beforeAll(async()=>{
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex:true
    });
});

afterAll(async()=>{
    await mongoose.connection.close();
})

describe('User Schema test anything',()=>{

    it('Register User testing anything',()=>{
        const client={
            'clfname':"ram",
            'cllname':"ram",
            'clemail':'shyam@gmail.com',
            'clusername':"shyam",
            'clpassword':"12345"
        }

        return Client.create(client)
        .then((pro_ret)=>{
            expect(pro_ret.clfname).toEqual('ram')
        })
    })
    test('Login User testing anything',()=>{
        const clientlogin={
            'clusername':"ram",
            'clpassword':"12345"
        }
      return axios({
            method: 'post',
            url : baseurl+"/client/login",
            clientlogin
           
           })
        .then(response=>{
            expect(response.status).toMatch(true)
        })
        .catch(err => { })
    })

})