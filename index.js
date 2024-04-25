const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const app =  express();
const PORT  = process.env.PORT||8080;
mongoose.connect('mongodb://localhost:27017/employeess',
{useNewUrlParser:true, useUnifiedTopology:true}
).then(()=>{
    console.log('Mongodb connected successfully');
}).catch((error)=>{
    console.log('MongoConnection error:',error);
});

const db = mongoose.connection;
app.use(bodyParser.json());

const Employee = mongoose.model('employeess',
    {
        name:String,
        age:Number,
        position:String
    });


app.post('/employeess' , async(req,res)=>{
    try{
        const employee = new Employee(req.body);
        await employee.save();
        res.send(employee);
    }catch(err){
        res.status(400).send(err);
    }
});

app.get('/employeess' , async(req,res)=>{
    try{
        const employeess =  await Employee.find();
        res.send(employeess);
    }catch(err){
        res.status(400).send(err);
    }
});

app.get('/employeess/:id' , async (req,res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    }catch(err){
        res.status(400).send(err);
    }
});

app.put('/employeess/:id' , async(req,res)=>{
    try{
        const employee = await Employee.findByIdAndUpdate(req.params.id,
            req.body, {new:true});
        res.send(employee);
    }catch(err){
        res.status(400).send(err);
    }
});

app.delete('/employeess/:id' , async(req,res)=>{
    try{
        await Employee.findByIdAndDelete(req.params.id);
        res.send('employee deleted successfully');
    }catch(err){
        res.status(400).send(err);
    }
    
});

app.listen(PORT,()=>{
    console.log(`srever is running on port ${PORT}`);
});