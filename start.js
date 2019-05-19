const express = require('express')
const socket = require('socket.io')

const port = process.env.PORT || 5000

var username = ''

app = express()
	
	.use(express.static('public'))

	.set('view engine', 'ejs')

	.get('/', (req, res) => {

		res.render('username')

	})

	.get('/play', (req, res) =>{

		res.render('game')

	})


server = app.listen(port, () => console.log(`Listening on ${ port }`))

var io = socket(server)
io

	.on('connection', (socket) => {
		
		console.log('[ LOG ] Socket conectado ## Id ', socket.id)
		

		socket.on('chat', (data) => {

			console.log('[ LOG ] Emitindo mensagem')
			io.sockets.emit('chat', data)

		})

	})