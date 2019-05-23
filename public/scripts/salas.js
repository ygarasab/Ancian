var salas = []
var as = []

var div = document.getElementById('salas')

var sockets = io.connect()

.on('sala on', (sala)=>{

    if(!salas.includes(sala)){
        
        salas.push(sala)

        var a = document.createElement('a')

        var bt = document.createElement('button')
        bt.className = 'op'
        bt.innerHTML = sala
        a.href = 'play/'+sala

        a.appendChild(bt)

        div.appendChild(a)
        as.push(a)

    }

})

.on('sala off', (sala) => {

    var i = salas.indexOf(sala)

    delete salas[i]
    div.removeChild(as[i])
    delete as[i]

})

sockets.emit("procurando salas")