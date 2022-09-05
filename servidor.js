const express = require('express')

const app = express()
const porta = 3000
const usuario=require('./Resources/UsuarioResources')
const cliente=require('./Resources/clientes')




app.listen(porta,()=>{
    console.log("o servidor está rodando na porta " + porta)
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/',usuario)
app.use('/',cliente)