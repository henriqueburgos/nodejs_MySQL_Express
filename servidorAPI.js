const express = require('express')
const service = require('./Services/usuarioServices.js')

const app = express()
const porta = 3000




app.listen(porta,()=>{
    console.log("o servidor está rodando na porta " + porta)
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/usuario/:id', async (req,res)=>{
    res.send(await service.getByid(req.params.id))
})

app.get('/usuarios',async (req,res)=>{
    res.send(await service.getAll())
})
app.post('/usuario', async(req,res)=>{
    let user = req.body
    res.status(201).send(await service.newUser(user))
})
app.put('/usuario/:id', async(req,res)=>{
    let user = req.body
    res.status(201).send(await service.editUser(user,req.params.id))
})
app.delete('/usuario/:id',async(req,res)=>{
    res.status(201).send(await service.deleteuser(req.params.id))
})