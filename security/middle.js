const jwt1=require('./jwt');
const admin = (req,res,next)=>{
    try {
      const decode = jwt1.verifyjwt(req.headers.authorization.split(" ")[1]);
   
   new Promise((resolve, reject) => {
    if(decode.perfil===3){
        console.log('caiuaqui')
      req.usuario=decode
     resolve(next())}
    if(decode.perfil !='3') resolve( res.status(401).send({mensagem:"falha na autenticação"}))
   })
    } catch (error) {
      res.status(401).send({mensagem:"falha na autenticação"})
    }
  }


module.exports={admin}
