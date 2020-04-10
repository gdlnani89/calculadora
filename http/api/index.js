const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const dados = require('./historico.json')

function writeFile(cb){
  fs.writeFile(
    path.join(__dirname, "historico.json"), 
    JSON.stringify(dados, null, 2),
    err => {
      if(err) throw err
      cb( JSON.stringify({message: "ok"}))
    }
  )
}


http.createServer((req,res)=>{
  console.log(URL.parse(req.url, true).query);
    
  const { conta, id, del } = URL.parse(req.url, true).query //pegando os parametros na url e fazendo a descontrução
  
  //todas as contas
  if(!conta || !id )
    return res.end(JSON.stringify(dados))
  
  if(del){
    dados.historicos = dados.historicos.filter(item => String(item.id) !== String(id))
    return writeFile((message)=>res.end(message))
     
  }
    
  dados.historicos.push({id,conta})

  return writeFile((message)=> res.end(message))
}).listen(3000, ()=>console.log('Api rodando'))