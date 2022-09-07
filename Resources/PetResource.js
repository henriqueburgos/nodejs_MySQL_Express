const express = require('express')
const service = require('../Services/petServices.js')
const very=require('../security/middle')

const app = express()
const router = express.Router()


app.use(express.urlencoded({extended:true}))
app.use(express.json())

router.get('/pet/:id', async (req,res)=>{
   await service.getByid(req.params.id).then((result)=> res.status(200).send(result)).catch((err)=>res.status(404).send(err))
})

router.get('/pets',async (req,res)=>{
    res.send(await service.getAll())
})
router.post('/pet', async(req,res)=>{
    let user = req.body
    await service.newpet(user).then((result)=>res.status(201).send(result)).catch((err)=>res.status(401).send(err))
    
})
router.put('/pet/:id', async(req,res)=>{
    let user = req.body
    await service.editpet(user,req.params.id).then((result)=>res.status(201).send(result)).catch((err)=>res.status(400).send(err))
})
router.delete('/pet/:id',async(req,res)=>{
    res.status(201).send(await service.deletepet(req.params.id))
})

module.exports=router