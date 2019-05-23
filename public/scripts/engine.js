
var game = 0
var start = 0

var socket = io.connect()

.on('hi',(name) => {

    if(start){
        game = new Ancian(0, socket)
        document.getElementById('you').innerHTML = "<p class='user'>"+name+"</p>"
        socket.emit('start')
        socket.emit('sala off',salinha)
    }
    else start = 1
})

.on('start',(name) => {if(!game) {
    game = new Ancian(1, socket)
    document.getElementById('you').innerHTML = "<p class='user'>"+name+"</p>"
}})

.on('clicked',(data) => {

    if(data.player != game.myplayer)
        game.play(game.velhas[data.velha].children[data.campo],data.player)

})

.on('ouvindo salas', () => { if(!game) socket.emit('sala on', salinha)})

socket.username = username

socket.emit("play",{

    name : username,
    sala : salinha

})

socket.emit('sala on', salinha)