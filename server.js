const product = require('./models/product')
const express = require('express');

const app = express();

const mongoose = require('mongoose')

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hey its working now')
})

app.post('/product', async (req,res)=>{
    try {
        const createproduct = await product.create(req.body);
        res.status(200).json(createproduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product', async(req,res)=>{
        try{
            const getproduct = await product.find({})
     
            res.status(200).json(getproduct)
        } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const getproductbyid = await product.findById(id)
        res.status(200).json(getproductbyid)
    
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
   
})

app.put('/product/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const updateproduct = await product.findByIdAndUpdate(id, req.body)
        if(!updateproduct){
           return  res.status(404).json(`this id ${id} is not in db`)
        }
        const updated = await product.findById(id)
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id' , async(req,res)=> {
    try {
        const {id} = req.params
        const deleteproduct = await product.findByIdAndDelete(id)
        if(!deleteproduct){
            return res.status(404).json({message: `this id ${id}is not in Db `})
        }
    
        res.status(200).json(deleteproduct)
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })



mongoose.connect('mongodb+srv://test:test123@cluster0.ixharx9.mongodb.net/demo?retryWrites=true&w=majority')
.then(()=>{
    console.log('db connected')
    app.listen(3000, ()=>{
    console.log('port running on 3000')
})
}).catch((error)=>{
    console.log(error)
})

