const express = require('express')
const service = require('../Services/usuarioServices.js')
const very=require('../security/middle')

const app = express()
const router = express.Router()

console.log( new Date())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

router.get('/cliente/:id', async (req,res)=>{
   await service.getByid(req.params.id).then((result)=> res.status(200).send(result)).catch((err)=>res.status(404).send(err))
})

router.get('/clientes',very.admin,async (req,res)=>{
    res.send(await service.getAll())
})
router.post('/cliente', async(req,res)=>{
    let user = req.body
    await service.newUser(user).then((result)=>res.status(201).send(result)).catch((err)=>res.status(401).send(err))
    
})
router.post('/login', async(req,res)=>{
    let user = req.body
    await service.login(user).then((result)=>res.status(201).header({Authorization:"Barrier "+ result.resultado}).send(result),(reject)=>res.status(401).send(reject))
    
})
router.put('/cliente/:id', async(req,res)=>{
    let user = req.body
    res.status(201).send(await service.editUser(user,req.params.id))
})
router.delete('/cliente/:id',async(req,res)=>{
    res.status(201).send(await service.deleteuser(req.params.id))
})

module.exports=router