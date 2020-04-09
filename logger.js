const EventEmitter = require('events') //eventos
const fs = require('fs') //para gravar no arquivo
const path = require('path') //para pegar o arquivo no lugar certo

const emitter = new EventEmitter()

emitter.on('log', (message) =>{
  fs.appendFile(path.join(__dirname, 'log.txt'), message, err =>{
    if (err) throw err
  })
})

function log(message){
  emitter.emit('log', message)
}

module.exports = log